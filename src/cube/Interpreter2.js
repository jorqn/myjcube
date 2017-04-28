define("cube/Interpreter2", [], function() {
    "use strict";
    var Interpreter2 = {
	parse: function(command, invert) {
	    function invertSingle(command) {
		var str = command.command;
		var res;
		if(str === "0") {
		    res = str;
		} else if(str.length === 1) {
		    res = str + "'";
		} else {
		    res = str.charAt(0);
		}
		return { command: res, index: command.index};
	    }
	    var tab = [];
	    var k = 0, c, dbl = false, index = 0;
	    while(k < command.length) {
		c = command.charAt(k);
		if(c === '2') {
		    tab.push(tab[tab.length-1]);
		    dbl = true;
		} else if(c === "'" || c === "p") {
		    if(!dbl) {
			tab[tab.length-1].command += "'";
		    }
		    dbl = false;
		} else {
		    tab.push({ command: c, index: index});
		    dbl = false;
		    index++;
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
    return Interpreter2;
});
