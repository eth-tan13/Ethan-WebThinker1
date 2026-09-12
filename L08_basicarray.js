let ballX=300;
let ballY=200;
let ballSize=50;
let ballSpeedX=10;
let ballSpeedY=10;

function setup() {
    createCanvas(600,400);
    background(220);
}

function draw() {
    fill(random(255),random(255),random(255))
    rect(width/2,height/2,100,100);
}