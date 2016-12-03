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
    require(["scene/Scene", "cube/Interpreter"], function(Scene, Interpreter) {
	var title = QueryString["title"];
	if(title) {
	    document.title = "MyJCube - " + unescape(title);
	}
	var initialPosition = QueryString["init"];
	function toFormula(str) {
	    if(str) {
		return str.replace(/p/g, "'");
	    }
	    return null;
	}
	var formula = toFormula(QueryString["formula"]);
	var fill = QueryString["fill"];
	var scramble = false;
	var scene = new Scene(640, 480, initialPosition, fill, scramble);
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
    });
}
