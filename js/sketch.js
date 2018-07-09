	// these shouldn't be modified by users
	var pg;
	var color_pick;
	var canvas_height;
  	var canvas_width;
	var top_margin;
  	var left_margin;
  	var static_c2;	// background color for the color picker, or just indicate location

	var buttons = new Object();
  	var distances = new Object();

  	// following variables are for buttons
  	var radius
  	var isOverCircle = false;
  	var new_color;

	
  	// parameters user may want to change
  	
  	var picture_height;
  	var picture_width;
  	
  	var stroke_weight = 5;
  	var c1;
  	var draw_color = 'black';
  	
  	//  variables for slider
  	var red_slider;
  	var green_slider;
  	var blue_slider;




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
	  	c1 = pg.color(draw_color);
	  	pg.background('#fff2ee');

	  	// create slider
	  	red_slider = createSlider(0, 255, 0);
	  	red_slider.position(canvas_width * 0.77, canvas_height * 0.925);
	  	green_slider = createSlider(0, 255, 0);
	  	green_slider.position(canvas_width * 0.77, canvas_height * 0.95);
	  	blue_slider = createSlider(0, 255, 0);
	  	blue_slider.position(canvas_width * 0.77, canvas_height * 0.975);
	}

	function draw() {
		// canvas layer
	  	background(0);
	   	ellipse(mouseX, mouseY, 20);
	   	// ellipse(0,0,20)

	  	// drawing layer
	  	image(pg, left_margin, top_margin);

	  	fill('fff2ee');
	  	noStroke();
	  	rect(canvas_width * 0.1, canvas_height * 0.9, canvas_width * 0.8, canvas_height * 0.1);	
	  	drawButton('red', canvas_width * 0.125, canvas_height * 0.925, 20);

	  	drawButton('blue', canvas_width * 0.125, canvas_height * 0.975, 20);

	  	// console.log(buttons['red']);
	  	// console.log(buttons['blue']);

	  	// console.log(distances);

	  	for (var e in distances){
	  		distance = distances[e];
	  		if(distance < 10)
			{
				// console.log('executed');
				isOverCircle = true;
				new_color = e;
			}
			else {
				isOverCircle = false;
			}
			if(isOverCircle == true)
			{
				// fill(100);
			    cursor(HAND);
			    break;
			} 
			else {
			    // fill(200); 
			    cursor(ARROW); 
			}
	  	}

	  

	}



	function mouseDragged() {
  		c1 = pg.color(draw_color);
  		pg.fill('c1');
  		pg.stroke(draw_color);
  		pg.strokeWeight(stroke_weight);
	  	pg.strokeJoin(ROUND);

	  	pg.line((pmouseX-left_margin)/2, (pmouseY-top_margin)/2, (mouseX-left_margin)/2, (mouseY-top_margin)/2);


	  
	}

	function keyTyped() {

	}

	function drawButton(_color, x_pos, y_pos, radius) {
			  
		// draw a circle
		ellipseMode(CENTER);
		stroke(0);
		strokeWeight(1);
		fill(_color);
		ellipse(x_pos, y_pos, radius);


		buttons[_color] = new Object();

		buttons[_color].x = x_pos;
		buttons[_color].y = y_pos;

		distances[_color] = dist(mouseX, mouseY, x_pos, y_pos);
	}

	function mousePressed()
		{

			if (isOverCircle == true){
				console.log('in mousePressed, isOverCircle = ' + isOverCircle);
				console.log('new_color = ' + new_color);
				draw_color = new_color;
			}
			else{
				// console.log('slider is executed');
	  			draw_color = color(red_slider.value(), blue_slider.value(), green_slider.value());
			}
		}



