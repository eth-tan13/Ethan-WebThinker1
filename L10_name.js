let inputText;
let displayText="Your Name Here";

function setup() {
    createCanvas(600,400);
    fill(0,255,255);
    textSize(40)
    
    inputText=createInput();
    inputText.position(width/2,height/2);
    inputText.input(updateText);
}

function draw() {
    background(220);
    text(displayText,width/2,height/2)
}

function updateText() {
    displayText=this.value();
    console.log(displayText);
}