function setup() {
    nounField==createInput()
    verbField=createInput()
    adjectiveField=createInput()
    adverbField=createInput()
    placeField=createInput()

    nounField.position(width/2+offsetX,height*0.2+offsetY)
    verbField.position(width/2+offsetX,height*0.2+offsetY+50)
    adjectiveField.position(width/2+offsetX,height*0.2+offsetY+100)
    adverbField.position(width/2+offsetX,height*0.2+offsetY+150)
    placeField.position(width/2+offsetX,height*0.2+offsetY+200)
}

function draw(){
    background(200);
    Text()
}