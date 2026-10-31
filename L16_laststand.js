// LAST STAND: a top-down zombie survival game built with p5.js and p5play.

let arenaCanvas;
let survivor;
let zombies = [];
let bullets = [];
let experienceOrbs = [];
let visualBursts = [];
let electricLinks = [];
let gameMode = "title";
let waveNumber = 1;
let waveBreak = 0;
let waveBanner = 0;
let enemiesRemaining = 0;
let runTime = 0;
let experience = 0;
let survivorLevel = 1;
let hitCooldown = 0;
let shotCooldown = 0;
let upgradeChoices = [];
let powerRanks = { poison: 0, fire: 0, freeze: 0, electric: 0 };
let powerCooldowns = { poison: 0, fire: 0, freeze: 0, electric: 0 };
let gunDamage = 20;
let gunInterval = 0.2;
let defeatedCount = 0;

const LAST_WAVE = 8;
const POWER_INFO = {
  poison: { title: "Venom Arrows", tint: "#87d55a", description: "Piercing poison damage over time" },
  fire: { title: "Fire Arrows", tint: "#ff8b45", description: "Burning damage over time" },
  freeze: { title: "Cryo Bombs", tint: "#72d9f1", description: "Splash damage and 3-second freeze" },
  electric: { title: "Storm Javelin", tint: "#f6d85b", description: "Chain lightning, damage and 1-second stun" }
};

function setup() {
  const canvasWidth = Math.min(1120, Math.max(360, windowWidth - 36));
  const canvasHeight = Math.min(720, Math.max(420, windowHeight - 190));
  arenaCanvas = createCanvas(canvasWidth, canvasHeight);
  arenaCanvas.parent("game-stage");
  textFont("sans-serif");
  textAlign(CENTER, CENTER);
  noSmooth();
  survivor = makeBody(width / 2, height / 2, 24);
  survivor.body.visible = false;
}

function makeBody(x, y, size) {
  const body = new Sprite(x, y, size);
  body.collider = "none";
  body.visible = false;
  return { body };
}

function draw() {
  const elapsed = Math.min(deltaTime / 1000, 0.05);
  drawArena();
  updateBursts(elapsed);

  if (gameMode === "playing") {
    updateRun(elapsed);
  }

  drawActors();
  drawBullets();
  drawOrbs();
  drawBursts();
  drawElectricLinks();
  drawHud();

  if (gameMode === "title") drawTitleScreen();
  if (gameMode === "upgrade") drawUpgradeScreen();
  if (gameMode === "lost") drawEndScreen(false);
  if (gameMode === "won") drawEndScreen(true);
}

function drawArena() {
  background("#111b1b");
  noStroke();
  fill("#142020");
  rect(0, 0, width, height);
  stroke("#1b2b29");
  strokeWeight(1);
  const gridSize = 48;
  for (let x = 0; x < width; x += gridSize) line(x, 0, x, height);
  for (let y = 0; y < height; y += gridSize) line(0, y, width, y);
  noStroke();
  fill("#202d28");
  for (let i = 0; i < 10; i++) {
    const px = (i * 193 + 77) % width;
    const py = (i * 137 + 41) % height;
    rect(px, py, 18, 3);
    rect(px + 5, py - 7, 3, 17);
  }
  noFill();
  stroke("#31403a");
  strokeWeight(2);
  rect(10, 10, width - 20, height - 20, 8);
  noStroke();
}

function updateRun(elapsed) {
  runTime += elapsed;
  hitCooldown = Math.max(0, hitCooldown - elapsed);
  shotCooldown = Math.max(0, shotCooldown - elapsed);
  waveBanner = Math.max(0, waveBanner - elapsed);
  for (const powerName of Object.keys(powerCooldowns)) {
    powerCooldowns[powerName] = Math.max(0, powerCooldowns[powerName] - elapsed);
  }

  moveSurvivor(elapsed);
  updateZombies(elapsed);
  updateBullets(elapsed);
  updateOrbs(elapsed);
  updateAutoPowers();
  updateWave(elapsed);
  checkLevelUp();
}

