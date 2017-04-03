define("cube/Cube3D", ["cube/Tile3D", "cube/Cube", "cube/CubeTexCoords"], function(Tile3D, Cube, CubeTexCoords) {
    "use strict";
    var Cube3D = function(params) {
	this.size = params.size;
	this.cube = params.cube;
	this.cubeTexCoords = params.cubeTexCoords || new CubeTexCoords();
	this.tiles = [];
	var uvBounds;
	uvBounds = this.cubeTexCoords.getFaceUvBounds('right');
	this.tiles.push(new Tile3D([ 1,-1,-1], [ 1, 0, 0], [2,0], this, uvBounds));
	this.tiles.push(new Tile3D([ 1,-1, 0], [ 1, 0, 0], [1,0], this, uvBounds));
	this.tiles.push(new Tile3D([ 1,-1, 1], [ 1, 0, 0], [0,0], this, uvBounds));
	this.tiles.push(new Tile3D([ 1, 0,-1], [ 1, 0, 0], [2,1], this, uvBounds));
	this.tiles.push(new Tile3D([ 1, 0, 0], [ 1, 0, 0], [1,1], this, uvBounds));
	this.tiles.push(new Tile3D([ 1, 0, 1], [ 1, 0, 0], [0,1], this, uvBounds));
	this.tiles.push(new Tile3D([ 1, 1,-1], [ 1, 0, 0], [2,2], this, uvBounds));
	this.tiles.push(new Tile3D([ 1, 1, 0], [ 1, 0, 0], [1,2], this, uvBounds));
	this.tiles.push(new Tile3D([ 1, 1, 1], [ 1, 0, 0], [0,2], this, uvBounds));

	uvBounds = this.cubeTexCoords.getFaceUvBounds('left');
	this.tiles.push(new Tile3D([-1,-1,-1], [-1, 0, 0], [0,0], this, uvBounds));
	this.tiles.push(new Tile3D([-1,-1, 0], [-1, 0, 0], [1,0], this, uvBounds));
	this.tiles.push(new Tile3D([-1,-1, 1], [-1, 0, 0], [2,0], this, uvBounds));
	this.tiles.push(new Tile3D([-1, 0,-1], [-1, 0, 0], [0,1], this, uvBounds));
	this.tiles.push(new Tile3D([-1, 0, 0], [-1, 0, 0], [1,1], this, uvBounds));
	this.tiles.push(new Tile3D([-1, 0, 1], [-1, 0, 0], [2,1], this, uvBounds));
	this.tiles.push(new Tile3D([-1, 1,-1], [-1, 0, 0], [0,2], this, uvBounds));
	this.tiles.push(new Tile3D([-1, 1, 0], [-1, 0, 0], [1,2], this, uvBounds));
	this.tiles.push(new Tile3D([-1, 1, 1], [-1, 0, 0], [2,2], this, uvBounds));

	uvBounds = this.cubeTexCoords.getFaceUvBounds('up');
	this.tiles.push(new Tile3D([-1, 1,-1], [ 0, 1, 0], [0,2], this, uvBounds));
	this.tiles.push(new Tile3D([-1, 1, 0], [ 0, 1, 0], [0,1], this, uvBounds));
	this.tiles.push(new Tile3D([-1, 1, 1], [ 0, 1, 0], [0,0], this, uvBounds));
	this.tiles.push(new Tile3D([ 0, 1,-1], [ 0, 1, 0], [1,2], this, uvBounds));
	this.tiles.push(new Tile3D([ 0, 1, 0], [ 0, 1, 0], [1,1], this, uvBounds));
	this.tiles.push(new Tile3D([ 0, 1, 1], [ 0, 1, 0], [1,0], this, uvBounds));
	this.tiles.push(new Tile3D([ 1, 1,-1], [ 0, 1, 0], [2,2], this, uvBounds));
	this.tiles.push(new Tile3D([ 1, 1, 0], [ 0, 1, 0], [2,1], this, uvBounds));
	this.tiles.push(new Tile3D([ 1, 1, 1], [ 0, 1, 0], [2,0], this, uvBounds));

	uvBounds = this.cubeTexCoords.getFaceUvBounds('down');
	this.tiles.push(new Tile3D([-1,-1,-1], [ 0,-1, 0], [0,0], this, uvBounds));
	this.tiles.push(new Tile3D([-1,-1, 0], [ 0,-1, 0], [0,1], this, uvBounds));
	this.tiles.push(new Tile3D([-1,-1, 1], [ 0,-1, 0], [0,2], this, uvBounds));
	this.tiles.push(new Tile3D([ 0,-1,-1], [ 0,-1, 0], [1,0], this, uvBounds));
	this.tiles.push(new Tile3D([ 0,-1, 0], [ 0,-1, 0], [1,1], this, uvBounds));
	this.tiles.push(new Tile3D([ 0,-1, 1], [ 0,-1, 0], [1,2], this, uvBounds));
	this.tiles.push(new Tile3D([ 1,-1,-1], [ 0,-1, 0], [2,0], this, uvBounds));
	this.tiles.push(new Tile3D([ 1,-1, 0], [ 0,-1, 0], [2,1], this, uvBounds));
	this.tiles.push(new Tile3D([ 1,-1, 1], [ 0,-1, 0], [2,2], this, uvBounds));


	uvBounds = this.cubeTexCoords.getFaceUvBounds('front');
	this.tiles.push(new Tile3D([-1,-1, 1], [ 0, 0, 1], [0,0], this, uvBounds));
	this.tiles.push(new Tile3D([ 0,-1, 1], [ 0, 0, 1], [1,0], this, uvBounds));
	this.tiles.push(new Tile3D([ 1,-1, 1], [ 0, 0, 1], [2,0], this, uvBounds));
	this.tiles.push(new Tile3D([-1, 0, 1], [ 0, 0, 1], [0,1], this, uvBounds));
	this.tiles.push(new Tile3D([ 0, 0, 1], [ 0, 0, 1], [1,1], this, uvBounds));
	this.tiles.push(new Tile3D([ 1, 0, 1], [ 0, 0, 1], [2,1], this, uvBounds));
	this.tiles.push(new Tile3D([-1, 1, 1], [ 0, 0, 1], [0,2], this, uvBounds));
	this.tiles.push(new Tile3D([ 0, 1, 1], [ 0, 0, 1], [1,2], this, uvBounds));
	this.tiles.push(new Tile3D([ 1, 1, 1], [ 0, 0, 1], [2,2], this, uvBounds));

	uvBounds = this.cubeTexCoords.getFaceUvBounds('back');
	this.tiles.push(new Tile3D([-1,-1,-1], [ 0, 0,-1], [2,2], this, uvBounds));
	this.tiles.push(new Tile3D([ 0,-1,-1], [ 0, 0,-1], [1,2], this, uvBounds));
	this.tiles.push(new Tile3D([ 1,-1,-1], [ 0, 0,-1], [0,2], this, uvBounds));
	this.tiles.push(new Tile3D([-1, 0,-1], [ 0, 0,-1], [2,1], this, uvBounds));
	this.tiles.push(new Tile3D([ 0, 0,-1], [ 0, 0,-1], [1,1], this, uvBounds));
	this.tiles.push(new Tile3D([ 1, 0,-1], [ 0, 0,-1], [0,1], this, uvBounds));
	this.tiles.push(new Tile3D([-1, 1,-1], [ 0, 0,-1], [2,0], this, uvBounds));
	this.tiles.push(new Tile3D([ 0, 1,-1], [ 0, 0,-1], [1,0], this, uvBounds));
	this.tiles.push(new Tile3D([ 1, 1,-1], [ 0, 0,-1], [0,0], this, uvBounds));
	this.materials = params.materials ||  {
	    down: new THREE.MeshBasicMaterial({color: 0xffffff}),
	    up: new THREE.MeshBasicMaterial({color: 0xffff00}),
	    back: new THREE.MeshBasicMaterial({color: 0x0000ff}),
	    front: new THREE.MeshBasicMaterial({color: 0x00ff00}),
	    left: new THREE.MeshBasicMaterial({color: 0xff0000}),
	    right: new THREE.MeshBasicMaterial({color: 0xff8800})
	};
	// this.maps =  {
	//     green: THREE.ImageUtils.loadTexture('img/green.jpg'),
	//     red: THREE.ImageUtils.loadTexture('img/red.jpg'),
	//     orange: THREE.ImageUtils.loadTexture('img/orange.jpg'),
	//     blue: THREE.ImageUtils.loadTexture('img/blue.jpg'),
	//     yellow: THREE.ImageUtils.loadTexture('img/yellow.jpg'),
	//     white: THREE.ImageUtils.loadTexture('img/white.jpg')
	// };
	// this.materialsTex = {
	//     white: new THREE.MeshPhongMaterial({map: this.maps.white}),
	//     yellow: new THREE.MeshPhongMaterial({map: this.maps.yellow}),
	//     blue: new THREE.MeshPhongMaterial({map: this.maps.blue}),
	//     green: new THREE.MeshPhongMaterial({map: this.maps.green}),
	//     red: new THREE.MeshPhongMaterial({map: this.maps.red}),
	//     orange: new THREE.MeshPhongMaterial({map: this.maps.orange})
	// };

	this.node = new THREE.Object3D();
	this.meshes = [];
	var i;
	for(i = 0; i < this.tiles.length; i++) {
	    this.node.add(this.tiles[i].node);
	    this.meshes.push(this.tiles[i].mesh);
	}

	this.command = null;
	this.commandK = null;

	this.setFromCube(this.cube);

	this.instantMode = false;

	this.history = [];

    };

    Cube3D.prototype.getMeshes = function() {
	return this.meshes;
    };

    Cube3D.prototype.setFromCube = function(cube) {
	var i, tile, tile3d;
	for(i = 0; i < this.tiles.length; i++) {
	    tile3d = this.tiles[i];
	    tile = cube.getTile(tile3d.position, tile3d.normal);
	    tile3d.setTile(tile);
	}
    };
    Cube3D.prototype.addToScene = function(scene) {
	var i;
	for(i = 0; i < this.tiles.length; i++) {
	    scene.add(this.tiles[i].mesh);
	}
    };
    Cube3D.prototype.rotateTo = function(normal, angle, dual) {
	var i, tile;
	var axis = new THREE.Vector3(normal[0], normal[1], normal[2]);
	for(i = 0; i < this.tiles.length; i++) {
	    tile = this.tiles[i];
	    if(tile.normalEquals(normal, dual)) {
		tile.node.setRotationFromAxisAngle(axis, angle);
	    }
	}
    };
    Cube3D.prototype.rotateAllTo = function(normal, angle) {
	var i, tile;
	var axis = new THREE.Vector3(normal[0], normal[1], normal[2]);
	for(i = 0; i < this.tiles.length; i++) {
	    tile = this.tiles[i];
	    tile.node.setRotationFromAxisAngle(axis, angle);
	}
    };
    Cube3D.prototype.resetPosition = function() {
	var i, tile;
	for(i = 0; i < this.tiles.length; i++) {
	    tile = this.tiles[i];
	    tile.node.setRotationFromQuaternion(new THREE.Quaternion());
	}	
    };
    Cube3D.commandTable = Cube.commandTable;
    Cube3D.faceToNormal = Cube.faceToNormal;
    Cube3D.axisToNormal = Cube.axisToNormal;
    Cube3D.oppositeFace = Cube.oppositeFace;
    Cube3D.faceToAxis = Cube.faceToAxis;
    Cube3D.prototype.startCommand = function(command) {
	if(command === "0" || command === "1") {
	    this.instantMode = !this.instantMode;
	    if(command === "1") {
		this.node.rotation.set(0,0,0);
	    }
	} else {
	    this.history.push(command);
	}
	this.currentCommand = Cube3D.commandTable[command];
	this.commandK = this.instantMode ? 1.0 : 0.0;
    };
    Cube3D.prototype.continueCommand = function(deltaTime, endCommandCB) {
	if(this.currentCommand) {
	    this.commandK += deltaTime / 1000.0;
	    if(this.commandK >= 1.0) {
		this.resetPosition();
		var newCube = this.cube.clone();
		if(this.currentCommand.face) {
		    if(this.currentCommand.dual) {
			this.cube.rotate(Cube3D.oppositeFace[this.currentCommand.face], 
					 this.currentCommand.direction, newCube);
			var newNewCube = newCube.clone();
			var axis = Cube3D.faceToAxis[this.currentCommand.face];
			newCube.rotateAll(axis.axis,axis.direction*this.currentCommand.direction, newNewCube);
			newCube = newNewCube;
		    } else {
			this.cube.rotate(this.currentCommand.face, this.currentCommand.direction, newCube);
		    }
		} else {
		    this.cube.rotateAll(this.currentCommand.axis, this.currentCommand.direction, newCube);
		}
		this.cube = newCube;
		this.setFromCube(this.cube);
		this.currentCommand = null;
		this.commandK = null;
		endCommandCB();
	    } else {
		if(this.currentCommand.face) {
		    this.rotateTo(Cube3D.faceToNormal[this.currentCommand.face], -1.0*this.currentCommand.direction*this.commandK*Math.PI/2.0, this.currentCommand.dual);
		} else {
		    this.rotateAllTo(Cube3D.axisToNormal[this.currentCommand.axis], -1.0*this.currentCommand.direction*this.commandK*Math.PI/2.0);
		}
	    }
	} else {
	    endCommandCB();
	}
    };
    return Cube3D;
});
