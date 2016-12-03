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
	return canvas;
    }
    return OLLConfigDisplay;
});