function moveSurvivor(elapsed) {
  let directionX = 0;
  let directionY = 0;
  if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) directionX -= 1;
  if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) directionX += 1;
  if (keyIsDown(87) || keyIsDown(UP_ARROW)) directionY -= 1;
  if (keyIsDown(83) || keyIsDown(DOWN_ARROW)) directionY += 1;
  const magnitude = Math.hypot(directionX, directionY) || 1;
  const speed = 245 * elapsed / magnitude;
  survivor.body.x = constrain(survivor.body.x + directionX * speed, 28, width - 28);
  survivor.body.y = constrain(survivor.body.y + directionY * speed, 55, height - 28);
}

function updateZombies(elapsed) {
  for (const zombie of zombies) {
    if (zombie.dead) continue;
    updateZombieEffects(zombie, elapsed);
    if (zombie.dead) continue;

    const dx = survivor.body.x - zombie.body.x;
    const dy = survivor.body.y - zombie.body.y;
    const distance = Math.hypot(dx, dy) || 1;
    if (zombie.frozenFor <= 0 && zombie.stunnedFor <= 0 && distance > 25) {
      const speed = zombie.speed * elapsed;
      zombie.body.x += dx / distance * speed;
      zombie.body.y += dy / distance * speed;
    }

    const contactDistance = zombie.size / 2 + 14;
    if (distance < contactDistance && hitCooldown <= 0) {
      survivor.health -= Math.max(5, 8 + Math.floor(waveNumber / 3));
      hitCooldown = 1;
      addBurst(survivor.body.x, survivor.body.y, 52, "#ff544d", 0.25);
      if (survivor.health <= 0) {
        survivor.health = 0;
        gameMode = "lost";
      }
    }
  }
  zombies = zombies.filter((zombie) => !zombie.dead);
}

function updateZombieEffects(zombie, elapsed) {
  zombie.frozenFor = Math.max(0, zombie.frozenFor - elapsed);
  zombie.stunnedFor = Math.max(0, zombie.stunnedFor - elapsed);
  for (const effect of zombie.damageEffects) {
    effect.timeLeft -= elapsed;
    effect.timeUntilTick -= elapsed;
    while (effect.timeUntilTick <= 0 && effect.timeLeft > 0 && !zombie.dead) {
      damageZombie(zombie, effect.damage);
      effect.timeUntilTick += effect.interval;
    }
  }
  zombie.damageEffects = zombie.damageEffects.filter((effect) => effect.timeLeft > 0);
}

function updateBullets(elapsed) {
  for (const bullet of bullets) {
    bullet.x += bullet.velocityX * elapsed;
    bullet.y += bullet.velocityY * elapsed;
    bullet.timeLeft -= elapsed;

    const target = zombies.find((zombie) => !zombie.dead &&
      Math.hypot(zombie.body.x - bullet.x, zombie.body.y - bullet.y) < zombie.size / 2 + bullet.size);
    if (target) {
      if (bullet.kind === "freeze") {
        explodeFreezeBomb(bullet.x, bullet.y, bullet.damage, bullet.rank);
      } else {
        damageZombie(target, bullet.damage);
        if (bullet.kind === "poison") applyDamageEffect(target, "poison", 4, 0.8, 3 + bullet.rank);
        if (bullet.kind === "fire") applyDamageEffect(target, "burn", 3.2, 0.65, 4 + bullet.rank);
        addBurst(bullet.x, bullet.y, 26, bullet.kind === "poison" ? POWER_INFO.poison.tint : POWER_INFO.fire.tint, 0.22);
      }
      bullet.timeLeft = 0;
    }
  }
  bullets = bullets.filter((bullet) => bullet.timeLeft > 0 && bullet.x > -30 && bullet.x < width + 30 && bullet.y > -30 && bullet.y < height + 30);
}

