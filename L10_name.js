let inputText;
let displayText="Your Name Here";

function setup() {
    createCanvas(600,400);
    fill(0,255,255);
    textSize(40)
    textAlign(CENTER,CENTER)
    inputText=createInput();
    let inputX=this.canvas.offsetLeft+(width/2)-80;
    let inputY=this.canvas.offsetTop+(height/2)-10;
    inputText.position(inputX,inputY);
    inputText.input(updateText);
}

function draw() {
    background(220);
    text(displayText,width/2,height*0.3)
}

function updateText() {
    displayText=this.value();
    console.log(displayText);
}