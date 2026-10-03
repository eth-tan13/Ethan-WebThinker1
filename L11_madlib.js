function setup() {
    nounField==createInput()
    verbField=createInput()
    adjectiveField=createInput()
    adverbField=createInput()
    placeField=createInput()

    nounField.position(width/2+offsetX,height*0.,+offsetY)
    verbField.position(width/2+offsetX,height*0.2+offsetY+50)
}