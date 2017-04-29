(function() {
    "use strict";
    var textArea, resultTextArea, shashusho;
    var shashushoOn = true;
    window.onStart = function() {
	textArea = document.getElementById('myTextArea');
	textArea.value = window.defaultText;
	resultTextArea = document.getElementById('resultTextArea');
	shashusho = document.getElementById('shashu');
    }
    var focusedOnce = false;
    window.onTextAreaFocus = function() {
	if(!focusedOnce) {
	    textArea.value = "";
	    focusedOnce = true;
	}
    }
    window.onTextAreaFocusOut = function() {
	if(!textArea.value) {
	    focusedOnce = false;
	    textArea.value = window.defaultText;
	}
    }

    window.toggleOption = function() {
	shashushoOn = !shashushoOn;
	shashusho.style.textDecoration = shashushoOn ? 'none' : 'line-through';
	window.onTextAreaChange();
    }


    window.onTextAreaChange = function() {
	if(!focusedOnce) return;
	var input = textArea.value;
	var lines = input.split('\n');
	var result = "", res1, res2, goodRes;
	var i;
	for(i = 0; i < lines.length; i++) {
	    res1 = window.stdToShataro(lines[i], shashushoOn);
	    res2 = window.shataroToStd(lines[i]);
	    if(res1.complete) {
		goodRes = res1;
	    } else if(res2.complete) {
		goodRes = res2;
	    } else {
		goodRes = res1.result.length > res2.result.length ? res1 : res2;
	    }
	    result += goodRes.result + (goodRes.complete ? "" : " " + window.incomplete) + '\n';
	}
	resultTextArea.value = result;
    }
    
    
})();