function updateOrbs(elapsed) {
  for (const orb of experienceOrbs) {
    const dx = survivor.body.x - orb.body.x;
    const dy = survivor.body.y - orb.body.y;
    const distance = Math.hypot(dx, dy) || 1;
    if (distance < 145) {
      const pullSpeed = (260 + (145 - distance) * 2.2) * elapsed;
      orb.body.x += dx / distance * pullSpeed;
      orb.body.y += dy / distance * pullSpeed;
    }
    if (distance < 19) {
      experience += orb.value;
      orb.collected = true;
      orb.body.delete();
    }
  }
  experienceOrbs = experienceOrbs.filter((orb) => !orb.collected);
}

function updateAutoPowers() {
  const nearest = findNearestZombie();
  if (!nearest) return;
  for (const powerName of Object.keys(powerRanks)) {
    const rank = powerRanks[powerName];
    if (rank <= 0 || powerCooldowns[powerName] > 0) continue;
    const target = nearest;
    if (powerName === "electric") {
      chainJavelin(target, rank);
      powerCooldowns.electric = Math.max(0.7, 2.5 - rank * 0.16);
    } else {
      const aim = Math.atan2(target.body.y - survivor.body.y, target.body.x - survivor.body.x);
      const speed = powerName === "freeze" ? 310 : 520;
      const damage = Math.round((powerName === "freeze" ? 10 : 9) * (1 + (rank - 1) * 0.32));
      bullets.push({
        x: survivor.body.x + Math.cos(aim) * 18,
        y: survivor.body.y + Math.sin(aim) * 18,
        velocityX: Math.cos(aim) * speed,
        velocityY: Math.sin(aim) * speed,
        kind: powerName,
        damage,
        rank,
        size: powerName === "freeze" ? 9 : 5,
        timeLeft: powerName === "freeze" ? 2.3 : 1.7
      });
      powerCooldowns[powerName] = Math.max(0.55, (powerName === "freeze" ? 3.6 : 1.8) - rank * 0.14);
    }
  }
}

function updateWave(elapsed) {
  if (zombies.length > 0 || gameMode !== "playing") return;
  waveBreak -= elapsed;
  if (waveBreak <= 0) {
    if (waveNumber >= LAST_WAVE) {
      gameMode = "won";
      return;
    }
    waveNumber += 1;
    launchWave();
  }
}

function launchWave() {
  enemiesRemaining = 5 + waveNumber * 3;
  waveBreak = 2.4;
  waveBanner = 2.1;
  for (let index = 0; index < enemiesRemaining; index++) spawnZombie();
}

function spawnZombie() {
  const angle = random(TWO_PI);
  const distance = Math.max(width, height) * random(0.62, 0.82);
  const x = constrain(survivor.body.x + Math.cos(angle) * distance, 24, width - 24);
  const y = constrain(survivor.body.y + Math.sin(angle) * distance, 58, height - 24);
  const size = random(25, 34);
  const actor = makeBody(x, y, size);
  zombies.push({
    body: actor.body,
    size,
    health: 28 + waveNumber * 7,
    maxHealth: 28 + waveNumber * 7,
    speed: random(38, 55) + waveNumber * 2.2,
    frozenFor: 0,
    stunnedFor: 0,
    damageEffects: [],
    dead: false
  });
}

function findNearestZombie() {
  let nearest = null;
  let nearestDistance = Infinity;
  for (const zombie of zombies) {
    if (zombie.dead) continue;
    const distance = Math.hypot(zombie.body.x - survivor.body.x, zombie.body.y - survivor.body.y);
    if (distance < nearestDistance) {
      nearestDistance = distance;
      nearest = zombie;
    }
  }
  return nearest;
}

