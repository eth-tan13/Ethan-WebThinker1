// let hr;
// let min;
// let sec;

// function setup() {
//     createCanvas(600,400);
//     textAlign(CENTER,CENTER);
//     textSize(40);
//     fill("rgb(255,255,0)");
// }

// function draw() {
//     background(100);
//     hr=hour();
//     min=minute();
//     sec=second();
//     timeString=nf(hr,2)+" : "+nf(min,2)+" : "+nf(sec,2);
//     text(timeString,width/2,height/2);
// }

// let intervalId;
// let x=0;

// function setup() {
//     createCanvas(600,400);
//     intervalId=setInterval(drawCircle,1000)
// }

// function draw() {

// }

// function drawCircle(){
//     clear();
//     circle(x,50,20);
//     x+=10;
//     if (x>200) {
//         x=0;
//     }
// }

// function mousePressed() {
//     clearInterval(intervalId)
// }

let countdown = 5;
let intervalId;

function setup() {
  createCanvas(400, 400);
  let intervalId=setInterval(updateCountdown,1000);
  textAlign(CENTER, CENTER);
  textSize(64);
}

function draw() {
  background(0);
  text(countdown, width / 2, height / 2);
}

function mousePressed() {
    if(countdownStart===false){
        let intervalId=setInterval(updateCountdown,1000);
    }
}

function updateCountdown() {
    countdown--;
    if (countdown<=0){
        countdown=0;
        clearInterval(intervalId)
    }
}