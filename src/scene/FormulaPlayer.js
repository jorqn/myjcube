define('scene/FormulaPlayer', ['cube/Cube', 'cube/Cube3D', 'cube/Interpreter2', 'scene/ArrowMesh', 'scene/PlayBackButtonFactory'/*, 'cube/FillStringBuilder'*/],
function(Cube, Cube3D, Interpreter, ArrowMesh, PlayBackButtonFactory/*, FillStringBuilder*/) {
    "use strict";
    var FormulaPlayer = function(parameters) {
	this.width = parameters.width || 400;
	this.height = parameters.height || 400;
	this.materials = parameters.materials;
	this.buttonsSize = parameters.buttonsSize || 25;
	this.formula = parameters.formula;
	this.noButtons = parameters.noButtons;
	this.commandQueue = [];
	this.name = parameters.name;
	this.stopAnimation = true;
	this.startCube = new Cube({empty:true});
//	this.startCube.fillFromString("____r_rrr____o_ooo_________wwwwwwwww____g_ggg____b_bbb");
	//	this.startCube.fillFromString("rrr_r________o_ooo_________wwwwwwwwwggg_g____bbb_b____");
	if(parameters.fillString) {
	    this.startCube.fillFromString(parameters.fillString);
	} else {
	    this.startCube.fill();
	}
//	this.startCube.fill();
	// var stringBuilder = new FillStringBuilder();
	// stringBuilder.fillFace("up", "_");
	// this.startCube.fillFromString(stringBuilder.getString());
	this.scene = new THREE.Scene();
	this.root = new THREE.Object3D();
	this.scene.add(this.root);
	this.cameraMove = null;
	this.pause = true;
	this.ended = false;
	this.single = 0;
	var fact = 0.012*0.9;
	this.camera = new THREE.OrthographicCamera(fact*-480/2.0,
			fact*480/2.0, fact*480/2.0, fact*-480/2.0, -100, 100.0);
//	this.camera = new THREE.PerspectiveCamera(-20,-20, 20, 20, 0.1, 50);
	this.camera.position.set(4,4,4);
//	this.camera.position.set(0,0,4);
	this.camera.up = new THREE.Vector3(0, 1, 0);
	this.camera.lookAt(new THREE.Vector3(0, 0, 0));
	this.renderer = new THREE.WebGLRenderer({antialias: true,
						 backgroundColor: "blue"});
	this.renderer.setSize(this.width, this.height);
	this.domElement = this.renderer.domElement;

	var directionalLight = new THREE.DirectionalLight( 0xffffff, 1.0 );
	directionalLight.position.set( 1, 1, 0.5 );
	this.scene.add( directionalLight );

	var directionalLight2 = new THREE.DirectionalLight( 0xffffff, 0.5 );
	directionalLight2.position.set( -1, -1, 0.5 );
	this.scene.add( directionalLight2 );

	this.cube3d = null;
	this.initCube();
	this.renderer.setClearColor(new THREE.Color(1,1,1), 1);
//	this.renderer.setClearColor(new THREE.Color(0.8, 0.8, 0.8), 1);

	this.arrows = [];
	this.setArrows(parameters.arrows);
	// var arrowTest = new ArrowMesh({
	//     start: new THREE.Vector3(0, 3.1, 3.1),
	//     end: new THREE.Vector3(3.1, 0, 3.1),
	//     normal: new THREE.Vector3(0, 0, 1),
	//     headSize: 0.3,
	//     width: 0.15
	// });
	// var mesh = new THREE.Mesh(arrowTest, new THREE.MeshBasicMaterial({
	//     color: "black", side: THREE.DoubleSide}));
	//	this.scene.add(mesh);

	this.camera.updateMatrix();
	var i2d = new THREE.Vector3(1,0,0);
	i2d.applyQuaternion(this.camera.quaternion);
	var j2d = new THREE.Vector3(0,1,0);
	j2d.applyQuaternion(this.camera.quaternion);
	

	var camera = this.camera;
	var bSize = this.buttonsSize * (camera.top - camera.bottom)/this.height;
//	play.scale.set(bSize, bSize, bSize);
	var factory = new PlayBackButtonFactory(bSize);
	var buttonsMaterial = new THREE.MeshBasicMaterial({
	    color: "black", side: THREE.DoubleSide, transparent: true, opacity: 0});
	this.buttonsMaterial = buttonsMaterial;
	this.buttons = [];
	var _this = this;
	function set2d(button, X, action) {
	    button.material = buttonsMaterial;
	    var size = _this.buttonsSize/_this.height;
	    var x = X * size;
	    var y = 0.5*size*1.2;
	    button.quaternion.copy(_this.camera.quaternion);
	    y = camera.top - y*(camera.top -camera.bottom);
	    x = camera.left + x *(camera.right - camera.left);
	    button.position.set(3+x*i2d.x - y*j2d.x,
			 3+x*i2d.y - y*j2d.y,
			 3+x*i2d.z - y*j2d.z);
	    _this.scene.add(button);
	    button.geometry.computeBoundingBox();
	    _this.buttons.push({
		mesh: button,
		x: _this.buttonsSize * X+_this.height*button.geometry.boundingBox.min.x/(camera.top - camera.bottom),
		y: _this.height - _this.buttonsSize*1.2,
		width: _this.height*(button.geometry.boundingBox.max.x
				     -button.geometry.boundingBox.min.x)
		    / (camera.top - camera.bottom),
		height: _this.buttonsSize,
		action: action
	    });
	}
	if(!this.noButtons) {
	    var play = factory.createPlayButton();
	    set2d(play, 4.75, "onPlayButton");
	    this.playButton = play;
	    var pause = factory.createPauseButton();
	    set2d(pause, 4.75, "onPauseButton");
	    this.pauseButton = pause;
	    pause.visible = false;

	    var restart = factory.createRestartButton();
	    set2d(restart, 1, "onRestartButton");
	    this.restartButton = restart;

	    var next = factory.createNextButton();
	    set2d(next, 8, "onNextButton");
	    this.nextButton = next;
	}
	var canvas = this.domElement;
	canvas.addEventListener("mousemove",this.onMouseMove.bind(this));
	canvas.addEventListener("mousedown",this.onMouseDown.bind(this));
	canvas.addEventListener("mouseup",this.onMouseUp.bind(this));
	canvas.addEventListener("mouseleave",this.onMouseLeave.bind(this));
	if(this.formula) {
	    this.playFormula(this.formula);
	}
	
//	this.scene.add(pause);
    };

    FormulaPlayer.prototype.createArrowMesh = function(start, end, normal) {
	var k = 1.52;
	var arrowGeometry = new ArrowMesh({
	    start: new THREE.Vector3(1*(start.x||0) + k*normal.x,
				     1*(start.y||0) + k*normal.y,
				     1*(start.z||0) + k*normal.z),
	    end: new THREE.Vector3(1*(end.x||0) + k*normal.x,
				   1*(end.y||0)+ k*normal.y,
				   1*(end.z||0)+ k*normal.z),
	    normal: new THREE.Vector3(normal.x,
				      normal.y,
				      normal.z),
	    headSize: 0.3,
	    width: 0.15
	});
	var arrowMesh = new THREE.Mesh(arrowGeometry,
				       new THREE.MeshBasicMaterial({
					   color: "black",
					   side: THREE.DoubleSide}));
	return arrowMesh;
    }
    FormulaPlayer.prototype.setArrows = function(arrows, type) {
	type = type || "single";
	var invert = type === "inverse";
	var dbl = type === "double";
	var i;
	for(i = 0; i < this.arrows.length; i++) {
	    this.root.remove(this.arrows[i]);
	}
	this.arrows = [];
	if(arrows) {
	    for(i = 0; i < arrows.length; i++) {
		var arrow = arrows[i];
		var start = invert ? arrow.end : arrow.start, end = invert ? arrow.start : arrow.end, normal = arrow.normal;
		var middle = {x: (start.x+end.x)/2, y: (start.y+end.y)/2, z: (start.z+end.z)/2};

		var ext = dbl ? [[start, middle], [middle, end]] : [[start, end]];
		var j;
		var arrowMesh;
		for(j = 0; j < ext.length; j++) {
		    arrowMesh = this.createArrowMesh(ext[j][0], ext[j][1], normal);
		    this.root.add(arrowMesh);
		    this.arrows.push(arrowMesh)
		}
	    }
	}
	
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

    FormulaPlayer.prototype.initCube = function() {
	if(this.cube3d) {
	    this.root.remove(this.cube3d.node);
	}
	this.cube3d = new Cube3D({size: 1.0, cube: this.startCube, materials: this.materials});
	this.root.add(this.cube3d.node);
    };

    FormulaPlayer.prototype.computeMousePosition = function(event) {
	var mouse = {};
	var div = this.domElement;
	var mouse = {
	    x: event.pageX,
	    y: event.pageY
	};
	while(div) {
	    mouse.x -= div.offsetLeft;
	    mouse.y -= div.offsetTop;
	    div = div.offsetParent;
	}
	// mouse.x = (event.clientX-div.offsetLeft);
	// mouse.y = (event.clientY-div.offsetTop);
	// mouse.x = (event.pageX - div.offsetLeft);
	// mouse.y = (event.pageY - div.offsetTop);
	return mouse;
    };

    FormulaPlayer.prototype.getButtonFromMousePosition = function(mouse) {
	var i, button;
	for(i = 0; i < this.buttons.length; i++) {
	    button = this.buttons[i];
	    if(button.mesh.visible && mouse.x >= button.x && mouse.y >= button.y
	       && mouse.x < button.x + button.width
	       && mouse.y < button.y + button.height) {
		return button;
	    }
	}
	return null;
    };

    FormulaPlayer.prototype.setHighlight = function(button, highlight) {
	if(button && button.highlight !== highlight) {
	    // var scale = highlight ? 1.1 : 1;
	    // button.mesh.scale.set(scale, scale, scale);
	    if(button.token) {
	    	clearInterval(button.token);
	    	button.token = null;
	    }
	    if(!button.counter && button.counter !== 0) {
	    	button.counter = 0;
	    }
	    var startCounter = button.counter;
	    function updateScale() {
	    	var scale;
	    	if(highlight) {
	    	    button.counter++;
	    	} else {
	    	    button.counter--;
	    	}
	    	if(button.counter > 2) {
	    	    button.counter = 2;
	    	    clearInterval(button.token);
	    	}
	    	if(button.counter < 0) {
	    	    button.counter = 0;
	    	    clearInterval(button.token);
	    	}
	    	scale = 1+0.1*button.counter;
	    	button.mesh.scale.set(scale, scale, scale);
	    }
	    button.token = setInterval(updateScale, 50);
	    updateScale();
	}
    }

    FormulaPlayer.prototype.showButtons = function() {
	if(!this.oldButtonsVisibility) {
	    this.oldButtonsVisibility = true;
	    var material = this.buttonsMaterial;
	    clearInterval(this.mouseInsideToken);
	    var _this = this;
	    this.mouseInsideToken = setInterval(function() {
		material.opacity += 0.33333333333333333;
		if(material.opacity > 1) {
		    material.opacity = 1;
		    clearInterval(_this.mouseInsideToken);
		}
	    }, 50);
	}
    };

    FormulaPlayer.prototype.hideButtons = function() {
	if(this.oldButtonsVisibility) {
	    this.oldButtonsVisibility = false;
	    var material = this.buttonsMaterial;
	    var _this = this;
	    clearInterval(this.mouseInsideToken);
	    this.mouseInsideToken = setInterval(function() {
		material.opacity -= 0.33333333333333333;
		if(material.opacity < 0) {
		    material.opacity = 0;
		    clearInterval(_this.mouseInsideToken);
		}
	    }, 50);
	}
    };

    FormulaPlayer.prototype.onMouseMove = function(event) {
	this.startAnimationLoop();
	this.mouseInside = true;
	if(this.cameraMove && !this.cameraMove.ended) {
//	    this.hideButtons();
	    this.cameraMove.position = {x: event.clientX, y: event.clientY};
	} else {
//	    this.showButtons();
	    var mouse = this.computeMousePosition(event);
	    var button = this.getButtonFromMousePosition(mouse);
	    if(this.highlightButton !== button) {
		this.setHighlight(this.highlightButton, false);
		this.setHighlight(button, true);
		this.highlightButton = button;
	    }
	}
    };

    FormulaPlayer.prototype.onMouseDown = function(event) {
	this.startAnimationLoop();
	var mouse = this.computeMousePosition(event);
	var button = this.getButtonFromMousePosition(mouse);
	this.currentButton = button;
	if(!button && !this.cameraMove) {
	    this.cameraMove = {
		start: {
		    x: event.clientX,
		    y: event.clientY
		},
		k: 1,
		ended: false
	    };
//	    this.hideButtons();
	}
    };

    FormulaPlayer.prototype.onMouseUp = function(event) {
	this.startAnimationLoop();
	if(this.cameraMove) {
	    if(this.cameraMove.position) {
		this.cameraMove.ended = true;
	    } else {
		this.cameraMove = null;
	    }
	} else {
	    var mouse = this.computeMousePosition(event);
	    var button = this.getButtonFromMousePosition(mouse);
	    if(button && button === this.currentButton) {
		this[button.action]();
	    }
	    this.currentButton = null;
	}
    };

    FormulaPlayer.prototype.onMouseLeave = function(event) {
	this.mouseInside = false;
//	this.hideButtons();
	this.curentButton = null;
	if(this.highlightButton) {
	    this.setHighlight(this.highlightButton, false);
	    this.highlightButton = null;
	}
	if(this.cameraMove) {
	    this.cameraMove.ended = true;
	}
    };

    FormulaPlayer.prototype.onPlayButton = function() {
	this.pause = false;
	this.playButton.visible = false;
	this.pauseButton.visible = true;
	this.nextButton.visible = false;
	this.restartButton.visible = false;
	this.pause = false;
    };

    FormulaPlayer.prototype.onPauseButton = function() {
	this.pause = true;
	if(!this.noButtons) {
	    this.playButton.visible = this.ended ? false : true;
	    this.pauseButton.visible = false;
	    this.nextButton.visible = this.ended ? false : true;
	    this.restartButton.visible = true;
	}
    };

    FormulaPlayer.prototype.onRestartButton = function() {
	this.initCube();
	this.setArrowsVisibility(true);
	this.commandQueue = [];
	this.formula && this.playFormula(this.formula);
	this.onPauseButton();
    };

    FormulaPlayer.prototype.onNextButton = function() {
	this.pause = false;
	this.single++;;
    };

    FormulaPlayer.prototype.setArrowsVisibility = function(visible) {
	var i;
	for(i = 0; i < this.arrows.length; i++) {
	    this.arrows[i].visible = visible;
	}
    };

    FormulaPlayer.prototype.addCommands = function(commands) {
	this.commandQueue = this.commandQueue.concat(commands);
    };

    FormulaPlayer.prototype.playFormula = function(str, play) {
	this.formula = str;
	this.ended = false;
	this.highlightFormulaSpan(-1);
	var tab = Interpreter.parse(str);
	this.addCommands(tab);
	if(play) {
	    this.pause = false;
	}
    };

    FormulaPlayer.prototype.startAnimationLoop = function() {
	if(this.stopAnimation) {
	    this.stopAnimation = false;
	    this.animate();
	}
	if(this.stopAnimationTimeout) {
	    clearTimeout(this.stopAnimationTimeout);
	}
	var _this = this;
	this.stopAnimationTimeout = setTimeout(function() {
	    _this.stopAnimation = true;
	    console.log("stop animation FormulaPlayer");
	}, 5000);
    };
    FormulaPlayer.prototype.highlightFormulaSpan = function(index) {
	if(!this.name) return;
	var id = this.name + index, elem;
	if(this.lastFormulaSpan && this.lastFormulaSpan.id !== id) {
	    this.lastFormulaSpan.className = "formulaOff";
	}
	if(index >= 0) {
	    elem = document.getElementById(id);
	    elem && (elem.className = "formulaOn");
	    this.lastFormulaSpan = elem;
	}
    };
    var commandRunning = false;
    FormulaPlayer.prototype.animate = function() {
	if(!this.stopAnimation) {
	    requestAnimationFrame(this.animate.bind(this));
	}
	var _this = this, command;
	do {
	    this.cube3d.continueCommand(2.0*1000.0/60, function onCommandEnd() {
		// if(_this.cube3d.cube.isSolved()) {
		//     alert('solved!');
		// }
		if(_this.commandQueue.length === 0) {
		    _this.onPauseButton();
		    commandRunning = false;
		    _this.ended = true;
		    if(_this.noButtons) {
			_this.setArrowsVisibility(true);
		    }
		} else {
		    if(!_this.pause) {
			_this.setArrowsVisibility(false);
			if(_this.single) {
			    _this.single--;
			    _this.pause = _this.single ? false : true;
			}
			_this.startAnimationLoop();
			command = _this.commandQueue.shift();
			_this.highlightFormulaSpan(command.index);
			_this.cube3d.startCommand(command.command, true);
			commandRunning = true;
		    } else {
			commandRunning = false;
		    }
		}
	    });
	} while(this.cube3d.instantMode && this.commandQueue.length);

	if(this.cameraMove && this.cameraMove.position) {
	    if(this.cameraMove.ended) {
		this.cameraMove.k -= 0.05;
		if(this.cameraMove.k < 0) {
		    this.cameraMove.k = 0;
		}
	    }
	    var rx = (this.cameraMove.position.y - this.cameraMove.start.y)*0.02;
	    var ry = (this.cameraMove.position.x - this.cameraMove.start.x)*0.02;
	    rx *= this.cameraMove.k;
	    ry *= this.cameraMove.k;
	    this.root.setRotationFromAxisAngle(new THREE.Vector3(1/Math.sqrt(2), 0, -1/Math.sqrt(2)), rx);
	    this.root.rotateY(ry);
	    if(this.cameraMove.k === 0) {
		this.cameraMove = null;
	    }
	}
	if(this.mouseInside && !this.cameraMove) {
	    this.showButtons();
	} else {
	    this.hideButtons();
	}
	this.renderer.render(this.scene, this.camera);
    };
    FormulaPlayer.prototype.setFillString = function(fillString) {
	this.startCube = new Cube({empty: true});
	if(fillString) {
	    this.startCube.fillFromString(fillString);
	} else {
	    this.startCube.fill();
	}
    };
	
    return FormulaPlayer;
});
