let hr;
let min;
let sec;

function setup() {
    createCanvas(600,400);
    textAlign(CENTER,CENTER);
    textSize(40);
    fill("rgb(255,255,0)");
}

function draw() {
    background(100)
    hr=hour()
    min=minute()
    sec=second()
    text(hr,width/2,height/2)
    text(min,width/2,height/2)
    text(sec,width/2,height/2)
}