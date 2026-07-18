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
        for(let i=0;i<5;i++) {
        console.log(i);
        circle(50+i*50,100,40);
      }

  // Task 2: Colour Loop

  // Task 3: Row of Circles

  // Task 4: Grid of Circles
}