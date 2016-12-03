require(['formulas'], function (formulas) {
    "use strict";
    console.log('coucou ' + formulas.length);
    function buildSuites(n, limit) {
	var suites = [];
	var i;
	for(i = 0; i < formulas.length; i++) {
	    formulas[i].getAllSuites(n, suites);
	}
	suites.sort(function (a, b) { return b.count - a.count; });
	var result = [];
	for(i = 0; i < suites.length && suites[i].count >= limit; i++) {
	    result.push(suites[i]);
	}
	return result;
    }
    var suite5 = buildSuites(5, 20);
    var suite4 = buildSuites(4, 20);
    var suite3 = buildSuites(3, 20);
    var simplifTable = [ {text: "RATARO", phonem: "SHA"},
			 {text: "TAROTO", phonem: "SHI"},
			 {text: "ROTARA", phonem: "SHO"},
			 {text: "RATORO", phonem: "SHU"}];
    
    String.prototype.replaceAll = function(str1, str2, ignore) 
    {
	return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
    } 
			 
    var i, j;
    for(i = 0; i < formulas.length; i++) {
	formulas[i].simplif = formulas[i].translatedPure;
	for(j = 0; j < simplifTable.length; j++) {
	    formulas[i].simplif = formulas[i].simplif.replaceAll(simplifTable[j].text, simplifTable[j].phonem);
	}
	console.log(formulas[i].type + "#" + formulas[i].index + ": " + formulas[i].simplif);
    }
});