function fireGun() {
  if (gameMode !== "playing" || shotCooldown > 0) return;
  const aim = Math.atan2(mouseY - survivor.body.y, mouseX - survivor.body.x);
  bullets.push({
    x: survivor.body.x + Math.cos(aim) * 20,
    y: survivor.body.y + Math.sin(aim) * 20,
    velocityX: Math.cos(aim) * 760,
    velocityY: Math.sin(aim) * 760,
    kind: "gun",
    damage: gunDamage,
    rank: 0,
    size: 4,
    timeLeft: 1.15
  });
  shotCooldown = gunInterval;
}

function damageZombie(zombie, amount) {
  if (zombie.dead) return;
  zombie.health -= amount;
  if (zombie.health <= 0) defeatZombie(zombie);
}

function defeatZombie(zombie) {
  if (zombie.dead) return;
  zombie.dead = true;
  zombie.body.delete();
  defeatedCount += 1;
  const orbCount = random() < 0.25 ? 2 : 1;
  for (let index = 0; index < orbCount; index++) {
    const orbActor = makeBody(zombie.body.x + random(-9, 9), zombie.body.y + random(-9, 9), 10);
    experienceOrbs.push({ body: orbActor.body, value: 5, collected: false });
  }
}

function applyDamageEffect(zombie, kind, duration, interval, damage) {
  const existing = zombie.damageEffects.find((effect) => effect.kind === kind);
  if (existing) {
    existing.timeLeft = Math.max(existing.timeLeft, duration);
    existing.damage = Math.max(existing.damage, damage);
    return;
  }
  zombie.damageEffects.push({ kind, timeLeft: duration, interval, timeUntilTick: interval, damage });
}

function explodeFreezeBomb(x, y, damage, rank) {
  const radius = 92 + rank * 7;
  addBurst(x, y, radius, POWER_INFO.freeze.tint, 0.5);
  for (const zombie of zombies) {
    if (zombie.dead || Math.hypot(zombie.body.x - x, zombie.body.y - y) > radius) continue;
    damageZombie(zombie, damage);
    zombie.frozenFor = Math.max(zombie.frozenFor, 3);
    applyDamageEffect(zombie, "chill", 2.4, 0.8, 2 + rank);
  }
}

function chainJavelin(firstZombie, rank) {
  const visited = new Set();
  const queue = [firstZombie];
  const chainDistance = 76 + rank * 5;
  const chainPoints = [];
  while (queue.length > 0) {
    const zombie = queue.shift();
    if (!zombie || zombie.dead || visited.has(zombie)) continue;
    visited.add(zombie);
    chainPoints.push({ x: zombie.body.x, y: zombie.body.y });
    damageZombie(zombie, 12 + rank * 3);
    zombie.stunnedFor = Math.max(zombie.stunnedFor, 1);
    applyDamageEffect(zombie, "shock", 2.2, 0.7, 3 + rank);
    for (const neighbor of zombies) {
      if (neighbor.dead || visited.has(neighbor)) continue;
      if (Math.hypot(neighbor.body.x - zombie.body.x, neighbor.body.y - zombie.body.y) <= chainDistance) queue.push(neighbor);
    }
  }
  for (let index = 1; index < chainPoints.length; index++) {
    electricLinks.push({ from: chainPoints[index - 1], to: chainPoints[index], timeLeft: 0.22 });
  }
  if (chainPoints.length === 1) {
    electricLinks.push({ from: { x: survivor.body.x, y: survivor.body.y }, to: chainPoints[0], timeLeft: 0.22 });
  }
}

function addBurst(x, y, radius, tint, duration) {
  visualBursts.push({ x, y, radius, tint, timeLeft: duration, duration });
}

function updateBursts(elapsed) {
  for (const burst of visualBursts) burst.timeLeft -= elapsed;
  visualBursts = visualBursts.filter((burst) => burst.timeLeft > 0);
  for (const link of electricLinks) link.timeLeft -= elapsed;
  electricLinks = electricLinks.filter((link) => link.timeLeft > 0);
}

