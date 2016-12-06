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
	    currentSequence = item.currentSequence;
	    sequenceDisplay = item.sequenceDisplay;
	    updateDisplay();
	}
    }

    function onRedo() {
	if(undoStack.length) {
	    var item = redoStack.pop();
	    undoStack.push({currentSequence: currentSequence, sequenceDisplay: sequenceDisplay});
	    currentSequence = item.currentSequence;
	    sequenceDisplay = item.sequenceDisplay;
	    updateDisplay();
	}
    }

    function onAction(action, display) {
	undoStack.push({currentSequence: currentSequence, sequenceDisplay: sequenceDisplay});
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
	currentSequence = "";
	sequenceDisplay = "";
	updateDisplay();
    }

    return function OLLTrainer() {
	if(!MyQueryString.getValue('write')) {
	    MyQueryString.addFromCookie('trainerQueryCubeless');
	}
	sequence = new OLLSequence({
	    excludeCases: MyQueryString.getIntArrayValue('exclude'),
	    easyCases: MyQueryString.getIntArrayValue('easy'),
	    hardCases: MyQueryString.getIntArrayValue('hard'),
	    newCases: MyQueryString.getIntArrayValue('new'),
	    pll: true

	});
	var length = MyQueryString.getIntValue('length') || 25;
	sequence.buildSequence(length);
	MyQueryString.setValue("write", true);
	MyQueryString.saveToCookie("trainerQueryCubeless", 60);

	var configDisplay = new OLLConfigDisplay();
	var setupTrainingButton = document.createElement("input");
	setupTrainingButton.type = "button";
	setupTrainingButton.value = "Setup";
	setupTrainingButton.onclick=function() {
	    window.location.href = "CubelessTrainerSetup.html?" + MyQueryString.toQueryString();
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

	essai = document.createElement("a");
	essai.innerHTML = "&nbsp;";
	document.body.appendChild(essai);
//	document.body.appendChild(document.createElement("br"));
	var btn = document.createElement("input");
	btn.type = "button";
	btn.value = "Undo";
	btn.onclick=function() {
	    onUndo();
	};
	document.body.appendChild(btn);
	essai = document.createElement("a");
	essai.innerHTML = "&nbsp;";
	document.body.appendChild(essai);
	btn = document.createElement("input");
	btn.type = "button";
	btn.value = "Redo";
	btn.onclick=function() {
	    onRedo();
	};
	document.body.appendChild(btn);


	var br = document.createElement("br");
	document.body.appendChild(br);

	canvasContainer = document.createElement('div');
	document.body.appendChild(canvasContainer);

	sequenceDisplayDiv = document.createElement('div');
	document.body.appendChild(sequenceDisplayDiv);
	var br = document.createElement("br");
	document.body.appendChild(br);
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
	    button.style.width = 70;
	    button.style.height = 30;
	    button.addEventListener('click', function () {
		onAction(action, text);
	    });
	    return button;
	}
	var div = document.createElement('div');
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

});
