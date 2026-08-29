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
    image(picoImage,width/2,height/2,100,100);
}