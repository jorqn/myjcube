(function() {
    function insertRow(R, Rp, RA, RO) {
	//	document.write("<tr><td><a href='javascript:playFormula(\"formulaTest\", \""+R+"'

	document.writeln('<tr>');
	document.writeln('<td><a class="discrete" href="javascript:playFormula(\'formulaTest\', \''+R+'\');">'+R+'</a> / <a class="discrete" href="javascript:playFormula(\'formulaTest\', \''+Rp+'\');">'+R+'\'</a></td>');
	document.writeln('<td><a class="discrete" href="javascript:playFormula(\'formulaTest\', \''+R+'\');">'+RA+'</a> / <a class="discrete" href="javascript:playFormula(\'formulaTest\', \''+Rp+'\');">'+RO+'</a></td>');
	      // <td><a class="discrete" href="javascript:playFormula('formulaTest', 'R');">RA</a> / <a class="discrete" href="javascript:playFormula('formulaTest', 'Rp');">RO</a></td>
	document.writeln('</tr>');
    }
    function insertTable(tableData, clear) {
	var i;
	document.writeln('<table style="clear: '+clear+'"><tr><th>Standard</th><th>SHATARO</th></tr>');
	for(i = 0; i < tableData.length; i++) {
	    insertRow(tableData[i][0], tableData[i][1], tableData[i][2], tableData[i][3]);
	}
	document.writeln('</table>');
    };

    var tableData1 = [
	[ "R", "R", [
	    {
		start: { x: 1, y: -1},
		end: {x: 1, y: 1},
		normal: { x: 0, y:0, z: 1}
	    },
	    {
		start: { x: 1, z: 1},
		end: {x: 1, z: -1},
		normal: { x: 0, y:1, z: 0}
	    }
	],//rrrrrrrrroooooooooyyyyyyyyywwwwwwwwwgggggggggbbbbbbbbb
	   "bbobbobbobbobbobbobbobbobbobbobbobboooooooooobbbbbbbbb"
	],
	[ "L", "L", [
	    {
		start: { x: -1, y: 1},
		end: {x: -1, y: -1},
		normal: { x: 0, y:0, z: 1}
	    },
	    {
		start: { x: -1, z: -1},
		end: {x: -1, z: 1},
		normal: { x: 0, y:1, z: 0}
	    }
	],//rrrrrrrrroooooooooyyyyyyyyywwwwwwwwwgggggggggbbbbbbbbb
	   "obbobbobbobbobbobbobbobbobbobbobbobbbbbbbbbbbooooooooo"
	],
	[ "U", "T", [
	    {
		start: { y: 1, z: -1},
		end: {y: 1, z: 1},
		normal: { x: 1, y:0, z: 0}
	    },
	    {
		start: { x: 1, y: 1},
		end: {x: -1, y: 1},
		normal: { x: 0, y:0, z: 1}
	    }
	],//rrrrrrrrroooooooooyyyyyyyyywwwwwwwwwgggggggggbbbbbbbbb
	   "bbbbbboooooobbbbbbooooooooobbbbbbbbbbbbbbbooobbbbbbooo"
	],
	[ "D", "D", [
	    {
		start: { y: -1, z: 1},
		end: {y: -1, z: -1},
		normal: { x: 1, y:0, z: 0}
	    },
	    {
		start: { x: -1, y: -1},
		end: {x: 1, y: -1},
		normal: { x: 0, y:0, z: 1}
	    }
	],//rrrrrrrrroooooooooyyyyyyyyywwwwwwwwwgggggggggbbbbbbbbb
	   "ooobbbbbbbbbbbbooobbbbbbbbboooooooooooobbbbbbooobbbbbb"],
	[ "F", "F", [
	    {
		start: { x: -1, z: 1},
		end: {x: 1, z: 1},
		normal: { x: 0, y:1, z: 0}
	    },
	    {
		start: { y: 1, z: 1},
		end: {y: -1, z: 1},
		normal: { x: 1, y:0, z: 0}
	    }
	],//rrrrrrrrroooooooooyyyyyyyyywwwwwwwwwgggggggggbbbbbbbbb
	   "ooooooooobbbbbbbbbooobbbbbbbbbbbboooobbobbobbbbobbobbo"],
	[ "B", "B", [
	    {
		start: { x: 1, z: -1},
		end: {x: -1, z: -1},
		normal: { x: 0, y:1, z: 0}
	    },
	    {
		start: { y: -1, z: -1},
		end: {y: 1, z: -1},
		normal: { x: 1, y:0, z: 0}
	    }
	],//rrrrrrrrroooooooooyyyyyyyyywwwwwwwwwgggggggggbbbbbbbbb
	   "bbbbbbbbbooooooooobbbbbboooooobbbbbbbbobbobboobbobbobb"]
    ];
    var tableData2 = [
	[ "r", "RE", [
	    {
		start: { x: .5, y: -1},
		end: {x: .5, y: 1},
		normal: { x: 0, y:0, z: 1}
	    },
	    {
		start: { x: .5, z: 1},
		end: {x: .5, z: -1},
		normal: { x: 0, y:1, z: 0}
	    }
	],//rrrrrrrrroooooooooyyyyyyyyywwwwwwwwwgggggggggbbbbbbbbb
	   "boobooboobooboobooboobooboobooboobooooooooooobbbbbbbbb"
	],
	[ "l", "LE", [
	    {
		start: { x: -.5, y: 1},
		end: {x: -.5, y: -1},
		normal: { x: 0, y:0, z: 1}
	    },
	    {
		start: { x: -.5, z: -1},
		end: {x: -.5, z: 1},
		normal: { x: 0, y:1, z: 0}
	    }
	],//rrrrrrrrroooooooooyyyyyyyyywwwwwwwwwgggggggggbbbbbbbbb
	   "ooboobooboobooboobooboobooboobooboobbbbbbbbbbooooooooo"
	],
	[ "u", "TE", [
	    {
		start: { y: .5, z: -1},
		end: {y: .5, z: 1},
		normal: { x: 1, y:0, z: 0}
	    },
	    {
		start: { x: 1, y: .5},
		end: {x: -1, y: .5},
		normal: { x: 0, y:0, z: 1}
	    }
	],//rrrrrrrrroooooooooyyyyyyyyywwwwwwwwwgggggggggbbbbbbbbb
	   "bbboooooooooooobbbooooooooobbbbbbbbbbbboooooobbboooooo"
	],
	[ "d", "DE", [
	    {
		start: { y: -.5, z: 1},
		end: {y: -.5, z: -1},
		normal: { x: 1, y:0, z: 0}
	    },
	    {
		start: { x: -1, y: -.5},
		end: {x: 1, y: -.5},
		normal: { x: 0, y:0, z: 1}
	    }
	],//rrrrrrrrroooooooooyyyyyyyyywwwwwwwwwgggggggggbbbbbbbbb
	   "oooooobbbbbboooooobbbbbbbbbooooooooooooooobbboooooobbb"],
	[ "f", "FE", [
	    {
		start: { x: -1, z: .5},
		end: {x: 1, z: .5},
		normal: { x: 0, y:1, z: 0}
	    },
	    {
		start: { y: 1, z: .5},
		end: {y: -1, z: .5},
		normal: { x: 1, y:0, z: 0}
	    }
	],//rrrrrrrrroooooooooyyyyyyyyywwwwwwwwwgggggggggbbbbbbbbb
	   "ooooooooobbbbbbbbboooooobbbbbboooooooobooboobboobooboo"],
	[ "b", "BE", [
	    {
		start: { x: 1, z: -.5},
		end: {x: -1, z: -.5},
		normal: { x: 0, y:1, z: 0}
	    },
	    {
		start: { y: -1, z: -.5},
		end: {y: 1, z: -.5},
		normal: { x: 1, y:0, z: 0}
	    }
	],//rrrrrrrrroooooooooyyyyyyyyywwwwwwwwwgggggggggbbbbbbbbb
	   "bbbbbbbbbooooooooobbboooooooooooobbbboobooboooobooboob"]
    ];
    // var tableData2 = [
    // 	[ "r", "rp", "REA", "REO"],
    // 	[ "l", "lp", "LEA", "LEO"],
    // 	[ "u", "up", "TEA", "TEO"],
    // 	[ "d", "dp", "DEA", "DEO"],
    // 	[ "f", "fp", "FEA", "FEO"],
    // 	[ "b", "bp", "BEA", "BEO"]
    // ];
    var tableData3 = [
	[ "x", "M", [
	    {
		start: { x: .5, y: -1},
		end: {x: .5, y: 1},
		normal: { x: 0, y:0, z: 1}
	    },
	    {
		start: { x: .5, z: 1},
		end: {x: .5, z: -1},
		normal: { x: 0, y:1, z: 0}
	    },
	    {
		start: { x: -.5, y: -1},
		end: {x: -.5, y: 1},
		normal: { x: 0, y:0, z: 1}
	    },
	    {
		start: { x: -.5, z: 1},
		end: {x: -.5, z: -1},
		normal: { x: 0, y:1, z: 0}
	    }
	],//rrrrrrrrroooooooooyyyyyyyyywwwwwwwwwgggggggggbbbbbbbbb
	  "oooooooooooooooooooooooooooooooooooooooooooooooooooooo"
	],
	[ "y", "N", [
	    {
		start: { y: .5, z: -1},
		end: {y: .5, z: 1},
		normal: { x: 1, y:0, z: 0}
	    },
	    {
		start: { x: 1, y: .5},
		end: {x: -1, y: .5},
		normal: { x: 0, y:0, z: 1}
	    },
	    {
		start: { y: -.5, z: -1},
		end: {y: -.5, z: 1},
		normal: { x: 1, y:0, z: 0}
	    },
	    {
		start: { x: 1, y: -.5},
		end: {x: -1, y: -.5},
		normal: { x: 0, y:0, z: 1}
	    }
	    ],//rrrrrrrrroooooooooyyyyyyyyywwwwwwwwwgggggggggbbbbbbbbb
	  "oooooooooooooooooooooooooooooooooooooooooooooooooooooo"
	],
	[ "z", "P", [ {
		start: { x: -1, z: .5},
		end: {x: 1, z: .5},
		normal: { x: 0, y:1, z: 0}
	    },
	    {
		start: { y: 1, z: .5},
		end: {y: -1, z: .5},
		normal: { x: 1, y:0, z: 0}
	    },
	    {
		start: { x: -1, z: -.5},
		end: {x: 1, z: -.5},
		normal: { x: 0, y:1, z: 0}
	    },
	    {
		start: { y: 1, z: -.5},
		end: {y: -1, z: -.5},
		normal: { x: 1, y:0, z: 0}
	    }
	 ],//rrrrrrrrroooooooooyyyyyyyyywwwwwwwwwgggggggggbbbbbbbbb
	  "oooooooooooooooooooooooooooooooooooooooooooooooooooooo"
	],
    ];
    var tables = [tableData1, tableData2, tableData3];

    var stdSuffix = {
	single: "",
	inverse: "'",
	double: "2"
    };
    var shataroSuffix = {
	single: "A",
	inverse: "O",
	double: "I"
    }
    window.executeMove = function(tableIndex, rowIndex, type) {
	window.playFormula('formulaTest', tables[tableIndex][rowIndex][0] + stdSuffix[type]);
    }
    window.executeMoveMouseOver = function(tableIndex, rowIndex, type) {
	var formulaPlayer = window.getFormulaPlayer('formulaTest');
	var arrows = tables[tableIndex][rowIndex][2] || [];
	var fillString = tables[tableIndex][rowIndex][3] || "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb";
	formulaPlayer.setArrows(arrows, type);
	formulaPlayer.setFillString(fillString);
	formulaPlayer.initCube();
	
    }
    window.executeMoveMouseLeave = function(tableIndex, rowIndex, type) {
	var formulaPlayer = window.getFormulaPlayer('formulaTest');
	formulaPlayer.setArrows([]);
	formulaPlayer.setFillString("bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
	formulaPlayer.initCube();
    }
    function insertRow2(tableData, rowIndex, type, tableIndex) {
	var row = tableData[rowIndex];
	document.writeln('<tr onclick="javascript:window.executeMove('+tableIndex+','+rowIndex+',\''+type+'\')" onmouseenter="javascript:window.executeMoveMouseOver('+tableIndex+','+rowIndex+',\''+type+'\')" onmouseleave="javascript:window.executeMoveMouseLeave('+tableIndex+','+rowIndex+',\''+type+'\')">');
	document.writeln('<td>' + row[0] + stdSuffix[type] + '</td>');
	document.writeln('<td>' + row[1] + shataroSuffix[type] + '</td>');
	document.writeln('</tr>');
    }
    
    function insertTable2(tableIndex, floating, clear) {
	var i, tableData = tables[tableIndex];;
	document.writeln('<table style="float: '+floating+';clear: '+clear+'"><tr><th>Standard</th><th>SHATARO</th></tr>');
	for(i = 0; i < tableData.length; i++) {
	    insertRow2(tableData, i, 'single', tableIndex); 
	    insertRow2(tableData, i, 'inverse', tableIndex); 
	    insertRow2(tableData, i, 'double', tableIndex); 
	}
	document.writeln('</table>');
	// document.writeln('<table style="clear: '+clear+'"><tr><th>Standard</th><th>SHATARO</th></tr>');
	// for(i = 0; i < tableData.length; i++) {
	//     insertRow2(tableData, i, true); 
	// }
	// document.writeln('</table>');
    }
    
    
    // window.insertTables = function() {
    // 	insertTable(tableData1, 'none');
    // 	insertTable(tableData2, 'none');
    // 	insertTable(tableData3, 'both');
    // }

    
    window.insertTable = function(index, floating, clear) {
	insertTable2(index, floating, clear);
    }
    
    window.insertTables = function() {
	insertTable2(0, 'left', 'none');
	insertTable2(1, 'left', 'none');
	insertTable2(2, 'left', 'both');
    }
})();
