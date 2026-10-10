let inputText;

function setup() {
    createCanvas(600,400);
    background(220);
    textSize(40)
    textAlign(CENTER,CENTER)
    inputText=createInput();
    let offsetX=this.canvas.offsetLeft
    let offsetY=this.canvas.offsetTop
    inputText.position(inputX,inputY);
    inputText.input(updateText);
    submitButton=createButton("Guess");
    submitButton.position(width/2+offsetX,height/2+offsetY);
    submitButton.mousePressed(generateStory);
}

function draw() {
    text(width/2+offsetX,height/2+offsetY)
}

function updateText() {
    displayText=this.value();
    console.log(displayText);
}