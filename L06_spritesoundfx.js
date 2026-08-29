// function setup() {
//     createCanvas(400,400);
//     background(220);
// }

// let x=200;
// let y=200;

// function draw() {
//     background(220);
//     if (keyIsDown(UP_ARROW)) {
//         y-=2;
//         direction="up";
//     }
//     if (keyIsDown(DOWN_ARROW)) {
//         y+=2;
//         direction="down";
//     }
//     if (keyIsDown(LEFT_ARROW)) {
//         x-=2;
//         direction="left";
//     }
//     if (keyIsDown(RIGHT_ARROW)) {
//         x+=2;
//         direction="right";
//     }
//     y=constrain(y,50,350-50);
//     x=constrain(x,50,350-50);
//     rect(x,y,50,50);
// }

let soundEffect, bgMusic, staticImage;

function preload() {
    soundEffect=loadSound('assets/pop.mp3')
    bgMusic=loadSound('assets/bossaNova.mp3')
    staticImage=loadImage('assets/pico-a.png')
}

function setup() {
    createCanvas(600,400);
    bgMusic.loop();
}

let x=100;
let y=280;
let speed=5;

function draw() {
    background("lightblue");
c
    if(x===0||x===width-100||y===0||y===height-100) {
        background("red");
        // if(!soundEffect.isPlaying()) {
        soundEffect.play();
        // }
    }
    x=constrain(x,0,width-100)
    y=constrain(y,0,height-100)
    image(staticImage,x,y,100,100);
}

function keyPressed() {
    if (keyCode===32) {
        soundEffect.play();
    }
}