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

// function setup() {
//     createCanvas(600,400);
//     background(220);
//     textSize(20);
//     textAlign(CENTER,CENTER)
//     text("We help you [core benefit] so you can [desired outcome].",width/2,height/2);
// }

// function draw() {

// }

let favouriteFoods=["pizza","burger","sushi","tacos","pasta"];

function setup() {
    createCanvas(400,400);
    textSize(24);
    textAlign(LEFT,TOP);
}

function draw() {
    background(220);
    fill(0);
    text("my favourite foods:",50,50);
    for(let i=0;i<favouriteFoods.length;i++);{
        text((i+1)+". "+favouriteFoods[i],50,50)
    }
}