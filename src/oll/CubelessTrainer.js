define('oll/CubelessTrainer', ['oll/OLLSequence', 'utils/MyQueryString', 'oll/OLLConfigDisplay', 'oll/OLLConfigs'],
function(OLLSequence, MyQueryString, OLLConfigDisplay, OLLConfigs) {
    "use strict";
    // added comment
    var currentSequence;
    var currentIndex;
    var currentConfig;
    var sequence;
    var canvasContainer;
    var sequenceDisplay;
    var sequenceDisplayDiv;
    var undoStack = [];
    var redoStack = [];

    function startSequence(index) {
	undoStack = [];
	redoStack = [];
	var ollConfigDisplay = new OLLConfigDisplay();
	var canvas = ollConfigDisplay.createCanvas(sequence.sequence[index]);
	currentConfig = OLLConfigs.getConfig(sequence.sequence[index]);
	onRestart();
	if(canvasContainer.firstChild) {
	    canvasContainer.removeChild(canvasContainer.firstChild);
	}
	canvasContainer.appendChild(canvas);
	currentIndex = index;
    }

    function updateDisplay() {
	sequenceDisplayDiv.innerHTML = sequenceDisplay || "Type the right sequence...";
    }

    function onUndo() {
	if(undoStack.length) {
	    var item = undoStack.pop();
	    redoStack.push({currentSequence: currentSequence, sequenceDisplay: sequenceDisplay});
	    currentSequence = item.currentSequence || "";
	    sequenceDisplay = item.sequenceDisplay || "";
	    updateDisplay();
	}
    }

    function onRedo() {
	if(redoStack.length) {
	    var item = redoStack.pop();
	    undoStack.push({currentSequence: currentSequence, sequenceDisplay: sequenceDisplay});
	    currentSequence = item.currentSequence || "";
	    sequenceDisplay = item.sequenceDisplay || "";
	    updateDisplay();
	}
    }

    function onAction(action, display) {
	undoStack.push({currentSequence: currentSequence, sequenceDisplay: sequenceDisplay});
	redoStack = [];
	currentSequence += action;
	sequenceDisplay += display;
	updateDisplay();
	if(currentSequence === currentConfig.getSolution()) {
	    if(currentIndex+1 === sequence.sequence.length) {
		alert('You win');
	    } else {
		startSequence(currentIndex+1);
	    }
	}
    }
    function onSkip() {
	startSequence(currentIndex+1);
    }
    function onRestart() {
	undoStack.push({currentSequence: currentSequence, sequenceDisplay: sequenceDisplay});
	redoStack = [];
	currentSequence = "";
	sequenceDisplay = "";

	updateDisplay();
    }

    var buttonWidth = 70;//Math.floor(window.innerWidth / 3);
    var buttonHeight = 30;//Math.floor(3*buttonWidth/7);

    return function OLLTrainer() {
//	if(!MyQueryString.getValue('write')) {
	    MyQueryString.addFromCookie('trainerQueryCubeless');
//	}
	if(MyQueryString.getValue('zoom') === "true") {
	    document.body.style.zoom = "150%";
	} else {
	    document.body.style.zoom = "100%";
	}

        var only = MyQueryString.getIntValue('only');
        var length;
        if(only === null) {
            sequence = new OLLSequence({
	        excludeCases: MyQueryString.getIntArrayValue('exclude'),
	        easyCases: MyQueryString.getIntArrayValue('easy'),
	        hardCases: MyQueryString.getIntArrayValue('hard'),
	        newCases: MyQueryString.getIntArrayValue('new'),
                pll: true
	    });
	    length = MyQueryString.getIntValue('length') || 25;
	    sequence.buildSequence(length);
        } else {
            length = 1;
            sequence = { sequence: [only]};
        }

        // if(MyQueryString.getBoolValue("write") && only === null) {
	//     MyQueryString.saveToCookie("trainerQuery", 60);
        // }
	// MyQueryString.setValue("write", true);
	// MyQueryString.saveToCookie("trainerQueryCubeless", 60);

	var configDisplay = new OLLConfigDisplay();
	var setupTrainingButton = document.createElement("input");
	setupTrainingButton.type = "button";
	setupTrainingButton.value = "Setup";
	setupTrainingButton.onclick=function() {
	    window.location.href = "CubelessTrainerSetup.html";//?" + MyQueryString.toQueryString();
	};

	document.body.appendChild(setupTrainingButton);

	var essai = document.createElement("a");
	essai.innerHTML = "&nbsp;";
	document.body.appendChild(essai);
	


	var rerollButton = document.createElement("input");
	rerollButton.type = "button";
	rerollButton.value = "Restart";
	rerollButton.onclick=function() {
//	    window.location.reload();;
	    onRestart();
	};


	document.body.appendChild(rerollButton);

	essai = document.createElement("a");
	essai.innerHTML = "&nbsp;";
	document.body.appendChild(essai);

	var skipButton = document.createElement("input");
	skipButton.type = "button";
	skipButton.value = "Skip";
	skipButton.onclick=function() {
//	    window.location.reload();;
	    onSkip();
	};
	document.body.appendChild(skipButton);

	// var br = document.createElement("br");
	// document.body.appendChild(br);

	canvasContainer = document.createElement('div');
	document.body.appendChild(canvasContainer);

	var undoRedoDiv = document.createElement('div');
	undoRedoDiv.style.position= 'absolute';
	undoRedoDiv.style.top = '60';
	undoRedoDiv.style.left='150px';
	document.body.appendChild(undoRedoDiv);
	var undoButton = createRepeatableButton('Undo', onUndo);

	undoRedoDiv.appendChild(undoButton);
	essai = document.createElement("br");
//	essai.innerHTML = "&nbsp;";
	undoRedoDiv.appendChild(essai);
	var redoButton = createRepeatableButton('Redo', onRedo);
	undoRedoDiv.appendChild(redoButton);
	
	sequenceDisplayDiv = document.createElement('div');
	document.body.appendChild(sequenceDisplayDiv);
	// essai = document.createElement("br");
	// document.body.appendChild(essai);
	//	document.body.appendChild(document.createElement("br"));


	// var br = document.createElement("br");
	// document.body.appendChild(br);
	startSequence(0);

	document.body.appendChild(buildButtonsMatrix());
//	var htmlDisplay = new OLLSequenceHTMLDisplay(sequence, configDisplay);

	// var i;
	// for(i = 1; i <= 57; i++) {
	//     var canvas = configDisplay.createCanvas(i);
	//     document.body.appendChild(canvas);
	//     if(i % 7 === 0) {
	// 	document.body.appendChild(document.createElement("br"));
	//     }
	// }
//	document.body.appendChild(htmlDisplay.div);
    }

    function buildButtonsMatrix() {
	var axes = [
	    {
		classic: 'U',
		lang: 'T'
	    },
	    {
		classic: 'D',
		lang: 'D'
	    },
	    {
		classic: 'L',
		lang: 'L'
	    },
	    {
		classic: 'R',
		lang: 'R'
	    },
	    {
		classic: 'F',
		lang: 'F'
	    },
	    {
		classic: 'B',
		lang: 'B'
	    },
	    {
		classic: 'x',
		lang: 'M'
	    },
	    {
		classic: 'y',
		lang: 'N'
	    },
	    {
		classic: 'z',
		lang: 'P'
	    },
	    {
		classic: 'u',
		lang: 'TE'
	    },
	    {
		classic: 'd',
		lang: 'DE'
	    },
	    {
		classic: 'l',
		lang: 'LE'
	    },
	    {
		classic: 'r',
		lang: 'RE'
	    },
	    {
		classic: 'f',
		lang: 'FE'
	    },
	    {
		classic: 'b',
		lang: 'BE'
	    }
	];
	var modifiers = [
	    {
		classic: '',
		lang: 'A'
	    },
	    {
		classic: "'",
		lang: 'O'
	    },
	    {
		classic: '2',
		lang: 'I'
	    },
	];
	var specials = [
	    {
		classic: "RUR'",
		lang: "SHA"
	    },
	    {
		classic: "R'UR",
		lang: "SHO"
	    },
	    {
		classic: "RU'R'",
		lang: "SHU"
	    },
	    {
		classic: "UR'U'",
		lang: "SHI"
	    },
	];
	function createButton(text, action) {
	    var button = document.createElement('input');
	    button.type = 'button';
	    button.value = text;
	    button.style.width = buttonWidth;
	    button.style.height = buttonHeight;
	    button.addEventListener('click', function () {
		onAction(action, text);
	    });
	    return button;
	}
	var div = document.createElement('div');
	div.style.position = 'absolute';
	div.style.top = '180px';
	div.style.left = '10px';
	var i, j, button;
	for(i = 0; i < axes.length; i++) {
	    for(j = 0; j < modifiers.length; j++) {
		button = createButton(axes[i].lang + modifiers[j].lang, axes[i].classic + modifiers[j].classic);
		div.appendChild(button);
	    }
	    div.appendChild(document.createElement('br'));
	}
	for(i = 0; i < specials.length; i++) {
	    button = createButton(specials[i].lang, specials[i].classic);
	    div.appendChild(button);
	    if(i % 3 == 2) {
		div.appendChild(document.createElement('br'));
	    }
	}
	return div;
    }
    function createRepeatableButton(text, onClickCB) {
	var btn = document.createElement("input");
	btn.style.width = buttonWidth;
	btn.style.height = buttonHeight;
	btn.type = "button";
	btn.value = text;
	var disableOnMouseUp = false;
	var timeoutID = null;
	btn.addEventListener('mouseup', function() {
	    if(!disableOnMouseUp) {
		onClickCB();
	    }
	    if(timeoutID !== null) {
		clearTimeout(timeoutID);
		timeoutID = null;
	    }
	});
	btn.addEventListener('mouseleave', function() {
	    if(timeoutID !== null) {
		disableOnMouseUp = true;
		clearTimeout(timeoutID);
		timeoutID = null;
	    }
	});
	btn.addEventListener('mousedown', function() {
	    function timeoutAgain() {
		onClickCB();
		disableOnMouseUp = true;
		timeoutID = setTimeout(timeoutAgain, 250);
	    }
	    disableOnMouseUp = false;
	    timeoutID = setTimeout(timeoutAgain, 500);
	});
	return btn;
    }
});
