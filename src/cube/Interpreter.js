define("cube/Interpreter", [], function() {
    "use strict";
    var Interpreter = {
	parse: function(command, invert) {
	    function invertSingle(str) {
		if(str === "0") {
		    return str;
		}
		if(str.length === 1) {
		    return str + "'";
		} else {
		    return str.charAt(0);
		}
	    }
	    var tab = [];
	    var k = 0, c;
	    while(k < command.length) {
		c = command.charAt(k);
		if(c === '2') {
		    tab.push(tab[tab.length-1]);
		} else if(c === "'" || c === "p") {
		    tab[tab.length-1] += "'";
		} else {
		    tab.push(c);
		}
		k++;
	    }
	    if(invert) {
		var oldtab = tab;
		tab = [];
		for(k = oldtab.length - 1; k >= 0; k--) {
		    tab.push(invertSingle(oldtab[k]));
		}
	    }
	    return tab;
	}
    };
    return Interpreter;
});