function checkLevelUp() {
  const nextThreshold = xpThreshold(survivorLevel);
  if (experience < nextThreshold || gameMode !== "playing") return;
  experience -= nextThreshold;
  survivorLevel += 1;
  upgradeChoices = createUpgradeChoices();
  gameMode = "upgrade";
}

function xpThreshold(level) {
  return 25 + level * 15;
}

function createUpgradeChoices() {
  const options = [];
  for (const powerName of Object.keys(powerRanks)) {
    const rank = powerRanks[powerName];
    if (rank < 5) {
      options.push({
        kind: "power",
        id: powerName,
        title: rank === 0 ? `Unlock ${POWER_INFO[powerName].title}` : `${POWER_INFO[powerName].title} +1`,
        description: `${POWER_INFO[powerName].description}. Rank ${rank + 1}.`,
        tint: POWER_INFO[powerName].tint
      });
    }
  }
  options.push({ kind: "gunDamage", id: "gunDamage", title: "Heavy Rounds", description: "Manual gun damage +8", tint: "#f2bd66" });
  options.push({ kind: "gunRate", id: "gunRate", title: "Quick Trigger", description: "Fire the manual gun faster", tint: "#f2bd66" });
  options.push({ kind: "health", id: "health", title: "Field Dressing", description: "Recover 30 health", tint: "#81d88b" });
  return shuffle(options).slice(0, 3);
}

function shuffle(items) {
  const copy = items.slice();
  for (let index = copy.length - 1; index > 0; index--) {
    const other = Math.floor(random(index + 1));
    [copy[index], copy[other]] = [copy[other], copy[index]];
  }
  return copy;
}

function chooseUpgrade(index) {
  if (gameMode !== "upgrade" || !upgradeChoices[index]) return;
  const choice = upgradeChoices[index];
  if (choice.kind === "power") powerRanks[choice.id] += 1;
  if (choice.kind === "gunDamage") gunDamage += 8;
  if (choice.kind === "gunRate") gunInterval = Math.max(0.08, gunInterval - 0.035);
  if (choice.kind === "health") survivor.health = Math.min(survivor.maxHealth, survivor.health + 30);
  gameMode = "playing";
  checkLevelUp();
}

function restartGame() {
  for (const zombie of zombies) zombie.body.delete();
  for (const orb of experienceOrbs) orb.body.delete();
  zombies = [];
  experienceOrbs = [];
  bullets = [];
  visualBursts = [];
  electricLinks = [];
  waveNumber = 1;
  waveBreak = 0;
  waveBanner = 0;
  enemiesRemaining = 0;
  runTime = 0;
  experience = 0;
  survivorLevel = 1;
  hitCooldown = 0;
  shotCooldown = 0;
  defeatedCount = 0;
  powerRanks = { poison: 0, fire: 0, freeze: 0, electric: 0 };
  powerCooldowns = { poison: 0, fire: 0, freeze: 0, electric: 0 };
  gunDamage = 20;
  gunInterval = 0.2;
  survivor.health = 100;
  survivor.maxHealth = 100;
  survivor.body.x = width / 2;
  survivor.body.y = height / 2;
  gameMode = "playing";
  launchWave();
}

