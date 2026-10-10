let inputText;

function setup() {
    createCanvas(600,400);
    background(220);
    textSize(40)
    textAlign(CENTER,CENTER)
    inputText=createInput();
    let inputX=this.canvas.offsetLeft+(width/2)-80;
    let inputY=this.canvas.offsetTop+(height/2)-10;
    inputText.position(inputX,inputY);
    inputText.input(updateText);
    colourPicker=createColorPicker();
    let offsetX=this.canvas.offsetLeft
    let colourY=this.canvas.offsetTop+(height*0.7);
    colourPicker.position(colourX,colourY);
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