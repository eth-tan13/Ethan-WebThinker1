let colourValue;

function setup() {
    createCanvas(600, 400);
    background(220);
    noLoop(); // Stops continuous drawing
  }
  
function draw() {
  // Recap 1: Repeating Circles
  // circle(75,200,100);
  // circle(225,200,100);
  // circle(375,200,100);
  // circle(525,200,100);

  // for (let i=10;i!=-1;i-=1) {
  //   console.log(i);
  // }

      // for(let i=0;i<5;i++) {
      //   console.log(i);
      //   circle(50+i*50,100,40);
      // }

  // Task 1: Colour Gradient
    // for(let i=0;i<5;i++) {
    //   console.log(i);
    //   fill(20,20+i*50,20);
    //   circle(50+i*50,100,40);
    // }

  // Task 2: Colour Loop
  circle(100,100,100);
  fill(colourValue);
  colourValue++;


  // Task 3: Row of Circles
    for (let i=0;i<5;i++); {
      if (i%2==0) {

      } else {
      fill(255);
      }
      circle(50+i*50,100,40);
  }
  

  // Task 4: Grid of Circles
}