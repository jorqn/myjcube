function start() {

    var QueryString = function () {
	// This function is anonymous, is executed immediately and 
	// the return value is assigned to QueryString!
	var query_string = {};
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
	    var pair = vars[i].split("=");
            // If first entry with this name
	    if (typeof query_string[pair[0]] === "undefined") {
		query_string[pair[0]] = pair[1];
		// If second entry with this name
	    } else if (typeof query_string[pair[0]] === "string") {
		var arr = [ query_string[pair[0]], pair[1] ];
		query_string[pair[0]] = arr;
		// If third or later entry with this name
	    } else {
		query_string[pair[0]].push(pair[1]);
	    }
	} 
	return query_string;
    } ();

    require.config({
	paths: {
            "cube": "src/cube",
            "scene": "src/scene"
	}
    });
    require(["cube/Cube", "cube/Interpreter"], function(Cube, Interpreter) {

	document.title = "MyJCube - OLL helper";

	var cube = new Cube();

//	function myError() {};
	function getTop(cube) {
	    var upFace = cube.faces.up;
	    var rval = upFace.getFillString();
	    rval += "/" + upFace.getNeighborEdgeString("up");
	    rval += "/" + upFace.getNeighborEdgeString("down");
	    rval += "/" + upFace.getNeighborEdgeString("left");
	    rval += "/" + upFace.getNeighborEdgeString("right");
	    if((rval.match(/y/g) || []).length !== 9) {
		throw "OMG";
	    }
	    if((rval.match(/w/g) || []).length > 0) {
		throw "OMG";
	    }
	    var superrval = rval.replace(/[orwbg]/g, " ");
	    return superrval;
	}

	var allFormulas = [
	    {str: "RU2R2U'R2U'R2U2R", index: 49},
	    {str: "RUR'URU'R'URU2R'", index: 50},
	    {str: "RUR'URU2R'", index: 51},
	    {str: "RU2R'U'RU'R'", index: 52},
	    {str: "R2DR'U2RD'R'U2R'", index: 55},
	    {str: "l'U'LURU'r'F", index: 56},
	    {str: "l'U'L'URU'LUx'", index: 57},
	    {str: "RUx'U'RUl'R'U'l'UlF'", index: 01},
	    {str: "FRUR'U'F'fRUR'U'f'", index: 02},
	    {str: "r'R2UR'UrU2r'UR'r", index: 03},
	    {str: "r'RU'rU2r'U'RU'R2r", index: 04},
	    {str: "r'RURUR'U'rR2FRF'", index: 05},
	    {str: "FRUR'Uy'R'U2R'FRF'", index: 06},
	    {str: "RUR'UR'FRF'U2R'FRF'", index: 07},
	    {str: "r'RURUR'U'r2R2URU'r'", index: 30},
	    {str: "FRUR'U'F'", index: 47},
	    {str: "RUR'U'R'FRF'", index: 48},
	    {str: "R'U'l'UlF'UR", index: 45},
	    {str: "RUR'U'xD'R'URU'Dx'", index: 46},
	    {str: "rU2R'U'RU'r'", index: 20},
	    {str: "l'U2LUL'Ul", index: 21},
	    {str: "rUR'URU2r'", index: 22},
	    {str: "l'U'LU'L'U2l", index: 23},
	    {str: "rR2U'RU'R'U2RU'Rr'", index: 24},
	    {str: "r'R2UR'URU2R'UR'r", index: 25},
	    {str: "R'FRUR'U'F'UR", index: 43}, 
	    {str: "LF'L'U'LUFU'L'", index: 44},
	    {str: "R'U2R2UR'URU2x'U'R'Ux", index: 08},
	    {str: "R'U'RU'R'dR'URB", index: 09},
	    {str: "fRUR'U'RUR'U'f'", index: 10},
	    {str: "r'U'rU'R'URU'R'URr'Ur", index: 11},
	    {str: "RUB'U'R'UlUl'", index: 35},
	    {str: "R'U'FURU'R'F'R", index: 36},
	    {str: "FURU'R'F'", index: 37},
	    {str: "F'U'L'ULF", index: 38},
	    {str: "FRUR'U'RUR'U'F'", index: 12},
	    {str: "F'L'U'LUL'U'LUF", index: 13},
	    {str: "l'UR'U'RlU2x'U'RUl'", index: 14},
	    {str: "R'FR2B'R2F'R2BR'", index: 15},
	    {str: "r'U'RU'R'URU'R'U2r", index: 16},
	    {str: "rUR'URU'R'URU2r'", index: 17},
	    {str: "RUR'URU'R'U'R'FRF'", index: 33},
	    {str: "R'U'RU'R'URUlU'R'Ux", index: 34},
	    {str: "R'U'Ry'x'RU'R'FRUl'", index: 18},
	    {str: "R'U2lRU'R'Ul'U2R", index: 31},
	    {str: "RUR'xz'R'URB'R'U'l", index: 19},
	    {str: "FRU'R'U'RUR'F'", index: 32},
	    {str: "R'FRUl'U'ly'RU'R'", index: 26},
	    {str: "x'RU'R'F'RUR'xyR'UR", index: 27},
	    {str: "LFL'RUR'U'LF'L'", index: 28},
	    {str: "L'B'LR'U'RUL'BL", index: 29},
	    {str: "B'RB'R2URUR'U'RB2", index: 39},
	    {str: "R2UR'B'RU'R2UlUl'", index: 40},
	    {str: "RUR'URU2R'FRUR'U'F'", index: 41},
	    {str: "R'U'RU'R'U2RFRUR'U'F'", index: 42},
	    {str: "RUR'U'rR'URU'r'", index: 53},
	    {str: "rR'URr'U2rR'URr'", index: 54}
	];

	function executeCommands(commands, cube) {
	    var table = Interpreter.parse(commands, false);
	    var nc = cube;
	    var i;
	    for(i = 0; i < table.length; i++) {
		nc = nc.executeCommand(table[i]);
	    }
	    return nc;
	}

	var i;
	for(i = 0; i < allFormulas.length; i++) {
	    getTop(executeCommands(allFormulas[i].str, cube));
	}


	var foundConfigs = [];
	function explore(command, depth, maxDepth) {
	    var i;
	    if(depth === maxDepth) {
		var testCube = executeCommands(command, cube);
		var testCubes = [getTop(testCube)];
		testCubes.push(getTop(testCube.executeCommand("y")));
		testCubes.push(getTop(testCube.executeCommand("y").executeCommand("y")));
		testCubes.push(getTop(testCube.executeCommand("y'")));
		var found = false;
		for(i = 0; i < foundConfigs.length; i++) {
		    var j;
		    for(j = 0; j < testCubes.length; j++) {
			if(foundConfigs[i].str === testCubes[j]) {
			    found = true;
			    if(command.length < foundConfigs[i].command.length || foundConfigs[i].depth === 1) {
				foundConfigs[i].command = command;
				foundConfigs[i].depth = depth;
			    }
			}
		    }
		}
		if(!found) {
		    foundConfigs.push({str: testCubes[0], command: command, depth: depth});
		}
	    } else {
		for(i = 0; i < allFormulas.length; i++) {
		    explore(command + allFormulas[i].str, depth+1, maxDepth);
		    explore(command + "y" + allFormulas[i].str, depth+1, maxDepth);
		    explore(command + "yp" + allFormulas[i].str, depth+1, maxDepth);
		    explore(command + "y2" + allFormulas[i].str, depth+1, maxDepth);
		}
	    }
	}

	console.log("starting depth 1");
	explore("", 0, 1);
	console.log("found: " + foundConfigs.length);
	if(foundConfigs.length < 58) {
	    console.log("starting depth 2");
	    explore("", 0, 2);
	    console.log("found: " + foundConfigs.length);
	}
	// if(false && foundConfigs.length < 58) {
	//     console.log("starting depth 3");
	//     explore("", 0, 3);
	//     console.log("found: " + foundConfigs.length);
	// }
//	console.log(foundConfigs);
	var p = document.createElement("p");
	document.body.appendChild(p);
	var str = "";
	for(i = 0; i < foundConfigs.length; i++) {
	    str += "#"+(i+1)+": " + foundConfigs[i].command + "<br>";
	}
	p.innerHTML = str;
    });
}
