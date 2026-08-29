let picoImage;
let popSound;

function preload() {
    picoImage = loadImage('assets/pico-a.png');
    popSound = loadSound('assets/pop.mp3');
}

function setup() {
    createCanvas(600,400);
}

function draw(){
    background("gray");
}

    if(keyIsDown(UP_ARROW)) {
        y-=5;
    }
    if(keyIsDown(DOWN_ARROW)) {
        y+=5;
    }
    if(keyIsDown(LEFT_ARROW)) {
        x-=5;
    }
    if(keyIsDown(RIGHT_ARROW)) {
        x+=5;
    }

    image(picoImage,width/2,height/2,100,100);