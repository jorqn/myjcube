define("scene/myjCube", ["scene/Scene", "cube/Interpreter", "utils/MyQueryString", "scene/IsoCubeTexCoords"], function(Scene, Interpreter, MyQueryString, IsoCubeTexCoords) {
    return function myjCube() {
	var title = MyQueryString.getValue("title");
	if(title) {
	    document.title = "MyJCube - " + unescape(title);
	}
	var initialPosition = MyQueryString.getValue("init");
	function toFormula(str) {
	    if(str) {
		return str.replace(/p/g, "'");
	    }
	    return null;
	}
	var formula = toFormula(MyQueryString.getValue("formula"));
	var fill = MyQueryString.getValue("fill");
	var scramble = MyQueryString.getValue("scramble");
	var canvas = document.createElement('canvas');
	canvas.width = 1024;
	canvas.height = 1024;
	var context = canvas.getContext("2d");
//	context.fillStyle = "#ffffaa";
	context.fillStyle = "white";
	context.fillRect(0,0,canvas.width,canvas.height);
	context.fillStyle = "#000000";
	context.font = "40px Georgia";
	context.fillText("Hello World!", 450, 500);
	var tex = new THREE.Texture(canvas);
	tex.needsUpdate = true;
	var materials = {
//	    down: new THREE.MeshPhongMaterial({color: 0xffffff}),
	    // down: new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('img/green.jpg')}),
	    // back: new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('img/green.jpg')}),
	    // left: new THREE.MeshPhongMaterial({map: THREE.ImageUtils.loadTexture('img/green.jpg')}),
	    up: new THREE.MeshPhongMaterial({map: tex, color: new THREE.Color("#ffffaa")}),
	    right: new THREE.MeshPhongMaterial({map: tex, color: new THREE.Color("#ffddaa")}),
	    front: new THREE.MeshPhongMaterial({map: tex, color: new THREE.Color("#aaffaa")}),
	    back: new THREE.MeshPhongMaterial({color: 0x0000ff}),
//	    front: new THREE.MeshPhongMaterial({color: 0x00ff00}),
	    left: new THREE.MeshPhongMaterial({color: 0xff0000}),
	    down: new THREE.MeshPhongMaterial({color: 0xffffff}),
//	    right: new THREE.MeshPhongMaterial({color: 0xff8800})
	};

	window.onpopstate = function(event) {
	}

	var scene = new Scene(800, 800, initialPosition, fill, scramble, materials, IsoCubeTexCoords);
	if(scene.domElement) {
	    document.body.appendChild(scene.domElement);
	    document.body.appendChild(document.createElement("br"));
	    scene.startAnimationLoop();
	    scene.domElement.addEventListener("mousemove", function(event) {
		scene.onMouseMove(event);
	    });
	    scene.domElement.addEventListener("mousedown", function(event) {
		scene.onMouseDown(event);
	    });
	    scene.domElement.addEventListener("mouseup", function(event) {
		scene.onMouseUp(event);
	    });
	    scene.domElement.addEventListener("mouseleave", function(event) {
		scene.onMouseLeave(event);
	    });
	    scene.domElement.addEventListener("keypress", function(event) {
		event.str = String.fromCharCode(event.charCode).toLowerCase();
		scene.onKeyDown(event);
	    });
	    
	    if(formula) {
		var commandQueueForward = Interpreter.parse(formula, false);
		var commandQueueBackward = Interpreter.parse(formula, true).reverse();
		var commandQueueIndex = 0;

		var fb = window.document.createElement("button");
		var fd = window.document.createElement("button");
		var backwardButton = document.createElement("button");
		var forwardButton = document.createElement("button");

		var ft = window.document.createElement("a");
		fb.innerHTML = "Hide formula";
		fb.addEventListener("click", function() {
		    ft.hidden = !ft.hidden;
		    fd.hidden = ft.hidden;
		    forwardButton.hidden = ft.hidden;
		    backwardButton.hidden = ft.hidden;
		    if(!ft.hidden) {
			fb.innerHTML = "Hide formula";
			window.history.back();
		    } else {
			fb.innerHTML = "Show formula";
			var args = "";
			if(initialPosition) {
			    args = "?init=" + initialPosition;
			}
			window.history.pushState("object or string", "Title", window.location.pathname+args);
			//			window.location = "";
		    }
		});
		fd.innerHTML = "Play";
		fd.addEventListener("click", function() {
		    //		    scene.playFormula(formula);
		    scene.addCommands(commandQueueForward.slice(commandQueueIndex, commandQueueForward.length));
		    commandQueueIndex = commandQueueForward.length;
		});

		ft.innerHTML = "&nbsp;<b>" + formula + "</b>&nbsp;"

		forwardButton.innerHTML = "Forward";
		forwardButton.addEventListener("click", function() {
		    if(commandQueueIndex < commandQueueForward.length) {
			scene.addCommands([commandQueueForward[commandQueueIndex]]);
			commandQueueIndex++;
		    }
		});
		backwardButton.innerHTML = "Backward";
		backwardButton.addEventListener("click", function() {
		    if(commandQueueIndex > 0) {
			commandQueueIndex--;
			scene.addCommands([commandQueueBackward[commandQueueIndex]]);
		    }
		});
		document.body.appendChild(fb);
		document.body.appendChild(ft);
		document.body.appendChild(fd);
		document.body.appendChild(backwardButton);
		document.body.appendChild(forwardButton);		
	    }
	    document.body.appendChild(document.createElement("br"));
	    var button = document.createElement("button");
	    button.innerHTML = "Clone in new tab";
	    document.body.appendChild(button);
	    var formulaInput = document.createElement("input");
	    formulaInput.width = 200;
	    document.body.appendChild(formulaInput);
	    var titleInput = document.createElement("input");
	    titleInput.width = 200;
	    var noTitle = "No title";
	    titleInput.value = "No title";
	    titleInput.addEventListener("click", function() {
		if(titleInput.value === noTitle) {
		    titleInput.value = "";
		}
	    });
	    document.body.appendChild(titleInput);
	    button.addEventListener("click", function () {
		// var init = scene.getHistory(true);
		var formulaArg = "";
		if(formulaInput.value) {
		    formulaArg = "&formula="+formulaInput.value.replace(/'/g, "p");
		}
		var titleArg = "";
		if(titleInput.value && titleInput.value !== noTitle) {
		    titleArg = "&title=" + escape(titleInput.value);
		}
		// window.open(window.location.origin + window.location.pathname + "?init="+init+formulaArg);
		var newFill = scene.cube3d.cube.getFillString();
		window.open(window.location.origin + window.location.pathname + "?fill="+newFill+formulaArg+titleArg);
		
	    });
	}
    }
});