function drawActors() {
  for (const zombie of zombies) {
    if (zombie.dead) continue;
    const x = zombie.body.x;
    const y = zombie.body.y;
    const size = zombie.size;
    const frozen = zombie.frozenFor > 0;
    const burning = zombie.damageEffects.some((effect) => effect.kind === "burn");
    const poisoned = zombie.damageEffects.some((effect) => effect.kind === "poison");
    noStroke();
    fill(frozen ? "#75d9ed" : burning ? "#e9683f" : poisoned ? "#7eb94c" : "#78915e");
    ellipse(x, y, size, size);
    fill("#344a35");
    ellipse(x - size * 0.2, y - size * 0.13, size * 0.2, size * 0.24);
    ellipse(x + size * 0.2, y - size * 0.13, size * 0.2, size * 0.24);
    fill("#18231d");
    ellipse(x - size * 0.2, y - size * 0.13, size * 0.07, size * 0.1);
    ellipse(x + size * 0.2, y - size * 0.13, size * 0.07, size * 0.1);
    stroke("#344637");
    strokeWeight(2);
    line(x - size * 0.17, y + size * 0.17, x + size * 0.17, y + size * 0.17);
    noStroke();
    if (zombie.health < zombie.maxHealth) {
      fill("#26312b");
      rect(x - 17, y - size / 2 - 9, 34, 4, 2);
      fill("#d76552");
      rect(x - 17, y - size / 2 - 9, 34 * Math.max(0, zombie.health / zombie.maxHealth), 4, 2);
    }
  }

  const aimAngle = Math.atan2(mouseY - survivor.body.y, mouseX - survivor.body.x);
  push();
  translate(survivor.body.x, survivor.body.y);
  rotate(aimAngle);
  noStroke();
  fill(hitCooldown > 0 ? "#f3c1a8" : "#f4e8d2");
  ellipse(0, 0, 29, 29);
  fill("#31575a");
  ellipse(-3, 0, 15, 19);
  fill("#d9b685");
  rect(7, -3, 18, 6, 2);
  fill("#101615");
  ellipse(2, -5, 3, 3);
  ellipse(2, 5, 3, 3);
  pop();

  for (const orb of experienceOrbs) {
    noStroke();
    fill("#82def0");
    ellipse(orb.body.x, orb.body.y, 9, 9);
    fill("#d4fbff");
    ellipse(orb.body.x - 1, orb.body.y - 1, 3, 3);
  }
}

function drawBullets() {
  noStroke();
  for (const bullet of bullets) {
    if (bullet.kind === "gun") fill("#ffe7a0");
    else fill(POWER_INFO[bullet.kind].tint);
    ellipse(bullet.x, bullet.y, bullet.size * 2, bullet.size * 2);
    if (bullet.kind === "freeze") {
      noFill();
      stroke("#baf4ff");
      strokeWeight(1);
      ellipse(bullet.x, bullet.y, 17, 17);
      noStroke();
    }
  }
}

function drawOrbs() {
  // Experience orbs are drawn with the rest of the actors.
}

function drawBursts() {
  noFill();
  for (const burst of visualBursts) {
    const progress = 1 - burst.timeLeft / burst.duration;
    stroke(burst.tint);
    strokeWeight(2);
    drawingContext.globalAlpha = Math.max(0.08, 1 - progress);
    ellipse(burst.x, burst.y, burst.radius * progress * 2, burst.radius * progress * 2);
  }
  drawingContext.globalAlpha = 1;
  noStroke();
}

function drawElectricLinks() {
  stroke("#f6e477");
  strokeWeight(3);
  for (const link of electricLinks) {
    drawingContext.globalAlpha = Math.min(1, link.timeLeft / 0.1);
    line(link.from.x, link.from.y, link.to.x, link.to.y);
  }
  drawingContext.globalAlpha = 1;
  noStroke();
}

