define('oll/OLLTrainerSetup', ['oll/OLLTrainerSetupDiv', 'oll/OLLConfigDisplay'],
function(OLLTrainerSetupDiv, OLLConfigDisplay) {
    "use strict";
    return function OLLTrainerSetup() {
	var configDisplay = new OLLConfigDisplay();
	var trainerSetup = new OLLTrainerSetupDiv(configDisplay);
	document.body.appendChild(trainerSetup.div);
    };
});
