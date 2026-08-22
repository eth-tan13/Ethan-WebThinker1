function setup() {
    createCanvas(400,400);
    background(220);
}

let x=200;
let y=200;

function draw() {
    background(220);
    if (keyIsDown(UP_ARROW)) {
        y-=2;
        direction="up";
    }
    if (keyIsDown(DOWN_ARROW)) {
        y+=2;
        direction="down";
    }
    if (keyIsDown(LEFT_ARROW)) {
        x-=2;
        direction="left";
    }
    if (keyIsDown(RIGHT_ARROW)) {
        x+=2;
        direction="right";
    }
    if (keyIsDown(SPACE)) {
        let fillColour=200
    } else {
        let fillColour=50
    }
    y=constrain(y,50,350);
    x=constrain(x,0,width);
    if (direction=="up") {
        rect(x,y,50,50);
        fill(fillColour);
    } else if (direction=="down") {
        rect(x,y,50,50);
        fill(fillColour);
    } else if (direction=="left") {
        rect(x,y,50,50);
        fill(fillColour)
    } else if (direction=="right") {
        rect(x,y,50,50);
        fill(fillColour)
    }
}