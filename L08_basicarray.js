let squareX=300;
let squareY=200;
let squareSize=50;
let squareSpeedX=10;
let squareSpeedY=10;

function setup() {
    createCanvas(600,400);
    background(220);
}

function draw() {
    squareX+=squareSpeedX
    squareY+=squareSpeedY
    if (squareX>=width-100||squareX<=0)
        squareSpeedX*=-1
    fill(random(255),random(255),random(255))
    rect(width/2,height/2,100,100);
}