function drawHud() {
  if (gameMode === "title") return;
  noStroke();
  fill("#091211");
  rect(0, 0, width, 48);
  textAlign(LEFT, CENTER);
  fill("#f3ead8");
  textSize(14);
  textStyle(BOLD);
  text(`WAVE ${String(waveNumber).padStart(2, "0")} / ${LAST_WAVE}`, 20, 18);
  textStyle(NORMAL);
  fill("#82908a");
  text(`${zombies.length} INCOMING`, 20, 36);

  const barX = width * 0.34;
  const barWidth = Math.min(300, width * 0.3);
  fill("#31403a");
  rect(barX, 15, barWidth, 10, 5);
  fill(survivor.health > 30 ? "#dc6956" : "#ff443d");
  rect(barX, 15, barWidth * (survivor.health / survivor.maxHealth), 10, 5);
  fill("#c9d0c8");
  textAlign(CENTER, CENTER);
  textSize(10);
  text(`VITALS  ${Math.ceil(survivor.health)} / ${survivor.maxHealth}`, barX + barWidth / 2, 36);

  textAlign(RIGHT, CENTER);
  textSize(13);
  fill("#dce7dc");
  text(`LV ${survivorLevel}`, width - 20, 17);
  fill("#75847d");
  text(`XP ${experience} / ${xpThreshold(survivorLevel)}`, width - 20, 36);

  const powers = Object.keys(powerRanks).filter((name) => powerRanks[name] > 0);
  let powerX = 16;
  const powerY = height - 31;
  textAlign(LEFT, CENTER);
  textSize(10);
  for (const name of powers) {
    fill(POWER_INFO[name].tint);
    text(`${POWER_INFO[name].title.toUpperCase()}  ${powerRanks[name]}`, powerX, powerY);
    powerX += textWidth(`${POWER_INFO[name].title.toUpperCase()}  ${powerRanks[name]}`) + 22;
  }

  fill("#1d2926");
  stroke("#56645c");
  strokeWeight(1);
  rect(width - 92, height - 44, 78, 26, 3);
  noStroke();
  fill("#d9e0d8");
  textAlign(CENTER, CENTER);
  textSize(10);
  text("RESTART  R", width - 53, height - 31);

  if (waveBanner > 0 && gameMode === "playing") {
    textAlign(CENTER, CENTER);
    fill("#fff0cf");
    textSize(22);
    text(waveNumber === 1 ? "THEY HEARD YOU" : `WAVE ${waveNumber}`, width / 2, height * 0.19);
  }
  if (zombies.length === 0 && gameMode === "playing" && waveBreak > 0) {
    textAlign(CENTER, CENTER);
    fill("#aebdb1");
    textSize(14);
    text("CLEAR THE STREET. NEXT WAVE IN " + Math.ceil(waveBreak), width / 2, height * 0.55);
  }
}

function drawTitleScreen() {
  drawOverlay();
  textAlign(CENTER, CENTER);
  fill("#f1e7d4");
  textStyle(BOLD);
  textSize(Math.min(56, width * 0.09));
  text("LAST STAND", width / 2, height * 0.29);
  textStyle(NORMAL);
  fill("#e17358");
  textSize(13);
  text("AFTER DARK, THE STREETS BELONG TO THEM", width / 2, height * 0.38);
  fill("#b1bdb4");
  textSize(14);
  text("WASD to move   /   Click to fire   /   Choose upgrades between waves", width / 2, height * 0.48);
  drawButton("ENTER THE NIGHT", width / 2 - 112, height * 0.59, 224, 52);
  fill("#77857d");
  textSize(11);
  text("SURVIVE EIGHT WAVES. KEEP MOVING.", width / 2, height * 0.72);
}

function drawUpgradeScreen() {
  drawOverlay();
  textAlign(CENTER, CENTER);
  fill("#f1e7d4");
  textStyle(BOLD);
  textSize(30);
  text("LEVEL UP", width / 2, height * 0.2);
  textStyle(NORMAL);
  fill("#9faea4");
  textSize(13);
  text("Choose a supply. Press 1, 2, or 3.", width / 2, height * 0.28);

  const cardWidth = Math.min(230, (width - 72) / 3);
  const gap = 14;
  const totalWidth = cardWidth * 3 + gap * 2;
  const firstX = (width - totalWidth) / 2;
  const cardY = height * 0.37;
  for (let index = 0; index < upgradeChoices.length; index++) {
    const choice = upgradeChoices[index];
    const x = firstX + index * (cardWidth + gap);
    fill("#1d2926");
    stroke(choice.tint);
    strokeWeight(1);
    rect(x, cardY, cardWidth, 190, 5);
    noStroke();
    fill(choice.tint);
    textAlign(LEFT, CENTER);
    textSize(11);
    textStyle(BOLD);
    text(`0${index + 1}  /  SUPPLY`, x + 17, cardY + 25);
    textStyle(NORMAL);
    fill("#f1e7d4");
    textSize(17);
    text(choice.title, x + 17, cardY + 70, cardWidth - 34, 46);
    fill("#a4b0a7");
    textSize(12);
    text(choice.description, x + 17, cardY + 128, cardWidth - 34, 45);
  }
  textAlign(CENTER, CENTER);
  fill("#738179");
  textSize(11);
  text("TIME HOLDS WHILE YOU DECIDE", width / 2, cardY + 222);
}

