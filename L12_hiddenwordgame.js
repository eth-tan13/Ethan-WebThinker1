let textField;

function setup() {
    createCanvas(600,400);
    background(220);
    textSize(40);
    textAlign(CENTER,CENTER);
    textField=createInput();
    let inputX=this.canvas.offsetLeft;
    let inputY=this.canvas.offsetTop;
    textField.position(width/2+offset-80,height/2+offsetY);
    textField.size(150,30);
    textField.style("background-color","lightblue");
    textField.style("font-size","20px");
    textField.style("border","1px solid black");
    textField.style("")
    textField.input(updateText);
    submitButton=createButton("Guess");
    submitButton.position(width/2+offsetX+100,height/2+offsetY);
    submitButton.mousePressed(submitGuess);
}

function draw() {

}

function submitGuess() {
    let inputText=textField.value();
    fill(0);
    textSize(28);
    text(inputText,width/2,height/3);
}

function updateText() {
    displayText=this.value();
    console.log(displayText);
}