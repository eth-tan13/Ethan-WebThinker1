function setup() {
    createCanvas(600,400);
    textAlign(CENTER,CENTER);
    textSize(40);
    fill("rgb(255,255,0)");
    yPos=height;
}

function draw() {
    hr=hour()
    minute=minute()
    second=second()
    text(hour,width/2,height/2)

}