function drawEndScreen(victory) {
  drawOverlay();
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  fill(victory ? "#cde8bd" : "#f2d6c6");
  textSize(38);
  text(victory ? "MORNING COMES" : "OVERRUN", width / 2, height * 0.35);
  textStyle(NORMAL);
  fill("#aebbb2");
  textSize(14);
  text(victory ? "Eight waves survived. The district is quiet." : `You cleared ${defeatedCount} infected. The street goes dark.`, width / 2, height * 0.46);
  drawButton("RUN IT BACK", width / 2 - 100, height * 0.57, 200, 48);
  fill("#79877e");
  textSize(11);
  text("PRESS ENTER TO RESTART", width / 2, height * 0.69);
}

function drawOverlay() {
  fill("#07100f");
  drawingContext.globalAlpha = 0.84;
  rect(0, 0, width, height);
  drawingContext.globalAlpha = 1;
}

function drawButton(label, x, y, buttonWidth, buttonHeight) {
  noStroke();
  fill("#b94d3b");
  rect(x, y, buttonWidth, buttonHeight, 4);
  fill("#fff0dc");
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  textSize(13);
  text(label, x + buttonWidth / 2, y + buttonHeight / 2);
  textStyle(NORMAL);
}

function mousePressed() {
  if (gameMode === "title") {
    if (mouseY > height * 0.55 && mouseY < height * 0.7) restartGame();
    return false;
  }
  if (gameMode === "playing") {
    if (mouseX >= width - 96 && mouseY >= height - 48) {
      restartGame();
      return false;
    }
    fireGun();
    return false;
  }
  if (gameMode === "upgrade") {
    const cardWidth = Math.min(230, (width - 72) / 3);
    const gap = 14;
    const firstX = (width - (cardWidth * 3 + gap * 2)) / 2;
    const cardY = height * 0.37;
    for (let index = 0; index < 3; index++) {
      const x = firstX + index * (cardWidth + gap);
      if (mouseX >= x && mouseX <= x + cardWidth && mouseY >= cardY && mouseY <= cardY + 190) chooseUpgrade(index);
    }
    return false;
  }
  if (gameMode === "lost" || gameMode === "won") {
    if (mouseY > height * 0.52 && mouseY < height * 0.74) restartGame();
    return false;
  }
  return false;
}

function keyPressed() {
  if (key === "r" || key === "R") restartGame();
  else if (gameMode === "title" && (keyCode === ENTER || keyCode === 32)) restartGame();
  else if (gameMode === "upgrade" && key >= "1" && key <= "3") chooseUpgrade(Number(key) - 1);
  else if ((gameMode === "lost" || gameMode === "won") && keyCode === ENTER) restartGame();
  return false;
}

function windowResized() {
  const canvasWidth = Math.min(1120, Math.max(360, windowWidth - 36));
  const canvasHeight = Math.min(720, Math.max(420, windowHeight - 190));
  resizeCanvas(canvasWidth, canvasHeight);
  if (survivor) {
    survivor.body.x = constrain(survivor.body.x, 28, width - 28);
    survivor.body.y = constrain(survivor.body.y, 55, height - 28);
  }
}
