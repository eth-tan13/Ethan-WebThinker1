let rectSize = 50;

function setup() {
    createCanvas(400,400);
    background(220);
}

function draw() {
    // background(220);
    // rect(width/2-rectSize/2,height/2-rectSize/2,rectSize,rectSize)
}

// function keyPressed() {
//     rectSize=100;
// }

// function keyReleased() {
//     rectSize=50;
// }

function keyPressed() {
    let number=random(5,20);
    for(let i=0;i<number;i++) {
        let circleSize=random(10,50);
        let circleColour=color(random(0,255),random(0,255),random(0,255));
        let circleX=random(0,400);
        let circleY=random(0,400);
        fill(circleColour);
        noStroke();
        ellipse(circleX,circleY,circleSize,circleSize);
    }
}