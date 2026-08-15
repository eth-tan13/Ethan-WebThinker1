let rectSize = 50;

function setup() {
    createCanvas(200,200);
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

// function keyPressed() {
//     let number=random(5,20);
//     for(let i=0;i<number;i++) {
//         let circleSize=random(10,50);
//         let circleColour=color(random(0,255),random(0,255),random(0,255));
//         let circleX=random(0,400);
//         let circleY=random(0,400);
//         fill(circleColour);
//         noStroke();
//         ellipse(circleX,circleY,circleSize,circleSize);
//     }
// }

// function keyReleased() {
//     background(220);
// }

// function keyPressed() {
//     console.log("key:",key);
//     console.log("keyCode:",keyCode);
//     if (keyCode==67)
//         circle(200,200,200);
//     else if (keyCode==83)
//         square(100,100,200);
// }

// function keyReleased() {
//     background(220);
// }\

function draw() {
    background(220);
    circle(100,100,50);
}

// function keyPressed() {
//     if (key==="w") {
//         fill("white")
//     } else if (key==="r") {
//         fill("red")
//     } else if (key==="g") {
//         fill("green")
//     } else {
//         fill("yellow")
//     }
// }

function mouseMoved() {
    if (mouseX<75) {
        fill("red")
    } else if (mouseX<=125) {
        fill("green")
    } else {
        fill("blue")
    }
}