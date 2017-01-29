define("cube/Cube", ['cube/Face'], function(Face) {
    "use strict";
    var Cube = function(params) {
	this.faces = {
	    front: new Face("front"),
	    back: new Face("back"),
	    up: new Face("up"),
	    down: new Face("down"),
	    right: new Face("right"),
	    left: new Face("left")
	};
	this.faces.front.addNeighbor("up", this.faces.up, 0);
	this.faces.front.addNeighbor("down", this.faces.down, 0);
	this.faces.front.addNeighbor("right", this.faces.right, 0);
	this.faces.front.addNeighbor("left", this.faces.left, 0);

	this.faces.up.addNeighbor("up", this.faces.back, 0);
	this.faces.up.addNeighbor("down", this.faces.front, 0);
	this.faces.up.addNeighbor("right", this.faces.right, -90);
	this.faces.up.addNeighbor("left", this.faces.left, 90);

	this.faces.back.addNeighbor("up", this.faces.down, 0);
	this.faces.back.addNeighbor("down", this.faces.up, 0);
	this.faces.back.addNeighbor("right", this.faces.right, 180);
	this.faces.back.addNeighbor("left", this.faces.left, 180);

	this.faces.down.addNeighbor("up", this.faces.front, 0);
	this.faces.down.addNeighbor("down", this.faces.back, 0);
	this.faces.down.addNeighbor("right", this.faces.right, 90);
	this.faces.down.addNeighbor("left", this.faces.left, -90);

	this.faces.right.addNeighbor("up", this.faces.up, 90);
	this.faces.right.addNeighbor("down", this.faces.down, -90);
	this.faces.right.addNeighbor("right", this.faces.back, 180);
	this.faces.right.addNeighbor("left", this.faces.front, 0);

	this.faces.left.addNeighbor("up", this.faces.up, -90);
	this.faces.left.addNeighbor("down", this.faces.down, 90);
	this.faces.left.addNeighbor("right", this.faces.front, 0);
	this.faces.left.addNeighbor("left", this.faces.back, 180);

	if(!params || !params.empty) {
	    this.fill();
	}
    };

    var faceList = [ "front", "back", "up", "down", "right",
		     "left" ];
    var charToColor = { "r": "red", "o": "orange", "y": "yellow", 
		       "w": "white", "g": "green", "b": "blue"};
    function invertTable(table) {
	var key;
	var inverseTable = {};
	for(key in table) {
	    inverseTable[table[key]] = key;
	}
	return inverseTable; 
    }
    var colorToChar = invertTable(charToColor);
    Cube.prototype.fillFromString = function(str) {
	var cpf = 9;
	if(str.length !== cpf*6) {
	    console.log("Invalid cube config");
	}
	var i;
	for(i = 0; i < faceList.length; i++) {
	    this.faces[faceList[i]].fillFromString(str.substring(i*cpf, (i+1)*cpf), charToColor);
	}
    }

    Cube.prototype.getFillString = function() {
	var i, str = "" ;
	for(i = 0; i < faceList.length; i++) {
	    str += this.faces[faceList[i]].getFillString(colorToChar);
	}
	return str;
    }
    
    Cube.prototype.fill = function() {
	this.faces.front.fill("red");
	this.faces.back.fill("orange");
	this.faces.up.fill("yellow");
	this.faces.down.fill("white");
	this.faces.right.fill("green");
	this.faces.left.fill("blue");
    };

    Cube.prototype.getTile = function(position, normal) {
	var face, x, y;
	if(normal.z === 1) {
	    face = 'front';
	    x = position.x;
	    y = position.y;
	} else if(normal.z === -1) {
	    face = 'back';
	    x = -position.x;
	    y = -position.y;
	} else if(normal.x === 1) {
	    face = 'right';
	    x = -position.z;
	    y = position.y;
	} else if(normal.x === -1) {
	    face = 'left';
	    x = position.z;
	    y = position.y;
	} else if(normal.y === 1) {
	    face = 'up';
	    x = position.x;
	    y = -position.z;
	} else if(normal.y === -1) {
	    face = 'down';
	    x = position.x;
	    y = position.z;
	}
	return this.faces[face].getTile(x, y);
    };
    Cube.prototype.clone = function() {
	var newCube = new Cube();
	var key;
	for(key in this.faces) {
	    this.faces[key].copyTo(newCube.faces[key]);
	}
	return newCube;
    };
    Cube.prototype.rotate = function(face, direction, target) {
	var faceToTurn = this.faces[face];
	faceToTurn.rotate(direction, target);
	var allEdges = ["up", "down", "right", "left"];
	var iedge, neighborFace, edge;
	for(iedge = 0; iedge < allEdges.length; iedge++) {
	    neighborFace = faceToTurn.neighbors[allEdges[iedge]].face;
	    edge = neighborFace.getEdge(faceToTurn);
	    neighborFace.pushEdge(edge, -direction, target);
	}
	return target;
    };
    Cube.prototype.rotateAll = function(axis, direction, target) {
     	var turnTable = {
	    "x": {
		rotate: ["right", "left"],
		permute: ["front", "up", "back", "down"]
	    },
	    "y": {
		rotate: ["up", "down"],
		permute: ["right", "front", "left", "back"]
	    },
	    "z": {
		rotate: ["front", "back"],
		permute: ["up", "right", "down", "left"]
	    }
	};
	this.faces[turnTable[axis].rotate[0]].rotate(direction, target);
	this.faces[turnTable[axis].rotate[1]].rotate(-1*direction, target);
	var permute = turnTable[axis].permute;
	var i, j, id, targetid;
	for(i = 0; i < permute.length; i++) {
	    id = permute[i];
	    j = i + direction;
	    if(j < 0) {
		j += permute.length;
	    }
	    j = j % permute.length;
	    targetid = permute[j];
	    this.faces[id].pushAll(this.faces[targetid], target);
	}
    };
    Cube.prototype.scramble = function() {
	var i = 0;
	var currentCube = this, newCube;
	var nbMoves = 1000;
	for(i = 0; i < nbMoves; i++) {
	    newCube = currentCube.clone();
	    var faceIndex = Math.floor(Math.random()*6);
	    var direction = Math.random() < 0.5 ? -1 : 1;
	    currentCube.rotate(faceList[faceIndex], direction, newCube);
	    console.log(faceList[faceIndex] + " " + direction);
	    currentCube = newCube;
	}
	return currentCube;
    }
    Cube.prototype.executeCommand = function(command) {
	var cmd = Cube.commandTable[command];
	var newCube = this.clone();
	if(cmd.face) {
	    if(cmd.dual) {
		this.rotate(Cube.oppositeFace[cmd.face], 
				 cmd.direction, newCube);
		var newNewCube = newCube.clone();
		var axis = Cube.faceToAxis[cmd.face];
		newCube.rotateAll(axis.axis,axis.direction*cmd.direction, newNewCube);
		newCube = newNewCube;
	    } else {
		this.rotate(cmd.face, cmd.direction, newCube);
	    }
	} else {
	    this.rotateAll(cmd.axis, cmd.direction, newCube);
	}
	return newCube;
    };
    Cube.prototype.executeCommands = function(commands) {
	var i, cube = this;
	for(i = 0; i < commands.length; i++) {
	    cube = cube.executeCommand(commands[i]);
	}
	return cube;
    };
    Cube.prototype.isSolved = function(checkOrientation) {
	var key;
	for(key in this.faces) {
	    if(!this.faces[key].isSolved(checkOrientation)) {
		return false;
	    }
	}
	return true;
    };
    Cube.commandTable = {
	"U": {face: "up", direction: 1},
	"D": {face: "down", direction: 1},
	"F": {face: "front", direction: 1},
	"B": {face: "back", direction: 1},
	"L": {face: "left", direction: 1},
	"R": {face: "right", direction: 1},
	"U'": {face: "up", direction: -1},
	"D'": {face: "down", direction: -1},
	"F'": {face: "front", direction: -1},
	"B'": {face: "back", direction: -1},
	"L'": {face: "left", direction: -1},
	"R'": {face: "right", direction: -1},
	"x": {axis: 'x', direction: 1},
	"y": {axis: 'y', direction: 1},
	"z": {axis: 'z', direction: 1},
	"x'": {axis: 'x', direction: -1},
	"y'": {axis: 'y', direction: -1},
	"z'": {axis: 'z', direction: -1},
	"u": {face: "up", direction: 1, dual: true},
	"d": {face: "down", direction: 1, dual: true},
	"f": {face: "front", direction: 1, dual: true},
	"b": {face: "back", direction: 1, dual: true},
	"l": {face: "left", direction: 1, dual: true},
	"r": {face: "right", direction: 1, dual: true},
	"u'": {face: "up", direction: -1, dual: true},
	"d'": {face: "down", direction: -1, dual: true},
	"f'": {face: "front", direction: -1, dual: true},
	"b'": {face: "back", direction: -1, dual: true},
	"l'": {face: "left", direction: -1, dual: true},
	"r'": {face: "right", direction: -1, dual: true}
    };
    Cube.faceToNormal = {
	"up": [0,1,0],
	"down": [0,-1,0],
	"front": [0,0,1],
	"back": [0,0,-1],
	"right": [1,0,0],
	"left": [-1,0,0]
    };
    Cube.axisToNormal = {
	"x": [1,0,0],
	"y": [0,1,0],
	"z": [0,0,1]
    };
    Cube.oppositeFace = {
	"up": "down",
	"down": "up",
	"right": "left",
	"left": "right",
	"back": "front",
	"front": "back"
    };
    Cube.faceToAxis = {
	"up": {axis: "y", direction: 1},
	"down": {axis: "y", direction: -1},
	"right": {axis: "x", direction: 1},
	"left": {axis: "x", direction: -1},
	"front": {axis: "z", direction: 1},
	"back": {axis: "z", direction: -1}

    };

    return Cube;
});
