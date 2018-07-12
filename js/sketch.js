var p_1 = [];
var p_2 = [];
var p_3 = [];
var w;
var counter = 0;
var stepCounter = 0;

var bg_color = '#4f9bd9';
var n_branch;



var tree_layer;
var new_tree = 0;
var padding;



// variables for gradient
var Y_AXIS = 1;
var X_AXIS = 2;
var c1, c2;




var Container = [];
var Stars = []
var sand_color = ['#f6d7b0', '#f2d2a9', '#eccca2', '#e7c496', '#e1bf92'];
var star_color = ['#ffd27d', '#ffa371', '#a6a8ff', '#fffa86', '#a87bff'];
var new_sand = false;
var new_star = false;
var status = 'night';

function setup(){
  // createCanvas(windowWidth, windowHeight);
  // console.log('width = ' + width);
  // generate
  createCanvas(windowWidth, windowHeight);
  w = width/20;
  // background(bg_color);
  colorMode(HSB);
  
  for(i = 0; i < w; i++){
    var x = map(i, 0,12, 0,width);
    var y = random(height/1.2, height/1.5);
    p_1.push({x: x, y: y});
  }
  
  for(i = 0; i < w; i++){
    var x = map(i, 0,12, 0,width);
    var y = random(height/1.5, height/2);
    p_2.push({x: x, y: y});
  }

  for(i = 0; i < w; i++){
    var x = map(i, 0,12, 0,width);
    var y = random(height/2, height/2.5);
    p_3.push({x: x, y: y});
  }
  
  

  tree_layer = createCanvas(windowWidth, windowHeight);
  

  c1 = color('#007dff');
  c2 = color('#5ad9f9');


  
}
  





function draw() {
  
  changeColor(mouseY);
  setGradient(0, 0, width, 0.5*height, c1, c2, Y_AXIS);

  // noStroke();
  // colorMode(HSB);
  generateSun(width/2, height/3);
  fill(90, 100, 100, 100);
  generatingMoon(width/2, height/2);
  noStroke();
  fill('#8c3313');
  generatingDesert(p_3, 6);
  fill('#b6571d');
  generatingDesert(p_2, 4);
  fill('#e6a644');
  generatingDesert(p_1, 2);

  // // setGradient(50, 190, 540, 80, c2, c1, X_AXIS);
  
  // // draw a tree
  generateTree(n_branch);

  
  var wind = createVector(0.5, 0);
  var windOpp = createVector(-0.5, 0);


  if (mouseY < height/2) {
    if (new_sand == true) {
      for (var i = 0; i < 10; i++) {
        var new_particle = new Particle(random(width), random(height*2/3), random(1, 5))
    
        Container.push(new_particle);
      }
    
    new_sand = false;
    // console.log('generated');
  }
  for (p in Container) {
          Container[p].update();
          Container[p].display();
          Container[p].edges();
        }
  // var gravity1 = createVector(0,0.2*particle1.mass);
  // particle1.applyForce(gravity1);
   
  // var gravity2 = createVector(0,0.2*particle2.mass);
  // particle2.applyForce(gravity2);
  if (mouseIsPressed) {
    for (p in Container) {
      var isUpward = random(30);

      if (mouseX > width/2) {
        
          // console.log(Container[p]);
          Container[p].applyForce(wind);
          Container[p].applyForce(Container[p].gravity);
        
      }
      else{
        for (p in Container) {
          // console.log(Container[p]);
          Container[p].applyForce(windOpp);
          Container[p].applyForce(Container[p].gravity);
        }
      }

      if (isUpward > 25) {
        Container[p].applyForce(Container[p].upward);
      }
    }
  }
  }
  else {
    if (new_star == true) {
    var astar = new Star(random(width), random(height/3), random(1, 5))
    
    Stars.push(astar);
    new_star = false;
    // console.log('generated');
  }
  for (q in Stars) {
          Stars[q].update();
          Stars[q].display();
          Stars[q].edges();
        }
  // var gravity1 = createVector(0,0.2*particle1.mass);
  // particle1.applyForce(gravity1);
   
  // var gravity2 = createVector(0,0.2*particle2.mass);
  // particle2.applyForce(gravity2);
  
  }


}

function keyTyped() {
  if (key == 't') {
    padding = random(-width/2, width/2);
    n_branch = random(100, 120)

  }
  else if (key == 'c') {
    n_branch = 0;
    new_sand = false;
    new_star = false;
    Stars = [];
    Container = [];
  }
  else if (key == 'a') {
    // console.log('executed');
    new_sand = true;

  }
  else if (key == 's') {
    new_star = true;
  }
}



function changeColor(mouseY) {
  var from1 = color('#007dff');
  var from2 = color('#5ad9f9');

  var to1 = color('#111227');
  var to2 = color('#2e457d');

  c1 = lerpColor(from1, to1, mouseY/1000);
  c2 = lerpColor(from2, to2, mouseY/1000);
}


function generateTree(length) {
    // colorMode(RGB);
    tree_layer.stroke(100,200,0);
    push();
    tree_layer.translate(window.innerWidth/2 + padding, height);
    branch(length);
    pop();
    
    // colorMode(HSB);
    colorMode(RGB);

  
}


