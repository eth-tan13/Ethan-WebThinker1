function setup() {
    nounField==createInput();
    verbField=createInput();
    adjectiveField=createInput();
    adverbField=createInput();
    placeField=createInput();

    nounField.position(width/2+offsetX,height*0.2+offsetY);
    verbField.position(width/2+offsetX,height*0.2+offsetY+50);
    adjectiveField.position(width/2+offsetX,height*0.2+offsetY+100);
    adverbField.position(width/2+offsetX,height*0.2+offsetY+150);
    placeField.position(width/2+offsetX,height*0.2+offsetY+200);
}

function draw(){
    background(200);
    text("Enter a noun:",width*0.2,height*0.2);
    text("Enter a verb:",width*0.2,height*0.2+50);
    text("Enter an adjective:",width*0.2,height*0.2+100);
    text("Enter an adverb:",width*0.2,height*0.2+150)
    text("Enter a place:",width*0.2,height*0.2+200)
}