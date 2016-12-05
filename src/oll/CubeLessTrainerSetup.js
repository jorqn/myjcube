define('oll/CubelessTrainerSetup', ['oll/OLLTrainerSetupDiv', 'oll/OLLConfigDisplay'],
function(OLLTrainerSetupDiv, OLLConfigDisplay) {
    "use strict";
    return function CubeLessTrainerSetup() {
	var configDisplay = new OLLConfigDisplay();
	var layout = [[1001, 1002, null, 1003, 1004],
		      [1005, 1017, null, 1016],
		      [],
		      [1008, 1009, null, 1010, 1011],
		      [1012, 1013],
		      [1018, 1019, null, 1006, 1007],
		      [1020, 1021, null, 1014, 1015],
		      [],
		      [49, 50, null, 1, 2],
		      [51, 52, null, 3, 4],
		      [55, 56, null, 5, 6],
		      [57, null, null, 7, 30],
		      [],
		      [47,48, null,45, 46],
		      [],
		      [20,21, null, 22, 23],
		      [null, null, null, 24,25],
		      [8, 9, null, 43,44],
		      [10,11],
		      [],
		      [35,36, null, 12, 13],
		      [37,38, null, 14, 15],
		      [null, null, null, 16,17],
		      [18,19],
		      [31,32, null, 33, 34],
		      [],
		      [26,27, null, 39, 40],
		      [28,29, null, 41, 42],
		      [],
		      [53,54],
		     ];
	var trainerSetup = new OLLTrainerSetupDiv(configDisplay, "CubeLessTrainer.html", layout, "Cubeless", "CubelessTrainerSetup.html");
	document.body.appendChild(trainerSetup.div);
    };
});
