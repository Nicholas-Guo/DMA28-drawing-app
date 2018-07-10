// these shouldn't be modified by users
// layers
var pg;
var track_layer;


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
var isOverRectangle = false;
var new_color;

	
// parameters user may want to change
  	
var picture_height;
var picture_width;
  	
var stroke_weight = 5;
var c1;
var draw_color = '#000000';
  	
//  variables for slider
var red_slider;
var green_slider;
var blue_slider;

var weight_slider;


// variables for special effects
var isMirror = false;
var isGradient = false;

var c1_y;
var c2_y;


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
    track_layer = createGraphics(picture_width, picture_height);
	// pg.colorMode(HSB, 100, 100, 100);
	c1 = pg.color(draw_color);
	pg.background('#fff2ee');

	// create color slider
	var slider_width = canvas_width * 0.25;

	red_slider = createSlider(0, 255, 0);
	red_slider.position(canvas_width * 0.5, canvas_height * 0.91);
	red_slider.style('width', slider_width + 'px');

	green_slider = createSlider(0, 255, 0);
	green_slider.position(canvas_width * 0.5, canvas_height * 0.94);
	green_slider.style('width', slider_width + 'px');

	blue_slider = createSlider(0, 255, 0);
	blue_slider.position(canvas_width * 0.5, canvas_height * 0.97);
	blue_slider.style('width', slider_width + 'px');

	// create weight slider for line

	weight_slider = createSlider(1, 20, 5);
	weight_slider.position(.04 * canvas_width, top_margin + 0.05 * picture_height);
	weight_slider.style('width', .05 * canvas_width + 'px');

	// setup smmetry checkbox
	var checkbox1 = createCheckbox('mirror');
	// console.log(checkbox1);
	c1_y = top_margin + 0.15 * picture_height;
	checkbox1.position(.04 *  canvas_width, c1_y);
	checkbox1.checked();
	checkbox1.changed(myCheckedEvent);

	var checkbox2 = createCheckbox('gradient');
	c2_y = top_margin + 0.25 * picture_height
	checkbox2.position(.04 * canvas_width, c2_y);
	checkbox2.checked();
	checkbox2.changed(myCheckedEvent);
}




function draw() {
	// canvas layer
  	background(0);
   	// ellipse(mouseX, mouseY, 20);
   	// ellipse(0,0,20)

  	// drawing layer
  	image(pg, left_margin, top_margin);
  	image(track_layer, left_margin, top_margin);

  	fill(255);
  	noStroke();

  	rect(canvas_width * 0.1, canvas_height * 0.9, picture_width, canvas_height * 0.1, 20, 20, 0, 0);	


	noStroke();
	// fill(_color);
  	rect(canvas_width * 0.76, canvas_height * 0.91, canvas_width * 0.13, canvas_height * 0.08, 20);


	buttons['slider'] = new Object();

	buttons['slider'].x = canvas_width * 0.13;
	buttons['slider'].y = canvas_height * 0.08;
	buttons['slider'].color = new Object();
	buttons['slider'].color.r = red_slider.value();
	buttons['slider'].color.g = green_slider.value();
	buttons['slider'].color.b = blue_slider.value();



  	fill(red_slider.value(), blue_slider.value(), green_slider.value());
  	rect(canvas_width * 0.76, canvas_height * 0.91, canvas_width * 0.13, canvas_height * 0.08, 20);

  	// draw buttons
  	drawButton('#ff0000', canvas_width * 0.15, canvas_height * 0.925, canvas_height * 0.03);

  	drawButton('#0000ff', canvas_width * 0.15, canvas_height * 0.975, canvas_height * 0.03);

  	drawButton('#00ff00', canvas_width * 0.25, canvas_height * 0.925, canvas_height * 0.03);

  	drawButton('#808080', canvas_width * 0.25, canvas_height * 0.975, canvas_height * 0.03);

  	drawButton('#ffc0cb', canvas_width * 0.35, canvas_height * 0.925, canvas_height * 0.03);

  	drawButton('#800080', canvas_width * 0.35, canvas_height * 0.975, canvas_height * 0.03);

  	drawButton('#ffff00', canvas_width * 0.45, canvas_height * 0.925, canvas_height * 0.03);

  	drawButton('#800000', canvas_width * 0.45, canvas_height * 0.975, canvas_height * 0.03);


  	// console.log(buttons);
  	// console.log(buttons['blue']);

  	// console.log(distances);

  	if (mouseX >= canvas_width * 0.76 && mouseX <= canvas_width * 0.76+canvas_width * 0.13 && mouseY >= canvas_height * 0.91 && mouseY <= canvas_height * 0.91+canvas_height * 0.08) {
		distances['slider'] = 0
	} 
	else {
		distances['slider'] = 100;
  	}


  	for (var e in distances){
  			
  			distance = distances[e];
  			if (e == 'slider') {
  				e = rgbToHex(buttons['slider'].color.r, buttons['slider'].color.b, buttons['slider'].color.g);
  			}
	  		if(distance < 10) {
				// console.log('executed');
				isOverCircle = true;
				new_color = e;
			}
			else {
				isOverCircle = false;
			}
			if(isOverCircle == true) {
				// fill(100);
			    cursor(HAND);
			    break;
			} 
			else {
			    // fill(200); 
			    cursor(ARROW); 
			}
  		}
  		
	  	
  	fill('255');
  	noStroke();
	rect(canvas_width * 0.03, top_margin, 0.07 * canvas_width, picture_height, 20, 0, 0, 20);

	fill(0);
	// textAlign(RIGHT);
	text('stroke weight', .041 * canvas_width, top_margin + 0.04 * picture_height);
}





