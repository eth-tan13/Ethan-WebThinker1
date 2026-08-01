

let shapeColor = 'blue';

function setup() {
    createCanvas(400,400);
    background(220);
}

function draw() {
    fill(shapeColor);
    ellipse(200,200,80,80);
}

function mousePressed() {
    let randomColor = color(random(255), random(255), random(255));
    fill(randomColor);
    noStroke();
    
}

function mouseReleased() {
    shapeColor = 'blue';
}