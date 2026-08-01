let shapeColor = 'blue';

// function setup() {
//     createCanvas(400,400);
//     background(220);
// }

// function draw() {
//     fill(shapeColor);
// }

// function mousePressed() {
//     let randomColor = color(random(255), random(255), random(255));
//     fill(randomColor);
//     noStroke();
//     ellipse(200,200,80,80);
// }

// function mouseReleased() {
//     shapeColor = 'white';
//     ellipse(200,200,80,80);
// }

function setup() {
    createCanvas(400,400);
    background(220);
    fill(255,0,0);
}

// function mouseMoved() {
//     let randomColor = color(random(255), random(255), random(255));
//     fill(randomColor);
//     noStroke();
//     ellipse(mouseX,mouseY,10,10)
// }

// let circleSize=50
// let prevMouseX = 50
// function mouseMoved() {
    
//     if (prevMouseX<mouseX){
//         circleSize++
//     }
//     else {
//         circleSize--
//     }
//     prevMouseX=mouseX
//     background('white')
//     ellipse(200,200,circleSize,circleSize);
// }

function mouseDragged() {
    let randomColor = color(random(255), random(255), random(255));
    fill(randomColor);
    noStroke();
    for(let i=0;i<5;i++){
        let circleSize=random(10,30);
        let randomMouseX=random(mouseX-10,mouseX+10)
        let randomMouseY=random(mouseY-10,mouseY+10)
        ellipse(randomMouseX,RandomMouseY,circleSize,circleSize);
    }
}