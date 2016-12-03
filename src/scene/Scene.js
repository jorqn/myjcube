define('scene/Scene', ['cube/Cube', 'cube/Cube3D', 'cube/Interpreter', 'scene/Arrow', 'scene/ArrowMaterial'], function(Cube, Cube3D, Interpreter, Arrow, ArrowMaterial) {
    "use strict";
    var Scene = function(width, height, init, fill, scramble, cubeMaterials, cubeTexCoords) {
	this.frameIndex = 1000;
	this.width = width;
	this.height = height;
	this.init = init ? init : "";

	this.scene = new THREE.Scene();
//	this.camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );
	var fact = 0.012;
	this.camera = new THREE.OrthographicCamera(fact*-480/2.0, fact*480/2.0, fact*480/2.0, fact*-480/2.0, -100, 100.0);
//	this.camera = new THREE.PerspectiveCamera(-20,-20, 20, 20, 0.1, 50);
	this.camera.position.set(4,4,4);
	this.camera.up = new THREE.Vector3(0, 1, 0);
	this.camera.lookAt(new THREE.Vector3(0, 0, 0));

	function toScreenXY( position, camera ) {
            var pos = position.clone();
            var projScreenMat = new THREE.Matrix4();
            projScreenMat.multiply( camera.projectionMatrix, camera.matrixWorldInverse );
            projScreenMat.multiplyVector3( pos );

            return { x: ( pos.x + 1 ) * width / 2,
                 y: ( - pos.y + 1) * height / 2 };

        }

	console.log(toScreenXY(new THREE.Vector3(1.0, 0, 0), this.camera));

	this.renderer = new THREE.WebGLRenderer();
	this.renderer.setSize(this.width, this.height);
	this.domElement = this.renderer.domElement;


	var directionalLight = new THREE.DirectionalLight( 0xffffff, 1.0 );
	directionalLight.position.set( 1, 1, 0.5 );
	this.scene.add( directionalLight );

	var directionalLight2 = new THREE.DirectionalLight( 0xffffff, 0.5 );
	directionalLight2.position.set( -1, -1, 0.5 );
	this.scene.add( directionalLight2 );

	this.cube3d = new Cube3D({size: 1.0, cube: new Cube(), cubeTexCoords: cubeTexCoords, materials: cubeMaterials});
	if(fill) {
	    cube.fillFromString(fill);
	} else if(scramble) {
	    this.cube3d.cube = this.cube3d.cube.scramble();
	}
	this.cube3d.setFromCube(this.cube3d.cube);
	// var cube2 = cube.rotate("up", +1);
//	this.cube3d.setFromCube(cube2);
	this.scene.add(this.cube3d.node);

	this.cameraMove = null;

	this.commandQueue = [];
	this.texArrow = THREE.ImageUtils.loadTexture('img/arrow.png');
	this.texArrow.minFilter = THREE.NearestFilter;
	this.texArrow.magFilter = THREE.NearestFilter;
	this.texRoundArrow = THREE.ImageUtils.loadTexture('img/roundarrow.png');
	this.texRoundArrow.minFilter = THREE.NearestFilter;
	this.texRoundArrow.magFilter = THREE.NearestFilter;
	this.texArrowHL = THREE.ImageUtils.loadTexture('img/arrowhl.png');
	this.straightArrowMaterial = new ArrowMaterial({map: this.texArrow});
        // this.materialArrow1 = new THREE.MeshBasicMaterial({map: this.texArrow, transparent: true, opacity: 0.2, depthTest: false, side: THREE.DoubleSide});
        // this.materialArrow = new THREE.MeshBasicMaterial({map: this.texArrow, transparent: true, opacity: 0.5, depthTest: false, side: THREE.DoubleSide});
        // this.materialArrowHL = new THREE.MeshBasicMaterial({map: this.texArrow, transparent: true, depthTest: false, side: THREE.DoubleSide});
	// var mymat = { normal: this.materialArrow, hl: this.materialArrowHL };
	// this.materialArrow.mymat = mymat;
	// this.materialArrowHL.mymat = mymat;
	this.roundArrowMaterial = new ArrowMaterial({map: this.texRoundArrow});
        // this.materialRoundArrow1 = new THREE.MeshBasicMaterial({map: this.texRoundArrow, transparent: true, opacity: 0.2, depthTest: false});
        // this.materialRoundArrow = new THREE.MeshBasicMaterial({map: this.texRoundArrow, transparent: true, opacity: 0.5, depthTest: false});
        // this.materialRoundArrowHL = new THREE.MeshBasicMaterial({map: this.texRoundArrow, transparent: true, depthTest: false});
	// mymat = { normal: this.materialRoundArrow, hl: this.materialRoundArrowHL };
	// this.materialRoundArrow.mymat = mymat;
	// this.materialRoundArrowHL.mymat = mymat;
	this.position = "up";
	this.createArrows(); 
    };

    Scene.prototype.createArrows = function() {
	var plus = 1.25 + 0.25/2.0;
	var deltaDoubleMove = 0.25;
	var tab = [
//	    { position: {x:, y:, z: }, two: , normal: {x: , y: , z: }, command: }
	    { position: {x: 1, y: 1, z: -plus}, normal: {x: 0, y: 1, z: 0}, command: "R", angle: 0},
	    { position: {x: deltaDoubleMove, y: 1, z: -plus}, normal: {x: 0, y: 1, z: 0}, command: "r", angle: 0, twinWithPrevious: true},
	    { position: {x: 1, y: 1, z: plus}, normal: {x: 0, y: 1, z: 0}, command: "R'", angle: 180},
	    { position: {x: deltaDoubleMove, y: 1, z: plus}, normal: {x: 0, y: 1, z: 0}, command: "r'", angle: 180, twinWithPrevious: true},
	    { position: {x: -1, y: 1, z: -plus}, normal: {x: 0, y: 1, z: 0}, command: "L'", angle: 0},
	    { position: {x: -deltaDoubleMove, y: 1, z: -plus}, normal: {x: 0, y: 1, z: 0}, command: "l'", angle: 0, twinWithPrevious: true},
	    { position: {x: -1, y: 1, z: plus}, normal: {x: 0, y: 1, z: 0}, command: "L", angle: 180},
	    { position: {x: -deltaDoubleMove, y: 1, z: plus}, normal: {x: 0, y: 1, z: 0}, command: "l", angle: 180, twinWithPrevious: true},
	    // { position: {x: 0, y: 1, z: plus}, normal: {x: 0, y: 1, z: 0}, command: "x'", altCommand: "lL'", angle: 180, noshift: true},
	    // { position: {x: 0, y: 1, z: -plus}, normal: {x: 0, y: 1, z: 0}, command: "x ", altCommand: "l'L", angle: 0, noshift: true},

	    { position: {x: plus, y: 1, z: -1}, normal: {x: 0, y: 1, z: 0}, command: "B'", angle: -90},
	    { position: {x: plus, y: 1, z: -deltaDoubleMove}, normal: {x: 0, y: 1, z: 0}, command: "b'", angle: -90, twinWithPrevious: true},
	    { position: {x: plus, y: 1, z: 1}, normal: {x: 0, y: 1, z: 0}, command: "F", angle: -90},
	    { position: {x: plus, y: 1, z: deltaDoubleMove}, normal: {x: 0, y: 1, z: 0}, command: "f", angle: -90, twinWithPrevious: true},
	    { position: {x: -plus, y: 1, z: -1}, normal: {x: 0, y: 1, z: 0}, command: "B", angle: 90},
	    { position: {x: -plus, y: 1, z: -deltaDoubleMove}, normal: {x: 0, y: 1, z: 0}, command: "b", angle: 90, twinWithPrevious: true},
	    { position: {x: -plus, y: 1, z: 1}, normal: {x: 0, y: 1, z: 0}, command: "F'", angle: 90},
	    { position: {x: -plus, y: 1, z: deltaDoubleMove}, normal: {x: 0, y: 1, z: 0}, command: "f'", angle: 90, twinWithPrevious: true},
	    // { position: {x: plus, y: 1, z: 0}, normal: {x: 0, y: 1, z: 0}, command: "z", altCommand: "b'B", angle: -90, noshift: true},
	    // { position: {x: -plus, y: 1, z: 0}, normal: {x: 0, y: 1, z: 0}, command: "z'", altCommand: "bB'", angle: 90, noshift: true},



	    { position: {x: 1, y: plus, z: 1}, normal: {x: 1, y: 0, z: 0}, command: "F'", angle: 0},
	    { position: {x: 1, y: plus, z: deltaDoubleMove}, normal: {x: 1, y: 0, z: 0}, command: "f'", angle: 0, twinWithPrevious: true},
	    { position: {x: 1, y: -plus, z: 1}, normal: {x: 1, y: 0, z: 0}, command: "F", angle: 180},
	    { position: {x: 1, y: -plus, z: deltaDoubleMove}, normal: {x: 1, y: 0, z: 0}, command: "f", angle: 180, twinWithPrevious: true},
	    { position: {x: 1, y: plus, z: -1}, normal: {x: 1, y: 0, z: 0}, command: "B", angle: 0},
	    { position: {x: 1, y: plus, z: -deltaDoubleMove}, normal: {x: 1, y: 0, z: 0}, command: "b", angle: 0, twinWithPrevious: true},
	    { position: {x: 1, y: -plus, z: -1}, normal: {x: 1, y: 0, z: 0}, command: "B'", angle: 180},
	    { position: {x: 1, y: -plus, z: -deltaDoubleMove}, normal: {x: 1, y: 0, z: 0}, command: "b'", angle: 180, twinWithPrevious: true},
	    // { position: {x: 1, y: plus, z: 0}, normal: {x: 1, y: 0, z: 0}, command: "z'", altCommand: "f'F", angle: 0, noshift: true},
	    // { position: {x: 1, y: -plus, z: 0}, normal: {x: 1, y: 0, z: 0}, command: "z", altCommand: "fF'", angle: 180, noshift: true},

	    { position: {x: 1, y: 1, z: plus}, normal: {x: 1, y: 0, z: 0}, command: "U", angle: 90},
	    { position: {x: 1, y: deltaDoubleMove, z: plus}, normal: {x: 1, y: 0, z: 0}, command: "u", angle: 90, twinWithPrevious: true},
	    { position: {x: 1, y: -1, z: plus}, normal: {x: 1, y: 0, z: 0}, command: "D'", angle: 90},
	    { position: {x: 1, y: -deltaDoubleMove, z: plus}, normal: {x: 1, y: 0, z: 0}, command: "d'", angle: 90, twinWithPrevious: true},
	    { position: {x: 1, y: 1, z: -plus}, normal: {x: 1, y: 0, z: 0}, command: "U'", angle: -90},
	    { position: {x: 1, y: deltaDoubleMove, z: -plus}, normal: {x: 1, y: 0, z: 0}, command: "u'", angle: -90, twinWithPrevious: true},
	    { position: {x: 1, y: -1, z: -plus}, normal: {x: 1, y: 0, z: 0}, command: "D", angle: -90},
	    { position: {x: 1, y: -deltaDoubleMove, z: -plus}, normal: {x: 1, y: 0, z: 0}, command: "d", angle: -90, twinWithPrevious: true},
	    // { position: {x: 1, y: 0, z: plus}, normal: {x: 1, y: 0, z: 0}, command: "y", altCommand: "uU'", angle: 90, noshift: true},
	    // { position: {x: 1, y: 0, z: -plus}, normal: {x: 1, y: 0, z: 0}, command: "y'", altCommand: "u'U", angle: -90, noshift: true},




	    { position: {x: plus, y: 1, z: 1}, normal: {x: 0, y: 0, z: 1}, command: "U'", angle: -90},
	    { position: {x: plus, y: deltaDoubleMove, z: 1}, normal: {x: 0, y: 0, z: 1}, command: "u'", angle: -90, twinWithPrevious: true},
	    { position: {x: -plus, y: 1, z: 1}, normal: {x: 0, y: 0, z: 1}, command: "U", angle: 90},
	    { position: {x: -plus, y: deltaDoubleMove, z: 1}, normal: {x: 0, y: 0, z: 1}, command: "u", angle: 90, twinWithPrevious: true},
	    { position: {x: plus, y: -1, z: 1}, normal: {x: 0, y: 0, z: 1}, command: "D", angle: -90},
	    { position: {x: plus, y: -deltaDoubleMove, z: 1}, normal: {x: 0, y: 0, z: 1}, command: "d", angle: -90, twinWithPrevious: true},
	    { position: {x: -plus, y: -1, z: 1}, normal: {x: 0, y: 0, z: 1}, command: "D'", angle: 90},
	    { position: {x: -plus, y: -deltaDoubleMove, z: 1}, normal: {x: 0, y: 0, z: 1}, command: "d'", angle: 90, twinWithPrevious: true},
	    // { position: {x: plus, y: 0, z: 1}, normal: {x: 0, y: 0, z: 1}, command: "y'", altCommand: "u'U", angle: -90, noshift: true},
	    // { position: {x: -plus, y: 0, z: 1}, normal: {x: 0, y: 0, z: 1}, command: "y", altCommand: "uU'", angle: 90, noshift: true},


 	    { position: {x: 1, y: plus, z: 1}, normal: {x: 0, y: 0, z: 1}, command: "R", angle: 0},
 	    { position: {x: deltaDoubleMove, y: plus, z: 1}, normal: {x: 0, y: 0, z: 1}, command: "r", angle: 0, twinWithPrevious: true},
	    { position: {x: -1, y: plus, z: 1}, normal: {x: 0, y: 0, z: 1}, command: "L'", angle: 0},
	    { position: {x: -deltaDoubleMove, y: plus, z: 1}, normal: {x: 0, y: 0, z: 1}, command: "l'", angle: 0, twinWithPrevious: true},
	    { position: {x: 1, y: -plus, z: 1}, normal: {x: 0, y: 0, z: 1}, command: "R'", angle: 180},
	    { position: {x: deltaDoubleMove, y: -plus, z: 1}, normal: {x: 0, y: 0, z: 1}, command: "r'", angle: 180, twinWithPrevious: true},
	    { position: {x: -1, y: -plus, z: 1}, normal: {x: 0, y: 0, z: 1}, command: "L", angle: 180},
	    { position: {x: -deltaDoubleMove, y: -plus, z: 1}, normal: {x: 0, y: 0, z: 1}, command: "l", angle: 180, twinWithPrevious: true},
	    // { position: {x: 0, y: plus, z: 1}, normal: {x: 0, y: 0, z: 1}, command: "x", altCommand: "rR'", angle: 0, noshift: true},
	    // { position: {x: 0, y: -plus, z: 1}, normal: {x: 0, y: 0, z: 1}, command: "x'", altCommand: "r'R", angle: 180, noshift: true},

	    { position: {x: 1, y: -1, z: -plus}, normal: {x: 0, y: -1, z: 0}, command: "R'", angle: 180},
	    { position: {x: deltaDoubleMove, y: -1, z: -plus}, normal: {x: 0, y: -1, z: 0}, command: "r'", angle: 180, twinWithPrevious: true},
	    { position: {x: 1, y: -1, z: plus}, normal: {x: 0, y: -1, z: 0}, command: "R", angle: 0},
	    { position: {x: deltaDoubleMove, y: -1, z: plus}, normal: {x: 0, y: -1, z: 0}, command: "r", angle: 0, twinWithPrevious: true},
	    { position: {x: -1, y: -1, z: -plus}, normal: {x: 0, y: -1, z: 0}, command: "L", angle: 180},
	    { position: {x: -deltaDoubleMove, y: -1, z: -plus}, normal: {x: 0, y: -1, z: 0}, command: "l", angle: 180, twinWithPrevious: true},
	    { position: {x: -1, y: -1, z: plus}, normal: {x: 0, y: -1, z: 0}, command: "L'", angle: 0},
	    { position: {x: -deltaDoubleMove, y: -1, z: plus}, normal: {x: 0, y: -1, z: 0}, command: "l'", angle: 0, twinWithPrevious: true},

	    { position: {x: plus, y: -1, z: -1}, normal: {x: 0, y: -1, z: 0}, command: "B", angle: -90},
	    { position: {x: plus, y: -1, z: -deltaDoubleMove}, normal: {x: 0, y: -1, z: 0}, command: "b", angle: -90, twinWithPrevious: true},
	    { position: {x: plus, y: -1, z: 1}, normal: {x: 0, y: -1, z: 0}, command: "F'", angle: -90},
	    { position: {x: plus, y: -1, z: deltaDoubleMove}, normal: {x: 0, y: -1, z: 0}, command: "f'", angle: -90, twinWithPrevious: true},
	    { position: {x: -plus, y: -1, z: -1}, normal: {x: 0, y: -1, z: 0}, command: "B'", angle: 90},
	    { position: {x: -plus, y: -1, z: -deltaDoubleMove}, normal: {x: 0, y: -1, z: 0}, command: "b'", angle: 90, twinWithPrevious: true},
	    { position: {x: -plus, y: -1, z: 1}, normal: {x: 0, y: -1, z: 0}, command: "F", angle: 90},
	    { position: {x: -plus, y: -1, z: deltaDoubleMove}, normal: {x: 0, y: -1, z: 0}, command: "f", angle: 90, twinWithPrevious: true},


 	    { position: {x: -2, y: 0, z: 1}, normal: {x: 0, y: 0, z: 1}, command: "y", angle: 90, permanent: "up"},
 	    { position: {x: 0, y: -2, z: 1}, normal: {x: 0, y: 0, z: 1}, command: "x'", angle: 180, permanent: "up"},
 	    { position: {x: 0, y: 1, z: -2}, normal: {x: 0, y: 1, z: 0}, command: "x", angle: 0, permanent: "up"},
 	    { position: {x: -2, y: 1, z: 0}, normal: {x: 0, y: 1, z: 0}, command: "z'", angle: 90, permanent: "up"},
 	    { position: {x: 1, y: 0, z: -2}, normal: {x: 1, y: 0, z: 0}, command: "y'", angle: -90, permanent: "up"},
 	    { position: {x: 1, y: -2, z: 0}, normal: {x: 1, y: 0, z: 0}, command: "z", angle: 180, permanent: "up"},

 	    { position: {x: -2, y: 0, z: 1}, normal: {x: 0, y: 0, z: 1}, command: "y", angle: 90, permanent: "down"},
 	    { position: {x: 0, y: 2, z: 1}, normal: {x: 0, y: 0, z: 1}, command: "x", angle: 0, permanent: "down"},
 	    { position: {x: 0, y: -1, z: -2}, normal: {x: 0, y: -1, z: 0}, command: "x'", angle: 180, permanent: "down"},
 	    { position: {x: -2, y: -1, z: 0}, normal: {x: 0, y: -1, z: 0}, command: "z", angle: 90, permanent: "down"},
 	    { position: {x: 1, y: 0, z: -2}, normal: {x: 1, y: 0, z: 0}, command: "y'", angle: -90, permanent: "down"},
 	    { position: {x: 1, y: 2, z: 0}, normal: {x: 1, y: 0, z: 0}, command: "z'", angle: 0, permanent: "down"},


 	    { position: {x: 0, y: 0, z: 1}, normal: {x: 0, y: 0, z: 1}, command: "F", angle: 0, material: this.roundArrowMaterial},
 	    { position: {x: 0, y: 1, z: 0}, normal: {x: 0, y: 1, z: 0}, command: "U", angle: 0, material: this.roundArrowMaterial},
 	    { position: {x: 1, y: 0, z: 0}, normal: {x: 1, y: 0, z: 0}, command: "R", angle: 0, material: this.roundArrowMaterial},
 	    { position: {x: 0, y: -1, z: 0}, normal: {x: 0, y: -1, z: 0}, command: "D", angle: 0, material: this.roundArrowMaterial},

	];
	var i;
	this.arrowMeshes = [];
	this.arrows = [];
	this.arrowNode = new THREE.Object3D();
	for(i = 0; i < tab.length; i++) {
	    var arrow = new Arrow({
		material: tab[i].material || this.straightArrowMaterial,
		position: tab[i].position,
		normal: tab[i].normal,
		node: this.arrowNode,
		command: tab[i].command,
		altCommand: tab[i].altCommand,
		two: tab[i].two,
		angle: tab[i].angle,
		size: this.cube3d.size,
		permanent: tab[i].permanent,
		noshift: tab[i].noshift
	    });
	    if(false && tab[i].twinWithPrevious) {
		arrow.mesh.twin = this.arrows[i-1].mesh;
	    }
	    this.arrows.push(arrow);
	    this.arrowMeshes.push(arrow.mesh);
	}
	this.scene.add(this.arrowNode);
    };

    Scene.prototype.playCommands = function(commands) {
	var _this = this;
	function goCommand(index) {
	    _this.cube3d.startCommand(commands[index], function() {
		if(index < commands.length) {
		    goCommand(index+1);
		}
	    });
	}
	goCommand(0);
    }

    Scene.prototype.addCommands = function(commands) {
	this.commandQueue = this.commandQueue.concat(commands);
    };

    Scene.prototype.playFormula = function(str) {
	var tab = Interpreter.parse(str);
	this.addCommands(tab);
    };

    Scene.prototype.startAnimationLoop = function() {
	this.animate();
//	this.playCommands(["H","H","C","H","C","H","C","H","H","C'","H","C'","H","C'"]);
//	this.playCommands(["F", "B", "R", "L", "U", "D", "D'", "U'", "L'", "R'", "B'", "F'"]);
//	this.playCommands(["R"]);
//	var Interpreter.parse("0R'B2U'F2L2D'UL'FD2RU2B'LR0");
	var tab = Interpreter.parse("0"+this.init+"0");
//	var tab = interpreter.parse("xyzz'y'x'");
//	var tab = interpreter.parse("ufbrldd'l'r'b'f'u'");
//	var tab = interpreter.parse("Uz'");
	this.addCommands(tab);
    }

    var counter = 0;
    var freq = 60;
    var commandRunning = false;
    var verticalAngle = 35.2643896828;
    var verticalAngleRadian = (verticalAngle/180)*Math.PI;

    Scene.prototype.animate = function() {
	var _this = this;
	requestAnimationFrame(function() {
	    _this.animate();
	});
	var i = 0;
	for(i = 0; i < this.arrows.length; i++) {
	    if(this.arrows[i].permanent && !this.cameraMove) {
		this.arrows[i].setVisible((this.arrows[i].permanent === this.position) ? true : false, this.frameIndex);
	    }
	}

	do {
	    this.cube3d.continueCommand(2.0*1000.0/60, function onCommandEnd() {
		// if(_this.cube3d.cube.isSolved()) {
		//     alert('solved!');
		// }
		if(_this.commandQueue.length > 0) {
		    _this.cube3d.startCommand(_this.commandQueue.shift(), true);
		    commandRunning = true;
		} else {
		    commandRunning = false;
		}
	    });
	} while(this.cube3d.instantMode && this.commandQueue.length);
	
	var arrowsVisible = /*!commandRunning && */!this.cameraMove;
	for(i = 0; i < this.arrows.length; i++) {
	    this.arrows[i].updateMesh(this.frameIndex);
//	    this.arrows[i].mesh.visible = arrowsVisible && this.arrows[i].visible; 
	}
	// this.camera.position.set(5.0*Math.sin(angle), 5.0, 5.0*Math.cos(angle));

/*
	var k = counter % (4 *freq);
	if( k < freq || k > 3*freq) {
	    this.cube3d.node.rotateY(Math.PI/freq);
	} else {
	    this.cube3d.node.rotateY(-Math.PI/freq);
	}
	counter++;*/
//	this.cube3d.rotate([0,0,-1], 0.01);343

//	this.cube3d.rotate([0,1,0], 0.02);
//	this.cube3d.node.rotateY(0.01);

	if(false && this.cameraMove) {
	    if(this.cameraMove.currentRaycaster) {
		if(this.cameraMove.ended) {
		    this.cameraMove.k -= 0.05;
		    if(this.cameraMove.k < 0 ){
			this.cameraMove.k = 0;
		    }
		    //		this.cameraMove.k = 0;
		}
		var normal = new THREE.Vector3(1/Math.sqrt(3), 1/Math.sqrt(3), 1/Math.sqrt(3));
		var plane = new THREE.Plane(normal, 0);
		var pOrigin = plane.projectPoint(this.cameraMove.originRaycaster.ray.origin);
		var pCurrent = plane.projectPoint(this.cameraMove.currentRaycaster.ray.origin);
		var direction  = pCurrent.clone();
		direction.sub(pOrigin);
		direction.normalize();
		var axis = direction.clone();
		axis.cross(normal);
		this.cube3d.node.setRotationFromAxisAngle(axis, -this.cameraMove.k*pOrigin.distanceTo(pCurrent));
	    }
	}
	
	var positionDeltaAngle = (this.position === "up" ? 0 : -2*verticalAngleRadian);
	if(this.cameraMove && this.cameraMove.position) {
	    if(this.cameraMove.ended) {
		this.cameraMove.k -= 0.05;
		if(this.cameraMove.k < 0 ){
		    this.cameraMove.k = 0;
		}
//		this.cameraMove.k = 0;
	    }
	    this.cube3d.node.setRotationFromQuaternion(new THREE.Quaternion());
	    var rx = (this.cameraMove.position.y - this.cameraMove.start.y)*0.01;
	    var ry = (this.cameraMove.position.x - this.cameraMove.start.x)*0.01;
	    if(this.cameraMove.ended) {
		rx += (1-this.cameraMove.k)*(this.cameraMove.target.y - this.cameraMove.position.y)*0.01;
		ry += (1-this.cameraMove.k)*(this.cameraMove.target.x - this.cameraMove.position.x)*0.01;
	    }
	    if(this.position === "up") {
		if(rx > 0) {
		    rx = 0;
		}
		if(rx < -verticalAngleRadian*2) {
		    rx = -verticalAngleRadian*2;
		}
	    } else {
		if(rx < 0) {
		    rx = 0;
		}
		if(rx > verticalAngleRadian*2) {
		    rx = verticalAngleRadian*2;
		}
	    }
//	    if(Math.abs(rx) > Math.abs(ry)) {
		this.cube3d.node.setRotationFromAxisAngle(new THREE.Vector3(1/Math.sqrt(2), 0, -1/Math.sqrt(2)), rx+positionDeltaAngle);
		this.cube3d.node.rotateY(ry);
//	    } else {
//	    }
	    if(this.cameraMove.k === 0 ){
		this.addCommands(this.cameraMove.commands);
		this.cameraMove = null;
//		this.cube3d.node.rotation.set(0,0,0);;
	    }
	} else {
	    this.cube3d.node.setRotationFromAxisAngle(new THREE.Vector3(1/Math.sqrt(2), 0, -1/Math.sqrt(2)), positionDeltaAngle);
	    this.arrowNode.setRotationFromAxisAngle(new THREE.Vector3(1/Math.sqrt(2), 0, -1/Math.sqrt(2)), positionDeltaAngle);
	}

	// this.camera.up = new THREE.Vector3(0, 1, 0);
	// this.camera.lookAt(new THREE.Vector3(0, 0, 0));
	if(this.renderer) {
	    this.renderer.render(this.scene, this.camera);
	}
	this.frameIndex++;
    };

    var louve = 0;
    Scene.prototype.onMouseMove = function(event) {
	var arrow;
	if(this.cameraMove && !this.cameraMove.ended) {
	    this.cameraMove.position = {x: event.clientX, y: event.clientY};
//	    this.cameraMove.position.x = this.cameraMove.start.x;
	    var raycaster = new THREE.Raycaster();
	    var mouse = {};
	    var renderer = this.renderer;
	    var camera = this.camera;
	    var div = renderer.domElement;
	    mouse.x = ( (event.clientX-div.offsetLeft) / div.width ) * 2 - 1;
	    mouse.y = - ( (event.clientY-div.offsetTop) / div.height ) * 2 + 1;

	    raycaster.setFromCamera( mouse, camera );

	    this.cameraMove.currentRaycaster = raycaster;
	    this.cameraMove.k = 1.0;
	    louve++;
	    for(i = 0; i < this.arrows.length; i++) {
		arrow = this.arrows[i];
		arrow.setVisible(false, this.frameIndex);
	    }
	} else {
	    if(!commandRunning) {
		var i = 0;
		// for(i = 0; i < this.arrows.length; i++) {
		//     this.arrows[i].mesh.material = this.arrows[i].mesh.material.arrowMaterial.material;
		// }

		var raycaster = new THREE.Raycaster();
		var mouse = {};
		var renderer = this.renderer;
		var camera = this.camera;
		var div = renderer.domElement;
		mouse.x = ( (event.clientX-div.offsetLeft) / div.width ) * 2 - 1;
		mouse.y = - ( (event.clientY-div.offsetTop) / div.height ) * 2 + 1;

		raycaster.setFromCamera( mouse, camera );

		var intersects = raycaster.intersectObjects( this.cube3d.getMeshes() );
		var tile, normal;
		for(i = 0; i < intersects.length && !normal; i++) {
		    tile = intersects[0].object.mytile;
//		    if(tile.normal.x > 0 || tile.normal.y > 0 || tile.normal.z > 0) {
			normal = tile.normal;
//		    }
		}

		for(i = 0; i < this.arrows.length; i++) {
		    arrow = this.arrows[i];
		    if((arrow.permanent === this.position) || (!arrow.permanent && normal && arrow.normal.x === normal.x && arrow.normal.y === normal.y
					   && arrow.normal.z === normal.z)) {
			arrow.setVisible(true, this.frameIndex);
		    } else {
			arrow.setVisible(false, this.frameIndex);
		    }
		}

		intersects = raycaster.intersectObjects( this.arrowMeshes );
		var arrowsToHighlight = [];
		for(i = 0; i < intersects.length; i++) {
		    if(intersects[i].object.visible) {
//			intersects[i].object.material = intersects[i].object.material.arrowMaterial.materialHL;
			arrowsToHighlight.push(intersects[i].object.myarrow);
			// if(intersects[i].object.twin) {
			//     intersects[i].object.twin.material = intersects[i].object.twin.material.mymat.hl;
			// }
		    }
		}
		for(i=0;i<this.arrows.length;i++) {
		    arrow = this.arrows[i];
		    if(arrowsToHighlight.indexOf(arrow) >= 0) {
			arrow.setHighlight(true, this.frameIndex);
		    } else {
			arrow.setHighlight(false, this.frameIndex);
		    }
		}
	    }
	}
    };
    Scene.prototype.onMouseUp = function(event) {
	event.preventDefault();
	if(this.cameraMove) {
	    if(!this.cameraMove.ended && this.cameraMove.position) {
		this.cameraMove.target = {x: this.cameraMove.start.x,
					 y: this.cameraMove.start.y}; 
	    	var ry = (this.cameraMove.position.y - this.cameraMove.start.y)*0.01;
	    	var rx = (this.cameraMove.position.x - this.cameraMove.start.x)*0.01;
	    	var k = 0;
	    	var delta = rx < 0 ? -Math.PI/2 : Math.PI/2;
	    	this.cameraMove.commands = [ "0" ];
	    	var command = rx < 0 ? "y" : "y'";
	    	for(k = delta / 2; k > -Math.abs(rx) && k < Math.abs(rx); k+= delta) {
	    	    this.cameraMove.commands.push(command);
		    this.cameraMove.target.x += delta/0.01;
	    	}
		if(this.position === "up") {
		    if(ry < -1.33333*verticalAngleRadian) {
			 this.cameraMove.target.y -= 2*verticalAngleRadian/0.01;
			this.cameraMove.start.y -= 2*verticalAngleRadian/0.01;
			this.position = "down";
		    }
		} else {
		    if(ry > 1.33333*verticalAngleRadian) {
			 this.cameraMove.target.y += 2*verticalAngleRadian/0.01;
			this.cameraMove.start.y += 2*verticalAngleRadian/0.01;
			this.position = "up";
		    }
		}
	    	// command = ry < 0 ? "x" : "x'";
		// delta = ry < 0 ? -Math.PI/2 : Math.PI/2
	    	// for(k = delta / 2; k > -Math.abs(ry) && k < Math.abs(ry); k+= delta) {
	    	//     this.cameraMove.commands.push(command);
		//     this.cameraMove.target.y += delta/0.01;
	    	// }
		this.cameraMove.commands.push("1");
		    
	    }
	    this.cameraMove.ended = true;
	    if(!this.cameraMove.position) {
		this.cameraMove = null;
	    }
	}
    };
    Scene.prototype.onMouseLeave = function(event) {
	if(this.cameraMove) {
	    this.cameraMove.ended = true;
	    this.cameraMove.target = this.cameraMove.start;
	}
    };
    Scene.prototype.onMouseDown = function(event) {
	event.preventDefault();
	var raycaster = new THREE.Raycaster();
	var mouse = {};
	var renderer = this.renderer;
	var camera = this.camera;
	var div = renderer.domElement;
	mouse.x = ( (event.clientX-div.offsetLeft) / div.width ) * 2 - 1;
	mouse.y = - ( (event.clientY-div.offsetTop) / div.height ) * 2 + 1;

	raycaster.setFromCamera( mouse, camera );

	var intersects = raycaster.intersectObjects( this.arrowMeshes );
	var command, invert = false, altCommand;
	if ( intersects.length > 0 ) {
	    command = intersects[0].object.myarrow.command;
	    altCommand = intersects[0].object.myarrow.altCommand;
	    altCommand = altCommand || command.toLowerCase();

	    if(true || !intersects[0].object.myarrow.noshift) {
		command = (event.shiftKey || event.which === 2) ? altCommand : command;
	    }
	    if(event.which === 3) {
		invert = true;
	    }
//	    this.commandQueue.push(event.shiftKey ? command.toLowerCase() : command);
	    this.addCommands(Interpreter.parse(command, invert));
	} else {
	    this.cameraMove = { start: {x: event.clientX, y: event.clientY}, changeMode: event.which === 1 };
	    this.mainDirection = new THREE.Vector3(1,1,1);
	    this.mainDirection.normalize();
	    this.cameraMove.originRaycaster = raycaster;
	}
    };
    Scene.prototype.onKeyDown = function(event) {
	var c = event.str.toUpperCase();
	if(c === "X" || c === "Y" || c === "Z") {
	    c = c.toLowerCase();
	}
	if(event.shiftKey) {
	    c+= "'";
	}
	this.commandQueue.push(c);
    };
    Scene.prototype.getHistory = function(forUrl) {
	var str = this.cube3d.history.join("");
	if(forUrl) {
	    return str.replace(/'/g, "p");
	} else {
	    return str;
	}
    };

    return Scene;
});

	// var geometry = new THREE.BoxGeometry( 1, 1, 0.001 );
	// var material = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
	// this.scene.add( cube );
