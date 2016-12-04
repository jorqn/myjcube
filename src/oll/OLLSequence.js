define('oll/OLLSequence', ['oll/OLLConfigs'], function(OLLConfigs) {
    "use strict";
    var OLLSequence = function(params) {
	params = params || {};
	this.excludeCases = params.excludeCases || [];
	this.easyCases = params.easyCases || [];
	this.newCases = params.newCases || [];
	this.hardCases = params.hardCases || [];
	this.hardCases = this.hardCases.concat(this.newCases);
	this.middleCases = [];
	var i = 0;
	for(i = 0; i < OLLConfigs.nbOLLConfigs; i++) {
	    if(this.easyCases.indexOf(i+1) < 0 && this.hardCases.indexOf(i+1) < 0 && this.excludeCases.indexOf(i+1) < 0) {
		this.middleCases.push(i+1);
	    }
	}
	if(params.pll) {
	    for(i = 1000; i < 1000+OLLConfigs.nbPLLConfigs; i++) {
		if(this.easyCases.indexOf(i+1) < 0 && this.hardCases.indexOf(i+1) < 0 && this.excludeCases.indexOf(i+1) < 0) {
		    this.middleCases.push(i+1);
		}
	    }
	}
    };

    OLLSequence.prototype.buildMelange = function () {
	this.melange = [];
	this.melange = this.melange.concat(this.easyCases);
	this.melange = this.melange.concat(this.middleCases);
	this.melange = this.melange.concat(this.middleCases);
	this.melange = this.melange.concat(this.hardCases);
	this.melange = this.melange.concat(this.hardCases);
	this.melange = this.melange.concat(this.hardCases);
	this.melange = this.melange.concat(this.hardCases);
	this.melange = this.melange.concat(this.newCases);
	this.melange = this.melange.concat(this.newCases);
	this.melange = this.melange.concat(this.newCases);
	this.melange = this.melange.concat(this.newCases);
	this.melange = this.melange.concat(this.newCases);
	this.melange = this.melange.concat(this.newCases);
	this.melange = this.melange.concat(this.newCases);
	this.melange = this.melange.concat(this.newCases);
    };

    OLLSequence.prototype.getIndex = function() {
	return Math.floor((Math.random() * this.melange.length));
    }

    OLLSequence.prototype.removeConfig = function(index) {
	this.melange = this.melange.filter(function(elt) {
	    return elt !== index;
	});
    }

    OLLSequence.prototype.add = function() {
	var index;
	index = this.getIndex();
	this.sequence.push(this.melange[index]);
	this.removeConfig(this.melange[index]);
    }

    OLLSequence.prototype.buildSequence = function(length) {
	this.buildMelange();
	this.sequence = [];

	var i;
	for(i = 0; i < length && this.melange.length > 0; i++) {
	    this.add();
	}

    };

    // var table = ["F'U'L'ULF2RUR'U'F'",
    // 		 "RUR'URU2UR'URU2R'",
    // 		 "l'U2LUL'Uly'FURU'R'F'",
    // 		 "FRUR'U'F'yF'U'L'ULF",
    // 		 "FRUR'U'F'rUR'URU2r'",
    // 		 "RUR'U'R'FRURU'R'F'",
    // 		 "FRUR'U'F'y2FURU'R'F'",
    // 		 "FURU'R'F'yFRUR'U'F'",
    // 		 "F'U'L'ULFyFRUR'U'F'",
    // 		 "R'FRUR'U'F'URyFURU'R'F'",
    // 		 "l'U2LUL'UlyFURU'R'F'",
    // 		 "F'U'L'ULFR'U'l'UlF'UR",
    // 		 "rUR'URU2r'FRUR'U'F'",
    // 		 "l'U2LUL'UlFRUR'U'F'",
    // 		 "RUR'URU2R'FRUR'U'F'",
    // 		 "FRUR'U'F'yFRUR'U'F'",
    // 		 "F'U'L'ULFyRUR'URU2R'",
    // 		 "FRUR'U'F'yFURU'R'F'",
    // 		 "FURU'R'F'yFURU'R'F'",
    // 		 "l'U'LURU'r'FFRUR'U'F'",
    // 		 "RUR'U'R'FRF'yFRUR'U'F'",
    // 		 "F'U'L'ULU'L'ULF",
    // 		 "FURU'R'F'rUR'URU2r'",
    // 		 "FURU'R'URU'R'F'",
    // 		 "RUR'URU2R'rUR'URU2r'",
    // 		 "FRUR'U'F'RUR'URU2R'",
    // 		 "rUR'URU2r'yFRUR'U'F'",
    // 		 "l'U'LU'L'U2lRUR'URU2R'",
    // 		 "FRUR'U'RUR'U'F'",
    // 		 "rUR'URU2r'RUR'URU2R'",
    // 		 "RUR'URU2R'y'FRUR'U'F'",
    // 		 "RUR'U'R'FRRUR'U'F'",
    // 		 "l'U2LUL'UlyFRUR'U'F'",
    // 		 "l'U2LUL'UlRU2R'U'RU'R'",
    // 		 "l'U'LU'L'U2lF'U'L'ULF",
    // 		 "rUR'URU2r'FURU'R'F'",
    // 		 "FURU'R'F'yRUR'URU2R'",
    // 		 "FURU'R'F2U'L'ULF",
    // 		 "",
    // 		 "FRUR'U'F'l'U2LUL'Ul",
    // 		 "FURU'R'F'yRUR'U'R'FRF'",
    // 		 "rUR'URU2r'yl'U2LUL'Ul",
    // 		 "RUR'URU2R'l'U'LU'L'U2l",
    // 		 "F'U'L'ULFyF'U'L'ULF",
    // 		 "F'U'L'ULFyFURU'R'F'",
    // 		 "rUR'URU2r'yF'U'L'ULF",
    // 		 "RUR'URU2R'yFRUR'U'F'",
    // 		 "RU2R'U'RU'R'l'U2LUL'Ul",
    // 		 "RUR'URU2R'yrU2R'U'RU'r'",
    // 		 "FRUR'U'F2U'L'ULF",
    // 		 "FRUR'U'F'y2FRUR'U'F'",
    // 		 "l'U2LUL'UlyRUR'URU2R'",
    // 		 "RUR'URU2R'FURU'R'F'",
    // 		 "l'U2LUL'Uly'RUR'URU2R'",
    // 		 "F'U'L'ULFRUR'URU2R'",
    // 		 "l'U'L'URU'LUx'F'U'L'ULF",
    // 		 "l'U'LURU'r'U'L'ULF",
    // 		 "RUR'URU2R'F'U'L'ULF"
    // 		];

    return OLLSequence;
});


// function startOLLTrainer() {
//     var radioButton1 = document.createElement('input');
//     radioButton1.text = 'Blue';
//     radioButton1.value = 'blue';
//     radioButton1.name = 'color';
//     radioButton1.type = 'radio';
//     document.body.appendChild(radioButton1);
//     document.body.appendChild(document.createTextNode(radioButton1.text));
    
//     var radioButton2 = document.createElement('input');
//     radioButton2.innerHTML = 'Red';
//     radioButton2.value = 'red';
//     radioButton2.name = 'color';
//     radioButton2.type = 'radio';
//     document.body.appendChild(radioButton2);
    

// }
