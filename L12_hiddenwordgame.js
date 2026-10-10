let textField;

function setup() {
    createCanvas(600,400);
    background(220);
    textSize(40);
    textAlign(CENTER,CENTER);
    textFieldt=createInput();
    let inputX=this.canvas.offsetLeft
    let inputY=this.canvas.offsetTop
    textField.position(width/2+offset-80,height/2+offsetY);
    textField.input(updateText);
    submitButton=createButton("Guess");
    submitButton.position(width/2+offsetX+100,height/2+offsetY);
    submitButton.mousePressed(generateStory);
}

function draw() {

}

function updateText() {
    displayText=this.value();
    console.log(displayText);
}