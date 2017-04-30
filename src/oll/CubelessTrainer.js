define('oll/CubelessTrainer', ['oll/OLLCleverSequence', 'utils/MyQueryString', 'oll/OLLConfigDisplay', 'oll/OLLConfigs', 'cube/Interpreter'],
       function(OLLCleverSequence, MyQueryString, OLLConfigDisplay, OLLConfigs, Interpreter) {
    "use strict";
    // added comment
    var absoluteTop = 80;
    var currentSequence;
    var currentIndex;
    var currentConfig;
    var sequence;
    var canvasContainer;
    var sequenceDisplay;
    var sequenceDisplayDiv;
    var statusText;
    var undoStack = [];
    var redoStack = [];
    var buttons;
    var lastPushedButton = null;
	   var cube = null;
	   var rotateTable = {};
    var only;
           var convention;

    function startSequence(index) {
	undoStack = [];
	redoStack = [];
	var ollConfigDisplay = new OLLConfigDisplay();
	var caseId = sequence.sequence[index];
	var canvas = ollConfigDisplay.createCanvas(caseId, undefined, undefined, rotateTable[caseId] || 0);
	currentConfig = OLLConfigs.getConfig(sequence.sequence[index], rotateTable[caseId] || 0);
//	document.title = "Cubeless Trainer - " + currentConfig.getNiceName() + " (" + (index+1)
//	    + "/" + sequence.sequence.length + ")";
	statusText.textContent = currentConfig.getNiceName() + " (" + (index+1)
	    + "/" + sequence.sequence.length + ")";
	onRestart();
	if(canvasContainer.firstChild) {
	    canvasContainer.removeChild(canvasContainer.firstChild);
	}
	canvasContainer.appendChild(canvas);
	currentIndex = index;
	if(index > 0 && window.mobileMode) {
	    splashConfig(sequence.sequence[index]);
	}
    }

    function splashConfig(index) {
	var ollConfigDisplay = new OLLConfigDisplay();
	var canvas = ollConfigDisplay.createCanvas(index, undefined, undefined, rotateTable[index] || 0);
	canvas.style.position = "absolute";
	canvas.style.pointerEvents = 'none';
	var scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
	var zoom = document.body.style.zoom;
	canvas.style.top = (scrollTop/zoom+((window.innerHeight/zoom - canvas.height) / 2)) + "px";
	canvas.style.left = ((window.innerWidth/zoom - canvas.width) / 2) + "px";
	canvas.style.opacity = 1;
	document.body.appendChild(canvas);
	var interval = setInterval(function() {
	    var opacity = 0.95 * canvas.style.opacity;
	    canvas.style.opacity = opacity;
	    if(opacity < 0.5) {
		clearInterval(interval);
		document.body.removeChild(canvas);
	    }
	}, 50)
    }

    function updateDisplay() {
	sequenceDisplayDiv.innerHTML = sequenceDisplay || "Type the right sequence...";
    }
    function setLastPushedButton(button) {
	resetLastPushedButton();
	lastPushedButton = button;
	if(lastPushedButton) {
            lastPushedButton.style.color = "red";
	}
    }
    function resetLastPushedButton() {
        if(lastPushedButton) {
            lastPushedButton.style.color = "";
            lastPushedButton = null;
        }
    }

	   function setCurrentSequence(formula, display) {
	       formula = formula || "";
	       display = display || "";
	       cube = currentConfig.buildCube();
	       var commands = Interpreter.parse(formula);
	       cube = cube.executeCommands(commands);
	       currentSequence = formula;
	       sequenceDisplay = display;
	   }
    function onUndo() {
//        resetLastPushedButton();
	if(undoStack.length) {
	    var item = undoStack.pop();
	    redoStack.push({currentSequence: currentSequence, sequenceDisplay: sequenceDisplay, button: lastPushedButton});
	    setCurrentSequence(item.currentSequence, item.sequenceDisplay);
	    setLastPushedButton(item.button);
	    updateDisplay();
	} else {
	    resetLastPushedButton();
	}
    }

    function onRedo() {
	if(redoStack.length) {
	    var item = redoStack.pop();pp
	    undoStack.push({currentSequence: currentSequence, sequenceDisplay: sequenceDisplay, button: lastPushedButton});
	    setCurrentSequence(item.currentSequence, item.sequenceDisplay);
	    setLastPushedButton(item.button);
	    updateDisplay();
	}
    }
    function onAction(action, display, event, button) {
        if(lastPushedButton === button) {
            splashText(null, event);
            onUndo();
        } else {
	    undoStack.push({currentSequence: currentSequence, sequenceDisplay: sequenceDisplay, button: lastPushedButton});
	    setLastPushedButton(button);
	    redoStack = [];
	    cube = cube.executeCommands(Interpreter.parse(action));
	    var solved = cube.isSolved(false, "yellow");
	    currentSequence += action;
	    sequenceDisplay += display;
	    updateDisplay();
            var win = false;
	    if(solved /*currentSequence === currentConfig.getSolution()*/) {
		sequence.onSuccess(currentIndex);
		win = true;
		if(currentIndex+1 === sequence.sequence.length) {
		    if(!only) {
			alert('You win');
		    } else {
			onRestart();
		    }
		} else {
		    startSequence(currentIndex+1);
		}
	    }
	    if((doZoom && !win)
	       || ((!doZoom || only) && win)) {
		splashText(display, event, win);
	    }
	}
    }
    function onSkip() {
	startSequence(currentIndex+1);
    }
    function onRestart() {
        //	undoStack.push({currentSequence: currentSequence, sequenceDisplay: sequenceDisplay});
        resetLastPushedButton();
        undoStack = [];
	redoStack = [];
	setCurrentSequence("", "");

	updateDisplay();
    }
    var nextSplashIndex = 0;
    var splashDivs = [];
    function splashText(text, event, win) {
        var color = text ? (win ? "DarkGreen" : "red") : "black";
        text = text || "X";
	var splashDiv = document.createElement('div');
	splashDiv.style.position = 'absolute';
	var width = 200, height = 200;
	splashDiv.style.width = width + 'px';
	splashDiv.style.height = height + 'px';
	splashDiv.style.font = "bold " + 64 + "px arial, sans-serif";
	splashDiv.style.color = color;
//	splashDiv.style.backgroundColor = "black";
	splashDiv.style.margin = "0px";
	splashDiv.style.display = "table";
	var textElement = document.createElement('div');
	textElement.style.textAlign = "center";
	textElement.style.verticalAlign = "middle";
	textElement.innerHTML = text;
	textElement.style.display = "table-cell";
	splashDiv.appendChild(textElement);
//	splashDiv.style.opacity = 0;
	splashDiv.style.pointerEvents = "none";
	splashDiv.style.opacity = 1;
	var zoom = window.mobileMode ? document.body.style.zoom : 1;
	var x = Math.floor(event.pageX/ zoom - width/2);
	var y = Math.floor(event.pageY/ zoom - height/2);
	splashDiv.style.top = y + 'px';//nextSplashIndex * 48;
	splashDiv.style.left = x + 'px';//nextSplashIndex * 48;
	var interval = setInterval(function () {
//	    return;
	    var index;
	    splashDiv.style.opacity *= 0.9;
	    if(splashDiv.style.opacity < 0.1) {
		document.body.removeChild(splashDiv);
		index = splashDivs.indexOf(splashDiv);
		splashDivs.splice(index, 1);
		if(splashDivs.length === 0) {
		    nextSplashIndex = 0;
		}
		clearInterval(interval);
	    }
	}, 50);
	document.body.appendChild(splashDiv);
	splashDivs.push(splashDiv);
	nextSplashIndex++;
    }

    var buttonWidth = 70;//Math.floor(window.innerWidth / 3);
    var buttonHeight = 30;//Math.floor(3*buttonWidth/7);
    var doZoom;

    function updateZoom() {
	if(doZoom) {
	    document.body.style.margin = 0;
	    var zoomFactor = window.innerWidth / (3*(buttonWidth));
	    document.body.style.zoom = zoomFactor;
	}
    }

    return function OLLTrainer() {
//	if(!MyQueryString.getValue('write')) {
	MyQueryString.addFromCookie('trainerQueryCubeless');
	rotateTable = MyQueryString.getIntMapValue('rotate');
	//	}
	// doZoom = MyQueryString.getValue('zoom') === "true";
	// if(doZoom) {
	//     document.body.style.zoom = 1.5;
	// } else {
	//     document.body.style.zoom = 1;
	// }

	doZoom = window.mobileMode;
	updateZoom();
	window.addEventListener('resize', updateZoom);


        only = MyQueryString.getIntValue('only');
        var length;
        if(only === null) {
            sequence = new OLLCleverSequence({
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
            sequence = { sequence: [only], onSuccess: function () {} };
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
	rerollButton.value = "Reroll";
	rerollButton.onclick=function() {
	    window.location.reload();;
	};


	document.body.appendChild(rerollButton);

	essai = document.createElement("a");
	essai.innerHTML = "&nbsp;";
	document.body.appendChild(essai);

	var skipButton = document.createElement("input");
	skipButton.type = "button";
	skipButton.value = "Skip";
	skipButton.onclick=function() {
	    onSkip();
	};
	document.body.appendChild(skipButton);
        document.body.appendChild(document.createElement('br'));
        var languageSelect = document.createElement("select");
	var options = {};
        var option;
        option = document.createElement("option");
        option.text = "Standard convention (R,L,U...)";
        option.value = "classic";
	options.classic = option;
        languageSelect.appendChild(option);
        option = document.createElement("option");
        option.text = "SHATARO convention";
        option.value = "shataro";
	options.shataro = option;
        languageSelect.appendChild(option);
        document.body.appendChild(languageSelect);
        convention = 'classic';
	MyQueryString.addFromCookie("CubelessTrainerPageSettings");
	var selected = MyQueryString.getValue('language');
	if(selected && options[selected]) {
	    options[selected].selected = true;
	    convention = selected;
	    MyQueryString.saveToCookie("CubelessTrainerPageSettings", ["language"]);
	}
	
        languageSelect.onchange = function () {
            convention = languageSelect.value;
            if(buttons) {
                document.body.removeChild(buttons);
                buttons = buildButtonsMatrix();
                document.body.appendChild(buttons);
            }
	    MyQueryString.setValue("language", languageSelect.value);
	    MyQueryString.saveToCookie("CubelessTrainerPageSettings", 60, ["language"]);
        };
	// var br = document.createElement("br");
	// document.body.appendChild(br);
	
	document.body.appendChild(document.createElement('br'));
	document.body.appendChild(document.createElement('br'));
	statusText = document.createTextNode("");
	document.body.appendChild(statusText);

	canvasContainer = document.createElement('div');
	document.body.appendChild(canvasContainer);

	var undoRedoDiv = document.createElement('div');
	undoRedoDiv.style.position= 'absolute';
	undoRedoDiv.style.top = absoluteTop + 'px';
	undoRedoDiv.style.left='140px';
	document.body.appendChild(undoRedoDiv);

	var resetButton = document.createElement('input');
	resetButton.type = "button";
	resetButton.value = "Reset";
	resetButton.addEventListener("click", function() {
	    onRestart();
	});
	resetButton.style.width = buttonWidth;
	resetButton.style.height = buttonHeight;
	undoRedoDiv.appendChild(resetButton);
	undoRedoDiv.appendChild(document.createElement('br'));
	
//	essai.innerHTML = "&nbsp;";
	var redoButton = createRepeatableButton('Redo', onRedo);
	undoRedoDiv.appendChild(redoButton);
	essai = document.createElement("br");
	undoRedoDiv.appendChild(essai);

	var undoButton = createRepeatableButton('Undo', onUndo);

	undoRedoDiv.appendChild(undoButton);

	sequenceDisplayDiv = document.createElement('div');
        document.body.appendChild(document.createElement('br'));
        document.body.appendChild(document.createElement('br'));
        document.body.appendChild(document.createElement('br'));
        document.body.appendChild(document.createElement('br'));
        document.body.appendChild(document.createElement('br'));
        document.body.appendChild(document.createElement('br'));
	document.body.appendChild(sequenceDisplayDiv);
	// essai = document.createElement("br");
	// document.body.appendChild(essai);
	//	document.body.appendChild(document.createElement("br"));


	// var br = document.createElement("br");
	// document.body.appendChild(br);
	startSequence(0);

        buttons = buildButtonsMatrix();
	document.body.appendChild(buttons);
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
		classic: 'b',
		shataro: 'BE'
	    },
	    {
		classic: 'f',
		shataro: 'FE'
	    },
	    {
		classic: 'd',
		shataro: 'DE'
	    },
	    {
		classic: 'u',
		shataro: 'TE'
	    },
	    {
		classic: 'l',
		shataro: 'LE'
	    },
	    {
		classic: 'r',
		shataro: 'RE'
	    },
	    {
		classic: 'D',
		shataro: 'D'
	    },
	    {
		classic: 'U',
		shataro: 'T'
	    },
	    {
		classic: 'R',
		shataro: 'R'
	    },
	    {
		classic: 'L',
		shataro: 'L'
	    },
	    {
		classic: 'F',
		shataro: 'F'
	    },
	    {
		classic: 'B',
		shataro: 'B'
	    },
	];
	var axes2 = [
	    {
		classic: 'x',
		shataro: 'M'
	    },
	    {
		classic: 'y',
		shataro: 'N'
	    },
	    {
		classic: 'z',
		shataro: 'P'
	    }
	];
	// var axes = [
	//     {
	// 	classic: 'U',
	// 	shataro: 'T'
	//     },
	//     {
	// 	classic: 'D',
	// 	shataro: 'D'
	//     },
	//     {
	// 	classic: 'L',
	// 	shataro: 'L'
	//     },
	//     {
	// 	classic: 'R',
	// 	shataro: 'R'
	//     },
	//     {
	// 	classic: 'F',
	// 	shataro: 'F'
	//     },
	//     {
	// 	classic: 'B',
	// 	shataro: 'B'
	//     },
	//     {
	// 	classic: 'x',
	// 	shataro: 'M'
	//     },
	//     {
	// 	classic: 'y',
	// 	shataro: 'N'
	//     },
	//     {
	// 	classic: 'z',
	// 	shataro: 'P'
	//     },
	//     {
	// 	classic: 'u',
	// 	shataro: 'TE'
	//     },
	//     {
	// 	classic: 'd',
	// 	shataro: 'DE'
	//     },
	//     {
	// 	classic: 'l',
	// 	shataro: 'LE'
	//     },
	//     {
	// 	classic: 'r',
	// 	shataro: 'RppE'
	//     },
	//     {
	// 	classic: 'f',
	// 	shataro: 'FE'
	//     },
	//     {
	// 	classic: 'b',
	// 	shataro: 'BE'
	//     }
	// ];
	var modifiers = [
	    {
		classic: '',
		shataro: 'A'
	    },
	    {
		classic: "'",
		shataro: 'O'
	    },
	    {
		classic: '2',
		shataro: 'I'
	    },
	];
	var specials = [
	    {
		classic: "RUR'",
		shataro: "SHA"
	    },
	    {
		classic: "R'UR",
		shataro: "SHO"
	    },
	    {
		classic: "RU'R'",
		shataro: "SHU"
	    },
	    {
		classic: "UR'U'",
		shataro: "SHI"
	    },
	];
	function createButton(text, action) {
	    var button = document.createElement('input');
	    button.type = 'button';
	    button.value = text;
	    button.style.width = buttonWidth;
	    button.style.height = buttonHeight;
	    button.addEventListener('click', function (event) {
		onAction(action, text, event, button);
	    });
	    return button;
	}
	var div = document.createElement('div');
	div.style.position = 'absolute';
	div.style.top = (absoluteTop + 135) +'px';
	div.style.left = '0px';
	var i, j, button;
	for(i = 0; i < axes.length; i++) {
	    for(j = 0; j < modifiers.length; j++) {
		button = createButton(axes[i][convention] + modifiers[j][convention], axes[i].classic + modifiers[j].classic);
		div.appendChild(button);
	    }
	    div.appendChild(document.createElement('br'));
	}
        if(convention === 'shataro') {
	    for(i = 0; i < specials.length; i++) {
	        button = createButton(specials[i][convention], specials[i].classic);
	        div.appendChild(button);
	        if(i % 3 == 2) {
		    div.appendChild(document.createElement('br'));
	        }
	    }
	    div.appendChild(document.createElement('br'));
        }
	for(i = 0; i < axes2.length; i++) {
	    for(j = 0; j < modifiers.length; j++) {
		button = createButton(axes2[i][convention] + modifiers[j][convention], axes2[i].classic + modifiers[j].classic);
		div.appendChild(button);
	    }
	    div.appendChild(document.createElement('br'));
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
