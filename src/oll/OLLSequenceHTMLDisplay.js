define('oll/OLLSequenceHTMLDisplay', ['oll/OLLConfigs'], function(OLLConfigs) {
    "use strict";
    var OLLSequenceHTMLDisplay = function(ollSequence, ollConfigDisplay) {
	this.ollConfigDisplay = ollConfigDisplay;
	this.div = document.createElement('div');
	this.ollSequence = ollSequence;
	var i;
	for(i = 0; i < ollSequence.sequence.length; i++) {
	    this.div.appendChild(this.createElement(i+1, ollSequence.sequence[i]));
//	    this.div.appendChild(ollConfigDisplay.createCanvas(ollSequence.sequence[i]));
	}
	// for(i = 0; i < 57; i++) {
	//     this.div.appendChild(this.createElement(i+1, i+1));
	//     this.div.appendChild(ollConfigDisplay.createCanvas(i+1));
	// }
    };
    OLLSequenceHTMLDisplay.prototype.createElement = function(idx, sequence) {
	var config = OLLConfigs.getConfig(sequence);
	var p = document.createElement("h3");
	var a = document.createElement('a');
	a.className = "sequence";
	a.innerHTML = idx + ": " + config.getTrainingSequence();
	var _this = this;
	function updateDisplay() {
	    if(!checkBox.checked) {
		a.style.opacity = 1;
	    } else {
		a.style.opacity = 0.2;
		_this.ollSequence.onSuccess(idx-1);
	    }
	}
	a.onclick = function() {
	    checkBox.checked = !checkBox.checked;
	    updateDisplay();
	}
	var checkBox = document.createElement('input');
	checkBox.type='checkbox';
	p.appendChild(checkBox);
	checkBox.onchange = function() {
	    updateDisplay();
	}
	p.appendChild(a);
	return p;
    }
    return OLLSequenceHTMLDisplay;
});