function mouseDragged() {
	
	c1 = pg.color(draw_color);
  	pg.fill('c1');
  	pg.stroke(draw_color);
  	stroke_weight = weight_slider.value();
  	pg.strokeWeight(stroke_weight);
	pg.strokeJoin(ROUND);


	// 111111
	// if (isGradient) {
	// 	console.log('isGradient executed');
	// 	console.log('hex = ' + draw_color);


	// 	// if (typeof(draw_color) == str) {
	// 	console.log('typeof(draw_color) = ' + typeof(draw_color));
	// 	console.log('draw_color = ' + draw_color);

	// 	var rgb = hexToRgb(draw_color.substring(1));

	// 	console.log('rgb = ' + rgb);
	// 	var r, g, b;
	// 	var rgb_obj = rgb.split(',');
	// 	r = rgb_obj[0];
	// 	g = rgb_obj[1];
	// 	b = rgb_obj[2];
	// 	console.log('r = ' + r);

	// 	var hsl = rgbToHsl(r, g, b);
	// 	var h, s, l;
	// 	h = hsl[0];
	// 	s = hsl[1];
	// 	l = hsl[2];
	// 	console.log('hsl = ' +hsl);


	// 	var draw_color_new;
	// 	pg.colorMode(HSL, 360, 100, 100, 1);
	// 	track_layer.colorMode(HSL, 360, 100, 100, 1);
	// 	draw_color_new = (h, 100, 100, 1);
	// 	console.log(draw_color_new)
	// 	c1 = pg.color(draw_color_new);
	// 	pg.stroke(draw_color_new);
	// 	track_layer.stroke(draw_color_new);
	// 	// }
		

	// }

	
// 
	if (isMirror) {
		console.log('mirror!');
		track_layer.stroke(draw_color);
		track_layer.strokeWeight(stroke_weight);
		pg.line((pmouseX-left_margin)/2, (pmouseY-top_margin)/2, (mouseX-left_margin)/2, (mouseY-top_margin)/2);	
		track_layer.line((canvas_width - pmouseX - left_margin)/2, (canvas_height - (pmouseY) - top_margin)/2, (canvas_width - (mouseX) - left_margin)/2, (canvas_height - (mouseY) - top_margin)/2);
	}

	pg.line((pmouseX-left_margin)/2, (pmouseY-top_margin)/2, (mouseX-left_margin)/2, (mouseY-top_margin)/2);	

  
}
 

function mousePressed() {

	if (isOverCircle == true || isOverRectangle == true){
		console.log('in mousePressed, isOverCircle = ' + isOverCircle);
		console.log('new_color = ' + new_color);
		draw_color = new_color;
	}

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



function myCheckedEvent() {

    if (this.checked) {
    	// console.log(this);
    	console.log("It's checked!");
    	this.checked = false;
    	if (this.y == c1_y) {
    		isMirror = true;
    	}
    	if (this.y == c2_y) {
    		isGradient = true;
    	}

    } else {
    	console.log("It's not checked!");
    	this.checked = true;
    	if (this.y == c1_y) {
    		isMirror = false;
    	}
    	if (this.y == c2_y) {
    		isGradient = false;
    	}
    }
}



function keyTyped() {

}


// following functions are adapted from https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb and https://gist.github.com/mjackson/5311256
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}



function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;

    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }

      h /= 6;
    }

    return [ h, s, l ];
}

function hexToRgb(hex) {
    var arrBuff = new ArrayBuffer(4);
    var vw = new DataView(arrBuff);
    vw.setUint32(0,parseInt(hex, 16),false);
    var arrByte = new Uint8Array(arrBuff);

    return arrByte[1] + "," + arrByte[2] + "," + arrByte[3];
}
// function windowResized() {
// 	resizeCanvas(windowWidth, windowHeight);
// 	pg.resizeCanvas(windowWidth, windowHeight);
// }
