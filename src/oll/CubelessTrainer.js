define('oll/CubelessTrainer', ['oll/OLLSequence', 'utils/MyQueryString', 'oll/OLLConfigDisplay'],
function(OLLSequence, MyQueryString, OLLConfigDisplay) {
    "use strict";
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
