define("cube/Face", ["cube/Tile"], function(Tile) {
    "use strict";
    var Face = function(id) {
	this.id = id;
	this.neighbors = {};
	this.tiles = [[null, null, null],
		      [null, null, null],
		      [null, null, null]];
    };
    Face.prototype.addNeighbor = function(direction, face, angle) {
	this.neighbors[direction] = {face: face, angle: angle};
    };
    Face.prototype.getEdge = function(face) {
	var direction;
	for(direction in this.neighbors) {
	    if(this.neighbors[direction].face === face) {
		return direction;
	    }
	}
    };
    Face.prototype.getNeighbor = function(face) {
	var direction;
	for(direction in this.neighbors) {
	    if(this.neighbors[direction].face === face) {
		return this.neighbors[direction];
	    }
	}
    };
    Face.prototype.getTile = function(x, y) {
	return this.tiles[y+1][x+1];
    };
    Face.prototype.setTile = function(x, y, tile) {
	this.tiles[y+1][x+1] = tile;
    };
    Face.prototype.getCenter = function(x, y) {
	return this.tiles[1][1];
    };

    Face.prototype.fillFromString = function(str, charToColor) {
	var k = 0, c, i;
	var x=0, y=0, color, rotation, tx, ty;
	for(k = 0; k < 9; k++) {
	    color = charToColor[str.charAt(k)];
	    tx = (k % 3) - 1;
	    ty = Math.floor(k/3) - 1;
	    this.setTile(tx, ty, new Tile({color: color, x: x, y: y, rotation: 0}));
	}
    };

    Face.prototype.getFillString = function() {
	var k = 0, tile;
	var str = "", chr;
	for(k = 0; k < 9; k++) {
	    tile = this.getTile((k%3)-1, Math.floor(k/3)-1);
	    if(tile.color === 'gray') {
		chr = '_';
	    } else {
		chr = tile.color[0];
	    }
	    str += chr;
	}
       return str;
    }

    Face.prototype.getNeighborEdgeTiles = function(direction) {
	var neighbor = this.neighbors[direction].face;
	var edgeInNeighbor = neighbor.getEdge(this);
	var tilesPos = Face.edgesTiles[edgeInNeighbor];
	var k = 0, tile;
	var tiles = []
	for(k = 0; k < tilesPos.length; k++) {
	    tile = neighbor.getTile(tilesPos[k][0], tilesPos[k][1]);
	    tiles.push(tile);
	}
	return tiles;
	
    }

    Face.prototype.getNeighborEdgeString = function(direction) {
	var str = "";
	var tiles = Face.getNeighborEdgeTiles(direction);
	var i;
	for(i = 0; i < tiles.length; i++) {
	    str += tiles[i].color[0];
	}
	return str;
    }

    Face.prototype.fill = function(color) {
	function addTile(tile) {
	    _this.setTile(tile.x, tile.y, tile);
	}
	var _this = this;
	var x, y;
	for(x = -1; x <= 1; x++) {
	    for(y = -1; y <= 1; y++) {
		addTile(new Tile({color: color, id: this.id, x: x, y: y, rotation: 0}));
	    }
	}
    };
    Face.prototype.rotate = function(direction, destCube) {
	var k = direction > 0 ? 1 : -1;
	var l = direction > 0 ? -1 : 1;
	var x,y,xr,yr,tile,newTile;
	var destFace = destCube.faces[this.id];
	for(x = -1; x <= 1; x++) {
	    for(y = -1; y <= 1; y++) {
		xr = k*y;
		yr = l*x;
		tile = this.getTile(x,y);
		newTile = tile.clone();
		newTile.rotate(direction*-90);
		destFace.setTile(xr,yr,newTile);
	    }
	}	
    };
    Face.edgesTiles = {
	up: [[-1,1],[0,1],[1,1]],
	right: [[1,1],[1,0],[1,-1]],
	down: [[1,-1],[0,-1],[-1,-1]],
	left: [[-1,-1],[-1,0],[-1,1]]
    };
    function rotatePos(pos, angle) {
	if(angle === 0) {
	    return [pos[0], pos[1]];
	}
	if(angle === 90) {
	    return [-pos[1], pos[0]];
	}
	if(angle === 180) {
	    return [-pos[0], -pos[1]];
	}
	if(angle === -90) {
	    return [pos[1], -pos[0]];
	}
    }
    Face.prototype.pushEdge = function(edge, direction, destCube) {
	var tilesPos = Face.edgesTiles[edge];
	var neighbor = this.getNeighborInEdgeDirection(edge, direction);
	var dstFace = destCube.faces[neighbor.face.id];
	var dstAngle = neighbor.angle;
	var i, tile, newPos, newTile;
	for(i in tilesPos) {
	    tile = this.getTile(tilesPos[i][0], tilesPos[i][1]);
	    newPos = rotatePos(tilesPos[i], dstAngle);
	    newTile = tile.clone();
	    newTile.rotate(dstAngle);
	    dstFace.setTile(newPos[0], newPos[1], newTile);
	}
    };
    Face.prototype.pushAll = function(face, destCube) {
	var neighbor = this.getNeighbor(face);
	var x, y;
	var tile, newTile, newPos;
	var dstFace = destCube.faces[neighbor.face.id];
	for(x = -1; x <= 1; x++) {
	    for(y = -1; y <= 1; y++) {
		tile = this.getTile(x, y);
		newTile = tile.clone();
		newTile.rotate(neighbor.angle);
		newPos = rotatePos([x, y], neighbor.angle);
		dstFace.setTile(newPos[0], newPos[1], newTile);
	    }
	}
    };
    Face.prototype.getNeighborInEdgeDirection = function(edge, direction) {
	var table = {
	    "1": {
		up: "right",
		right: "down",
		down: "left",
		left: "up"
	    },
	    "-1": {
		up: "left",
		right: "up",
		down: "right",
		left: "down"
	    }
	};
	var swapEdge = table[direction][edge];
	return this.neighbors[swapEdge];
    };
    Face.prototype.copyTo = function(dstFace) {
	var x, y;
	for(x = -1; x <= 1; x++) {
	    for(y = -1; y <= 1; y++) {
		dstFace.setTile(x,y,this.getTile(x,y).clone());
	    }
	}	
    };
    Face.prototype.isSolved = function(checkOrientation) {
	var id0 = this.tiles[1][1].id;
	var rotation0 = this.tiles[1][1].rotation, tile;
	var i, j, tile;
	for(i = 0; i < this.tiles.length; i++) {
	    for(j = 0; j < this.tiles[i].length; j++) {
		var tile = this.tiles[i][j];
		if(!tile.alwaysSolved
		   && (tile.id !== id0
		       || (checkOrientation && tile.rotation !== rotation0))) {
		    return false;
		}
	    }
	}
	return true;
    }
    return Face;
});
