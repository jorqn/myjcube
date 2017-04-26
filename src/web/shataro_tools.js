(function() {
    "use strict";
    var translateTable = [
	{ std: "RUR'", shataro: "SHA", combo: true },
	{ std: "RU'R'", shataro: "SHU", combo: true },
	{ std: "R'UR", shataro: "SHO", combo: true },
	{ std: "UR'U'", shataro: "SHI", combo: true },
	{ std: "R'", shataro: "RO" },
	{ std: "L'", shataro: "LO" },
	{ std: "U'", shataro: "TO" },
	{ std: "D'", shataro: "DO" },
	{ std: "B'", shataro: "BO" },
	{ std: "F'", shataro: "FO" },
	{ std: "r'", shataro: "REO" },
	{ std: "l'", shataro: "LEO" },
	{ std: "u'", shataro: "TEO" },
	{ std: "d'", shataro: "DEO" },
	{ std: "b'", shataro: "BEO" },
	{ std: "f'", shataro: "FEO" },
	{ std: "x'", shataro: "MO" },
	{ std: "y'", shataro: "NO" },
	{ std: "z'", shataro: "PO" },
	{ std: "R2", shataro: "RI" },
	{ std: "L2", shataro: "LI" },
	{ std: "U2", shataro: "TI" },
	{ std: "D2", shataro: "DI" },
	{ std: "B2", shataro: "BI" },
	{ std: "F2", shataro: "FI" },
	{ std: "r2", shataro: "REI" },
	{ std: "l2", shataro: "LEI" },
	{ std: "u2", shataro: "TEI" },
	{ std: "d2", shataro: "DEI" },
	{ std: "b2", shataro: "BEI" },
	{ std: "f2", shataro: "FEI" },
	{ std: "x2", shataro: "MI" },
	{ std: "y2", shataro: "NI" },
	{ std: "z2", shataro: "PI" },
	{ std: "R", shataro: "RA" },
	{ std: "L", shataro: "LA" },
	{ std: "U", shataro: "TA" },
	{ std: "D", shataro: "DA" },
	{ std: "B", shataro: "BA" },
	{ std: "F", shataro: "FA" },
	{ std: "r", shataro: "REA" },
	{ std: "l", shataro: "LEA" },
	{ std: "u", shataro: "TEA" },
	{ std: "d", shataro: "DEA" },
	{ std: "b", shataro: "BEA" },
	{ std: "f", shataro: "FEA" },
	{ std: "x", shataro: "MA" },
	{ std: "y", shataro: "NA" },
	{ std: "z", shataro: "PA" },
    ];

    function xToY(x, y, input, withCombo) {
	var str = input || "";
	str = str.replace(/\s/g, '');
	var result = "", i, found, entry;
	while(str.length) {
	    found = false;
	    for(i = 0; i < translateTable.length && !found; i++) {
		entry = translateTable[i];
		if((withCombo || !entry.combo) && str.indexOf(entry[x]) === 0) {
		    result += entry[y];
		    found = true;
		    str = str.substr(entry[x].length);
		}
	    }
	    if(!found) {
		return { complete: false, result: result };
	    }
	}
	return { complete: true, result: result };
    }

    function stdToShataro(std, withCombo) {
	return xToY('std', 'shataro', std, withCombo);
    }
    function shataroToStd(shataro) {
	return xToY('shataro', 'std', shataro.toUpperCase(), true);
    }

    console.log(stdToShataro("RUR'U'R2", true));
    console.log(shataroToStd("SHAMAPOSHOBOROTÈLEA"));

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
	    res1 = stdToShataro(lines[i], shashushoOn);
	    res2 = shataroToStd(lines[i]);
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
