
var Container = [];
var sand_color = ['#f6d7b0', '#f2d2a9', '#eccca2', '#e7c496', '#e1bf92'];

function setup() {
  createCanvas(windowWidth,windowHeight);
  // particle1 = new Particle(width/4,height/3,1)
  // Container.push(particle1);
  // Container.push(new Particle(width*3/4,height/3,5));

  // console.log(Container);
  // console.log(Container[0]);
}

function draw() {
  background(60);
  // particle1 = new Particle(width/4,height/3,1)
  // Container.push(particle1);
  // Container.push(new Particle(width*3/4,height/3,5));
      fill(255);
  textAlign(CENTER);
   textSize(18);
  text("Click to blow some wind", width/2, 50);
  var wind = createVector(0.5, 0);
  var windOpp = createVector(-0.5, 0);


  // var gravity1 = 
  // particle1.applyForce(gravity1);
   
  // var gravity2 = createVector(0,0.2*particle2.mass);
  // particle2.applyForce(gravity2);
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
      if (mouseX > width/2) {
        for (p in Container) {
        	// console.log(Container[p]);
        	Container[p].applyForce(wind);
        	Container[p].applyForce(Container[p].gravity);
        }
      }
      else{
        for (p in Container) {
        	// console.log(Container[p]);
        	Container[p].applyForce(windOpp);
        	Container[p].applyForce(Container[p].gravity);
        }
      }
  }
  

  // particle1.update();
  // particle1.display();
  // particle1.edges();
  // particle2.update();
  // particle2.display();
  // particle2.edges();
}

function Particle(x,y,m) {
  this.pos = createVector(x, y);
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.mass = m;
  this.gravity = createVector(0,0.05*m);
  
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


function keyTyped() {
	if (key == 'p') {
		console.log('executed');
		var new_particle = new Particle(random(width), random(height), random(1, 5))
		
		Container.push(new_particle);

	}
}