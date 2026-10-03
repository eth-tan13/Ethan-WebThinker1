function setup() {
    nounField==createInput()
    verbField=createInput()
    adjectiveField=createInput()
    adverbField=createInput()
    placeField=createInput()

    nounField.position(width/2+,height*0.2+Y)
    verbField.position(width/2+,height*0.2+offsetY+50)
    verbField.position(width/2+offsetX,height*0.2+offsetY+50)
}