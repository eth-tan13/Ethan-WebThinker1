let inputText;

function setup() {
    createCanvas(600,400);
    background(220);
    textSize(40)
    textAlign(CENTER,CENTER)
    inputText=createInput();
    let inputX=this.canvas.offsetLeft
    let inputY=this.canvas.offsetTop
    inputText.position(inputX,inputY);
    inputText.input(updateText);
    submitButton=createButton("Guess");
    submitButton.position(width/2+offsetX,height*0.2+offsetY+250);
    submitButton.mousePressed(generateStory);
}

function draw() {
    background(colourPicker.value());
    text(displayText,width/2,height*0.3)
}

function updateText() {
    displayText=this.value();
    console.log(displayText);
}