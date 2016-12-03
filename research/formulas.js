define("formulas", ["symbols"], function (symbols) {
    "use strict";
    var everything = [];

    var sentence = function (type, index, text) {
	this.type = type;
	this.index = index;
	this.text = text;
	this.parseSymbols();
	this.translate();
    };
    sentence.prototype.parseSymbols = function () {
	this.symbols = [];
	var text = this.text;
	var i = 0, tmp, found = true;
	while(text !== "" && found) {
	    found = false;
	    for(i = 0; i < symbols.length && !found; i++) {
		tmp = symbols[i].parse(text);
		if(tmp !== null) {
		    found = true;
		    this.symbols.push(symbols[i].twin || symbols[i]);
		    text = tmp;
		}
	    }
	}
	if(text.length > 0) {
	    throw new Error('Unparsable string: "' + text + '"');
	}
    }

    sentence.prototype.translate = function() {
	var i = 0;
	this.translated = "";
	this.translatedPure = "";
	for(i = 0; i < this.symbols.length; i++) {
	    this.translated += this.symbols[i].phonem;
	    this.translatedPure += this.symbols[i].phonem;
	    if((i+1) % 3 === 0) {
		this.translated += " ";
	    }
	}
//	console.log(this.index + ": " + this.translated);
    }

    sentence.prototype.getAllSuites = function(n, suites) {
	var i = 0, j;
	function contains(tab) {
	    var i,j, equals, suiteTab;
	    for(i = 0; i < suites.length; i++) {
		equals = true;
		suiteTab = suites[i].symbols;
		for(j = 0; j < tab.length && equals; j++) {
		    if(suiteTab[j] !== tab[j]) {
			equals = false;
		    }
		}
		if(equals) {
		    suites[i].count++;
		    return true;
		}
	    }
	    return false;
	}
	var local;
	for(i = 0; i <= this.symbols.length-n; i++) {
	    local = [];
	    var text = "";
	    for(j = 0; j < n; j++) {
		local.push(this.symbols[i+j]);
		text += this.symbols[i+j].phonem;
	    }
	    if(!contains(local)) {
		suites.push({symbols: local, count: 1, text: text});
	    }
	}
    }

    function addSentence(type, index, text) {
//	everything.push({type: type, index: index, text: text});
	everything.push(new sentence(type, index, text));
    }

    addSentence("PLL", 49, "RU2'R2'U'R2U'R2'U2R");
    addSentence("PLL", 50, "RUR'URU'R'URU2'R'");
    addSentence("PLL", 51, "RUR'URU2'R'");
    addSentence("PLL", 52, "RU2R'U'RU'R'");
    addSentence("PLL", 55, "R2'DR'U2RD'R'U2R'");
    addSentence("PLL", 56, "l'U'LURU'r'F");
    addSentence("PLL", 57, "l'U'L'URU'LUx'");
    addSentence("PLL", 1, "RUx'U'RUl'R'U'l'UlF'");
    addSentence("PLL", 2, "FRUR'U'F'fRUR'U'f'");
    addSentence("PLL", 3, "r'R2UR'UrU2r'UR'r");
    addSentence("PLL", 4, "r'RU'rU2r'U'RU'R2'r");
    addSentence("PLL", 5, "r'RURUR'U'rR2'FRF'");
    addSentence("PLL", 6, "FRUR'Uy'R'U2R'FRF'");
    addSentence("PLL", 7, "RUR'UR'FRF'U2R'FRF'");
    addSentence("PLL", 30, "r'RURUR'U'r2R2'URU'r'");
    addSentence("PLL", 47, "FRUR'U'F'");
    addSentence("PLL", 48, "RUR'U'R'FRF'");
    addSentence("PLL", 45, "R'U'l'UlF'UR");
    addSentence("PLL", 46, "RUR'U'xD'R'URU'");
    addSentence("PLL", 20, "rU2R'U'RU'r'");
    addSentence("PLL", 21, "l'U2LUL'Ul");
    addSentence("PLL", 22, "rUR'URU2r'");
    addSentence("PLL", 23, "l'U'LU'L'U2'l");
    addSentence("PLL", 24, "rR2'U'RU'R'U2RU'Rr'");
    addSentence("PLL", 25, "rR2UR'URU2R'UR'r");
    addSentence("PLL", 43, "R'FRUR'U'F'UR");
    addSentence("PLL", 44, "LFL'U'LUFU'L'");
    addSentence("PLL", 8, "R'U2R2UR'URU2x'U'R'Ux");
    addSentence("PLL", 9, "R'U'RU'R'dR'URB");
    addSentence("PLL", 10, "fRUR'U'RUR'U'f'");
    addSentence("PLL", 11, "r'U'rU'R'URU'R'URr'Ur");
    addSentence("PLL", 35, "RUB'U'R'UlUl'");
    addSentence("PLL", 36, "R'U'FURU'R'F'R");
    addSentence("PLL", 37, "FURU'R'F'");
    addSentence("PLL", 38, "F'U'L'ULF");
    addSentence("PLL", 12, "FRUR'U'RUR'U'F'");
    addSentence("PLL", 13, "F'L'U'LUL'U'LUF");
    addSentence("PLL", 14, "l'UR'U'RlU2x'U'RUl'");
    addSentence("PLL", 15, "R'FR2B'R2'F'R2BR'");
    addSentence("PLL", 16, "r'U'RU'R'URU'R'U2r");
    addSentence("PLL", 17, "rUR'URU'R'URU2'r'");
    addSentence("PLL", 33, "RUR'URU'R'U'R'FRF'");
    addSentence("PLL", 34, "R'U'RU'R'URUlU'R'Ux");
    addSentence("PLL", 18, "R'U'Ry'x'RU'R'FRUl'");
    addSentence("PLL", 19, "RUR'xz'R'URB'R'U'l");
    addSentence("PLL", 31, "R'U2lRU'R'Ul'U2'R");
    addSentence("PLL", 32, "FRU'R'U'RUR'F'");
    addSentence("PLL", 26, "R'FRUl'U'ly'RU'R'");
    addSentence("PLL", 27, "x'RU'R'F'RUR'xyR'UR");
    addSentence("PLL", 28, "LFL'RUR'U'LF'L'");
    addSentence("PLL", 29, "L'B'LR'U'RUL'BL");
    addSentence("PLL", 39, "B'RB'R2'URUR'U'RB2");
    addSentence("PLL", 40, "R2'UR'B'RU'R2'UlUl'");
    addSentence("PLL", 41, "RUR'URU2'R'FRUR'U'F'");
    addSentence("PLL", 42, "R'U'RU'R'U2RFRUR'U'F'");
    addSentence("PLL", 53, "RUR'U'rR'URU'r'");
    addSentence("PLL", 54, "rR'URr'U2rR'URr'");

    addSentence("OLL", 1, "R2'URUR'U'R'U'R'UR'");
    addSentence("OLL", 2, "R2U'R'U'RURURU'R");
    addSentence("OLL", 5, "R'U'RU'RURU'R'URUR2U'R'U2");
    addSentence("OLL", 17, "r2R2'Ur2R2'U2r2R2'Ur2R2'");
    addSentence("OLL", 3, "xR'UR'D2RU'R'D2l2x");
    addSentence("OLL", 4, "xR2D2RUR'D2RU'l");
    addSentence("OLL", 16, "l'U'L'URU'LUR'U'LURU'L'Ux'");
    addSentence("OLL", 8, "RU2'R'U2RB'R'U'RUlUR2'Fx");
    addSentence("OLL", 9, "R'U2RU2'R'FRUR'U'R'F'R2U'");
    addSentence("OLL", 10, "RUR'F'RUR'U'R'FR2U'R'U'");
    addSentence("OLL", 11, "F2'L'U'rU2'l'UR'U'R2x2");
    addSentence("OLL", 12, "RU'LU2'R'UL'RU'LU2'R'UL'");
    addSentence("OLL", 13, "L'UR'U2'LU'L'RUR'U2'LU'R");
    addSentence("OLL", 18, "R2'uR'UR'U'Ru'R2y'R'UR");
    addSentence("OLL", 19, "R2u'RU'RUR'uR2'yRU'R'");
    addSentence("OLL", 20, "RUR'y'R2u'RU'R'UR'uR2");
    addSentence("OLL", 21, "L'U'Ly'R2'uR'URU'Ru'R2");
    addSentence("OLL", 6, "R'URU'R2F'U'FUxRUR'U'R2B'x'");
    addSentence("OLL", 7, "RUR'U'R'FR2U'R'U'RUR'F'");
    addSentence("OLL", 14, "R'UR'U'x2y'R'UR'U'lRU'R'URUx'");
    addSentence("OLL", 15, "FRU'R'U'RUR'F'RUR'U'l'URU'x'");

    return everything;
});
