define('oll/OLLTrainer', ['oll/OLLSequence', 'oll/OLLSequenceHTMLDisplay', 'utils/MyQueryString', 'oll/OLLConfigDisplay'],
function(OLLSequence, OLLSequenceHTMLDisplay, MyQueryString, OLLConfigDisplay) {
    "use strict";
    return function OLLTrainer() {
	if(!MyQueryString.getValue('write')) {
	    MyQueryString.addFromCookie('trainerQuery');
	}
	var sequence = new OLLSequence({
	    excludeCases: MyQueryString.getIntArrayValue('exclude'),
	    easyCases: MyQueryString.getIntArrayValue('easy'),
	    hardCases: MyQueryString.getIntArrayValue('hard'),
	    newCases: MyQueryString.getIntArrayValue('new')

	});
	var length = MyQueryString.getIntValue('length') || 25;
	sequence.buildSequence(length);
	MyQueryString.setValue("write", true);
	MyQueryString.saveToCookie("trainerQuery", 60);

	var configDisplay = new OLLConfigDisplay();
	var setupTrainingButton = document.createElement("input");
	setupTrainingButton.type = "button";
	setupTrainingButton.value = "Setup";
	setupTrainingButton.onclick=function() {
	    window.location.href = "OLLTrainerSetup.html?" + MyQueryString.toQueryString();
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

	var htmlDisplay = new OLLSequenceHTMLDisplay(sequence, configDisplay);
	// var i;
	// for(i = 1; i <= 57; i++) {
	//     var canvas = configDisplay.createCanvas(i);
	//     document.body.appendChild(canvas);
	//     if(i % 7 === 0) {
	// 	document.body.appendChild(document.createElement("br"));
	//     }
	// }
	document.body.appendChild(htmlDisplay.div);
    }
});
