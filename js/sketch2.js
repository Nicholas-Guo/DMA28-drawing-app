// var stars = [];
// var shootingStar = [];


// function setup() {
//   createCanvas(400, 400);
//   frameRate(5);
//   for (var i = 0; i < 50; i++) {
//     stars.push(new Star());
// }
//   for (var i = 0; i < 50; i++) {
//     shootingStar.push(new ShootingStar());
// }
// }

// function draw () {
//   background(0);
//   for (var i = 0; i < 50; i++) {
//     stars[i].draw();
// }
// for (var i = 0; i < 50; i++) {
//     shootingStar[i].draw();
// }
// }


// function Star() {
//    this.x = random(windowWidth);
//    this.y = random(windowHeight-200);
//    this.w = 2;
// this.h = 2;
// }

// Star.prototype.draw = function() {
//    // We'll add code here
//    noStroke();
// fill(255, 255, 0);
// ellipse(this.x, this.y, this.w, this.h);
// this.x += (random(10) - 5);
// this.y += (random(10) - 5);
// if (this.w == 2) {
//     this.w = 3;
//     this.h = 3;
// } else {
//     this.w = 2;
//     this.h = 2;
// }
// }


// function ShootingStar() {
//   this.x = random(windowWidth-200);
//   this.y = random(windowHeight-400);
//   this.w = 6;
//   this.h = 4;
// }




// ShootingStar.prototype.draw = function() {
//   noStroke();
//   fill(255, 255, 0);
//   ellipse(this.x, this.y, this.w, this.h);
//   if (this.h > 0) {
//     this.h -= 0.5;
//   }
//   this.w += 7;
//   this.x += 5;
// }



