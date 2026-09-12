// let squareX=300;
// let squareY=200;
// let squareSize=100;
// let squareSpeedX=100;
// let squareSpeedY=100;

// function setup() {
//     createCanvas(600,400);
//     background(220);
// }

// function draw() {
//     squareX+=squareSpeedX;
//     squareY+=squareSpeedY;
//     if (squareX>=width-squareSize||squareX<=0) {
//         squareSpeedX*=-1;
//         fill(random(255),random(255),random(255));
//     }
//     if (squareY>=height-squareSize||squareY<=0) {
//         squareSpeedY*=-1;
//         fill(random(255),random(255),random(255));
//     }
//     noStroke();
//     rect(squareX,squareY,squareSize,squareSize);
// }

function setup() {
    createCanvas(600,400);
    background(220);
    textSize(40);
}