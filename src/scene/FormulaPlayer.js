define('scene/FormulaPlayer', ['cube/Cube', 'cube/Cube3D', 'cube/Interpreter', 'scene/ArrowMesh', 'scene/PlayBackButtonFactory'],
       function(Cube, Cube3D, Interpreter, ArrowMesh, PlayBackButtonFactory) {
    "use strict";
    var FormulaPlayer = function(width, height) {
	this.width = width;
	this.height = height;
	this.commandQueue = [];
	this.scene = new THREE.Scene();
	var fact = 0.012;
	this.camera = new THREE.OrthographicCamera(fact*-480/2.0, fact*480/2.0, fact*480/2.0, fact*-480/2.0, -100, 100.0);
//	this.camera = new THREE.PerspectiveCamera(-20,-20, 20, 20, 0.1, 50);
	this.camera.position.set(4,4,4);
//	this.camera.position.set(0,0,4);
	this.camera.up = new THREE.Vector3(0, 1, 0);
	this.camera.lookAt(new THREE.Vector3(0, 0, 0));
	this.renderer = new THREE.WebGLRenderer({antialias: true});
	this.renderer.setSize(this.width, this.height);
	this.domElement = this.renderer.domElement;

	var directionalLight = new THREE.DirectionalLight( 0xffffff, 1.0 );
	directionalLight.position.set( 1, 1, 0.5 );
	this.scene.add( directionalLight );

	var directionalLight2 = new THREE.DirectionalLight( 0xffffff, 0.5 );
	directionalLight2.position.set( -1, -1, 0.5 );
	this.scene.add( directionalLight2 );

	this.cube3d = new Cube3D({size: 1.0, cube: new Cube()/*, cubeTexCoords: cubeTexCoords, materials: cubeMate*/    });
	this.scene.add(this.cube3d.node);
	this.renderer.setClearColor(new THREE.Color(1,1,1), 1);

	var arrowTest = new ArrowMesh({
	    start: new THREE.Vector3(0, 3.1, 3.1),
	    end: new THREE.Vector3(3.1, 0, 3.1),
	    normal: new THREE.Vector3(0, 0, 1),
	    headSize: 0.3,
	    width: 0.15
	});
	var mesh = new THREE.Mesh(arrowTest, new THREE.MeshBasicMaterial({color: "black", side: THREE.DoubleSide}));
//	this.scene.add(mesh);

	var factory = new PlayBackButtonFactory(1);
	var buttonsMaterial = new THREE.MeshBasicMaterial({color: "black", side: THREE.DoubleSide});
	var play = factory.createPlayButton();
	play.material = buttonsMaterial;
//	this.scene.add(play);
	var pause = factory.createPauseButton();
	pause.material = buttonsMaterial;
//	this.scene.add(pause);
    };

    // FormulaPlayer.prototype.playCommands = function(commands) {
    // 	var _this = this;
    // 	function goCommand(index) {
    // 	    _this.cube3d.startCommand(commands[index], function() {
    // 		if(index < commands.length) {
    // 		    goCommand(index+1);
    // 		}
    // 	    });
    // 	}
    // 	goCommand(0);
    // }

    FormulaPlayer.prototype.addCommands = function(commands) {
	this.commandQueue = this.commandQueue.concat(commands);
    };

    FormulaPlayer.prototype.playFormula = function(str) {
	var tab = Interpreter.parse(str);
	this.addCommands(tab);
    };

    FormulaPlayer.prototype.startAnimationLoop = function() {
	this.animate();
    };
    var commandRunning = false;
    FormulaPlayer.prototype.animate = function() {
	requestAnimationFrame(this.animate.bind(this));
	var _this = this;
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
	this.renderer.render(this.scene, this.camera);
    };
	
    return FormulaPlayer;
});
