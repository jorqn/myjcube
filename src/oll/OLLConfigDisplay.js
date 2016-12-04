define('oll/OLLConfigDisplay', ['oll/OLLConfigs'], function(OLLConfigs) {
    "use strict";
    var OLLConfigDisplay = function(params) {
	params = params || {};
	this.size = params.size || 120;
	this.color = params.color || "yellow";
	this.noColor = params.noColor || "gray";
	this.outlineColor = params.outlineColor || "black";
    };
    OLLConfigDisplay.prototype.createCanvas = function(configId) {
	function drawArrow(fromx, fromy, tox, toy, doubleArrow){
                //variables to be used when creating the arrow
                var ctx = context;
                var headlen = 4;

                var angle = Math.atan2(toy-fromy,tox-fromx);
	    var color = "black";
                //starting path of the arrow from the start square to the end square and drawing the stroke
                ctx.beginPath();
                ctx.moveTo(fromx, fromy);
                ctx.lineTo(tox, toy);
                ctx.strokeStyle = color;
                ctx.lineWidth = 2;
                ctx.stroke();

                //starting a new path from the head of the arrow to one of the sides of the point
                ctx.beginPath();
                ctx.moveTo(tox, toy);
                ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));

                //path from the side point of the arrow, to the other side point
                ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),toy-headlen*Math.sin(angle+Math.PI/7));

                //path from the side point back to the tip of the arrow, and then again to the opposite side point
                ctx.lineTo(tox, toy);
                ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));

                //draws the paths created above
                ctx.strokeStyle = color;
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.fillStyle = color;
                ctx.fill();

	    if(doubleArrow) {
		var t;
		t = tox;
		tox = fromx;
		fromx = t;
		t = toy;
		toy = fromy;
		fromy = t;
		angle = Math.atan2(toy-fromy,tox-fromx);

                //starting a new path from the head of the arrow to one of the sides of the point
                ctx.beginPath();
                ctx.moveTo(tox, toy);
                ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));

                //path from the side point of the arrow, to the other side point
                ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),toy-headlen*Math.sin(angle+Math.PI/7));

                //path from the side point back to the tip of the arrow, and then again to the opposite side point
                ctx.lineTo(tox, toy);
                ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));

                //draws the paths created above
                ctx.strokeStyle = color;
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.fillStyle = color;
                ctx.fill();

	    }

            }
	var canvas = document.createElement('canvas');
	canvas.width = this.size;
	canvas.height = this.size;
	var context = canvas.getContext("2d");
	context.strokeStyle = this.outlineColor;
	context.lineWidth = 1;
	var step = Math.floor(this.size / 5);
	var thinStep = Math.floor(step/4);
	var margin = Math.max(2, Math.floor(step/20));

	var config = OLLConfigs.getConfig(configId);

	function drawRect(x, y, w, h) {
	    context.fillRect(x-0.5, y-0.5, w, h);
	    context.strokeRect(x-0.5, y-0.5, w, h);
	}
	var x, y;
	for(x = 1; x < 4; x++) {
	    for(y = 1; y < 4; y++) {
		if(config.isFilledAtPoint(x, y)) {
		    context.fillStyle = this.color;
		} else {
		    context.fillStyle = this.noColor;
		}
		drawRect(x*step, y*step, step - margin, step - margin);
	    }
	    context.fillStyle = this.color;
	    if(config.isFilledAtPoint(x, 0)) {
		drawRect(x*step, step - thinStep, step - margin, thinStep - margin);
	    }
	    if(config.isFilledAtPoint(x, 4)) {
		drawRect(x*step, 4 * step, step - margin, thinStep - margin);
	    }
	}
	context.fillStyle = this.color;
	for(y = 1; y < 4; y++) {
	    if(config.isFilledAtPoint(0, y)) {
		drawRect(step - thinStep, y*step, thinStep - margin, step - margin);
	    }
	    if(config.isFilledAtPoint(4, y)) {
		drawRect(4*step, y*step, thinStep - margin, step - margin);
	    }
	}
	var arrows = config.getArrows();
	if(arrows) {
	    var i, arrow;
	    for(i = 0; i < arrows.length; i++) {
		arrow = arrows[i];
		drawArrow(arrow[0][0]*step+step/2-1, arrow[0][1]*step+step/2-1,
			  arrow[2][0]*step+step/2-1, arrow[2][1]*step+step/2-1, arrow[1] === '<->');
	    }
	}
	return canvas;
    }
    return OLLConfigDisplay;
});
