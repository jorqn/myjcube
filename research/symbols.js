define("symbols", [], function() {
    "use strict";
    var symbols = [];
    function symbol(value, root, code, phonem, twin) {
	this.value = value;
	this.root = root;
	this.code = code;
	this.phonem = phonem;
	this.twin = twin;
    }
    symbol.prototype.parse = function(text) {
	if(text.startsWith(this.value)) {
	    return text.substring(this.value.length);
	} else {
	    return null;
	}
    }
    
    function addSymbol(str, letter, compl) {
	symbols.push(new symbol(str, str, str+'+', letter + "A"));
	symbols.push(new symbol(str+"'", str, str+'-', letter + "O"));
	symbols.push(new symbol(str+"2", str, str+'2', letter + "I"));
	var twin = symbols[symbols.length-1];
	symbols.push(new symbol(str+"2'", str, str+'2', letter + "E", twin));
    }
    addSymbol('R', 'R', 'I');
    addSymbol('L', 'L', 'I');
    addSymbol('U', 'T', 'R');
    addSymbol('D', 'D', 'R');
    addSymbol('B', 'B', 'L');
    addSymbol('F', 'F', 'L');
    addSymbol('x', 'M', 'I');
    addSymbol('y', 'N', 'R');
    addSymbol('z', 'P', 'I');
    addSymbol('l', 'LE', 'I');
    addSymbol('r', 'RE', 'I');
    addSymbol('u', 'TE', 'R');
    addSymbol('b', 'BE', 'I');
    addSymbol('f', 'FE', 'I');
    addSymbol('d', 'DE', 'I');
    symbols.sort(function (a,b) {
	return b.value.length - a.value.length;
    });
    return symbols;
});
