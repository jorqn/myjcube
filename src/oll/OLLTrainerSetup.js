define('oll/OLLTrainerSetup', ['oll/OLLTrainerSetupDiv', 'oll/OLLConfigDisplay', 'utils/MyQueryString'],
function(OLLTrainerSetupDiv, OLLConfigDisplay, MyQueryString) {
    "use strict";
    return function OLLTrainerSetup() {
	MyQueryString.addFromCookie("OLLHistory");
	var configDisplay = new OLLConfigDisplay();
	var layout;
	if(!window.mobileMode) {
	    layout = [[49, 50, null, 1, 2],
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
		      // [],
		      // [1001, 1002],
		      // [1005, 1017]
		     ];
	} else {
	    layout = [
		[49, 50],
		[51, 52],
		[55, 56],
		[57],
		[],
		[1, 2],
		[3, 4],
		[5, 6],
		[7, 30],
		[],
		[47,48],
		[],
		[45, 46],
		[],
		[20,21],
		[],
		[22, 23],
		[24,25],
		[43,44],
		[],
		[8, 9],
		[10,11],
		[],
		[35,36],
		[37,38],
		[],
		[12, 13],
		[14, 15],
		[16,17],
		[],
		[18,19],
		[31,32],
		[],
		[33, 34],
		[],
		[26,27],
		[28,29],
		[],
		[39, 40],
		[41, 42],
		[],
		[53,54],
	    ];
	}
	var trainerSetup = new OLLTrainerSetupDiv(configDisplay, "OLLTrainer.html", layout, "", "OLLTrainerSetup.html");
	document.body.appendChild(trainerSetup.div);
    };
});
