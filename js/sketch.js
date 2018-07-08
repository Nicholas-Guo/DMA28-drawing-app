	// these shouldn't be modified by users
	var pg;
	var color_pick;
	var canvas_height;
  	var canvas_width;
	var top_margin;
  	var left_margin;
  	var static_c2;	// background color for the color picker, or just indicate location

  	// following variables are for buttons
  	var radius;
  	var isOverCircle;
	// var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

	// var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;



  	// parameters user may want to change
  	
  	var picture_height;
  	var picture_width;
  	
  	var stroke_weight = 5;
  	var c1;


  	// console.log(top_margin);
  	// console.log(left_margin);




  	function setup() {

		canvas_height = windowHeight;
  		canvas_width = windowWidth;
  		picture_height = canvas_height * 0.7;
  		picture_width = canvas_width * 0.8;

  		// canvas_height = 600;
  		// canvas_width = 600;
		top_margin = (canvas_height - picture_height) / 2;
  		left_margin = (canvas_width - picture_width) / 2;

      	// createCanvas(600, 600);
      	createCanvas(canvas_width, canvas_height);

      	// create layer for drawing
      	pg = createGraphics(picture_width, picture_height);
	  	// pg.colorMode(HSB, 100, 100, 100);
	  	c1 = pg.color('#4286f4');
	  	pg.background('#ffffff');

	  	// create layer for color picker;
	  	color_pick = createGraphics(canvas_width * 0.8, canvas_height * 0.1);
	  	// static_c2 = color_pick.color('#43ad29');
	  	color_pick.background('#43ad29');
	  	// color_pick.colorMode(HSB, 100, 100, 100);
	}

	function draw() {
		// canvas layer
	  	background(0);
	  
	  	// drawing layer
	  	ellipse(mouseX, mouseY, 20);
	  	image(pg, left_margin, top_margin);

	  	// color picker layer
	  	// fill('#43ad29');
	  	// ellipse(mouseX, mouseY, 10);
	  	image(color_pick, canvas_width * 0.1, canvas_height * 0.9);
	  	// var c3 = color_pick.color('fff2ee');
	  	// color_pick.fill();
	  	// color_pick.ellipse(canvas_width/2, canvas_height/2, 16);

	}



	function mouseDragged() {
  		c1 = pg.color('#4286f4');
  		pg.fill(c1);
  		pg.stroke('#4286f4');
  		pg.strokeWeight(stroke_weight);
	  	// pg.noSmooth();
	  	pg.line((pmouseX-left_margin)/2, (pmouseY-top_margin)/2, (mouseX-left_margin)/2, (mouseY-top_margin)/2);
	  	// pg.strokeWeight(1);
	  	// pg.ellipse((mouseX-margin)/2, (mouseY-margin)/2, 4);

	  
	}

	function keyTyped() {

	}

	function createButton(_color, x, y) {
		color_pick.ellipseMode(CENTER);
		color_pick.noStroke();
		color_pick.fill('red');
		button = color_pick.ellipse(x, y, 15, 15);
	}




