define('oll/CubelessTrainer', ['oll/OLLSequence', 'utils/MyQueryString', 'oll/OLLConfigDisplay'],
function(OLLSequence, MyQueryString, OLLConfigDisplay) {
    "use strict";

    function buildButtonsMatrix() {
	var axes = [
	    {
		classic: 'U',
		lang: 'T'
	    },
	    {
		classic: 'B',
		lang: 'B'
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
		classic: 'b',
		lang: 'BE'
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
	function createButton(text) {
	    var button = document.createElement('input');
	    button.type = 'button';
	    button.value = text;
	    button.style.width = 70;
	    button.style.height = 30;
	    return button;
	}
	var div = document.createElement('div');
	var i, j, button;
	for(i = 0; i < axes.length; i++) {
	    for(j = 0; j < modifiers.length; j++) {
		button = createButton(axes[i].lang + modifiers[j].lang);
		div.appendChild(button);
	    }
	    div.appendChild(document.createElement('br'));
	}
	for(i = 0; i < specials.length; i++) {
	    button = createButton(specials[i].lang);
	    div.appendChild(button);
	    if(i % 3 == 2) {
		div.appendChild(document.createElement('br'));
	    }
	}
	return div;
    }

    return function OLLTrainer() {
	if(!MyQueryString.getValue('write')) {
	    MyQueryString.addFromCookie('trainerQuery');
	}
	var sequence = new OLLSequence({
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
	rerollButton.value = "Reroll";
	rerollButton.onclick=function() {
	    window.location.reload();;
	};


	document.body.appendChild(rerollButton);
	var br = document.createElement("br");
	document.body.appendChild(br);

//	var htmlDisplay = new OLLSequenceHTMLDisplay(sequence, configDisplay);
	var ollConfigDisplay = new OLLConfigDisplay();
	var canvas = ollConfigDisplay.createCanvas(sequence.sequence[0]);
	document.body.appendChild(canvas);

	document.body.appendChild(buildButtonsMatrix());

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
});