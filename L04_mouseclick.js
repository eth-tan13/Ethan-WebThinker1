for(i=0;i<256;i++) {
    
}
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
    shapeColor = 'red';
}

function mouseReleased() {
    shapeColor = 'blue';
}