function branch(length){
 
    tree_layer.line(0, 0, 0, -length);
    tree_layer.translate(0, -length);
  
  var x = map(mouseX, 0, 2000, -0.5, 0.5)

  if(length>90){
    tree_layer.strokeWeight(2)
    push();
    noiseSeed(99);
    tree_layer.stroke(100+stepCounter*20,200+stepCounter*20,0);
    tree_layer.rotate(PI/4*noise(-counter));
    tree_layer.rotate(PI/4 * x / 4);

    branch(length*0.95);
    pop();
    push();
    noiseSeed(19);
    tree_layer.rotate(-PI/4*noise(counter));
    tree_layer.rotate(PI/4 * x / 4);

    // rotate(-PI/4);
    // cycle++;
    branch(length*0.95);
    pop();
  }else{
    stepCounter = 0;
  }
  counter +=0.00002;
  stepCounter+=1;
}


function setGradient(x, y, w, h, c1, c2, axis) {

  noFill();

  if (axis == Y_AXIS) {  // Top to bottom gradient
    for (var i = y; i <= y+h; i++) {
      var inter = map(i, y, y+h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x+w, i);
    }
  }  
  // else if (axis == X_AXIS) {  // Left to right gradient
  //   for (var i = x; i <= x+w; i++) {
  //     var inter = map(i, x, x+w, 0, 1);
  //     var c = lerpColor(c1, c2, inter);
  //     stroke(c);
  //     line(i, y, i, y+h);
  //   }
  // }
}

function generatingMoon(x, y, _color) {
  fill('#eee6ab');
  stroke('#c5bc8e');
  strokeWeight(3);
  var j = mouseX/15;
  var k = mouseY/2; 
  ellipse(x - j, y - k + 2/8 * height, width / 6);
  noStroke();
  fill(c2);
  ellipse(x - j - width/8 + width/12, y - k + 2/8 * height, width/9);
}


function generateSun(x, y) {
  var j = mouseX/15;
  var k = mouseY / 2 - 2/80 * height;
  fill('#e46700');
  stroke('#f2740b');
  strokeWeight(3);
  ellipse(x - j, y + k, width /  6);
  // noStroke();
  // fill(bg_color);
  // ellipse(x - j - width/8 + width/12, y + k, width/9);

  // ellipse();

}



function generatingDesert(_points, param) {

  var j = mouseX/10;
  var k = mouseY/10;

  beginShape();
  vertex(0, height);
  for(i = 0; i < w; i++){
    stroke(100);
    strokeWeight(2);
    vertex(_points[i].x-j/param, _points[i].y-k/param);
  }
  vertex(width, height);
  endShape(CLOSE);
}




function Particle(x,y,m) {
  this.pos = createVector(x, y);
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.mass = m;
  this.gravity = createVector(0,0.03*m);
  this.upward = createVector(0,-3/m)
  
  this.applyForce = function(force) {
    var f = force.copy();
    f.div(this.mass);
    // var f = p5.Vector.div(force,this.mass); 
    this.acc.add(f);
  }
  
  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    
    this.acc.set(0,0);
  }
  
  this.display = function() {
    noStroke();
    var random_color = sand_color[Math.floor(Math.random()*sand_color.length)];
    fill(random_color);
    ellipse(this.pos.x, this.pos.y, this.mass*2,this.mass*2);
  }
  
  this.edges = function() {
    if(this.pos.y > height-this.mass*5) {
      var bounce = random(0, 9);
      if (bounce < 6) {
        this.vel.y *= -1;
        this.pos.y = height- this.mass*5;
      }
      else {
        this.vel.y *= 0;
        this.pos.y = height- this.mass*5;
      }
      
    }
    
    if (this.pos.x > width- this.mass*5) {
      this.vel.x *= 1;
      this.pos.x = this.mass*5;
    }
    
        
    if (this.pos.x < this.mass*5) {
      this.vel.x *= 1;
      this.pos.x = width;
    }

  }
}


function Star(x,y,m) {
  console.log('executed');
  this.pos = createVector(x, y);
  this.vel = createVector(0.1,0);
  this.acc = createVector(0,0);
  this.mass = m;
  this.gravity = createVector(0,0.03*m);
  this.upward = createVector(0,-3/m)
  
  this.applyForce = function(force) {
    var f = force.copy();
    f.div(this.mass);
    // var f = p5.Vector.div(force,this.mass); 
    this.acc.add(f);
  }
  
  this.update = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    
    this.acc.set(0,0);
  }
  
  this.display = function() {
    noStroke();
    var random_color = star_color[Math.floor(Math.random()*sand_color.length)];
    fill(random_color);
    ellipse(this.pos.x, this.pos.y, this.mass*2,this.mass*2);
  }
  
  this.edges = function() {
    if(this.pos.y > height-this.mass*5) {
      var bounce = random(0, 9);
      if (bounce < 6) {
        this.vel.y *= -1;
        this.pos.y = height- this.mass*5;
      }
      else {
        this.vel.y *= 0;
        this.pos.y = height- this.mass*5;
      }
      
    }
    
    if (this.pos.x > width- this.mass*5) {
      this.vel.x *= 1;
      this.pos.x = this.mass*5;
    }
    
        
    if (this.pos.x < this.mass*5) {
      this.vel.x *= 1;
      this.pos.x = width;
    }

  }
}





