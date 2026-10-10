let textField;
let submitButton;
let randomWord;
let displayHint;

let wordArray = ["banana","potato","apple","orange"];

function setup() {
    createCanvas(600,400);
    background(100);
    textSize(40);
    textAlign(CENTER,CENTER);
    textField=createInput();
    let offsetX=this.canvas.offsetLeft;
    let offsetY=this.canvas.offsetTop;
    textField.position(width/2+offsetX-80,height/2+offsetY);
    textField.size(150,30);
    textField.style("background-color","lightblue");
    textField.style("font-size","20px");
    textField.style("border","1px solid black");
    textField.style("color","red");
    textField.style("text-align","center");
    textField.input(updateText);
    submitButton=createButton("Guess");
    submitButton.position(width/2+offsetX+100,height/2+offsetY);
    submitButton.mousePressed(submitGuess);
    randomWord=random(wordArray);
    displayHint=randomWord[0].toUpperCase()
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