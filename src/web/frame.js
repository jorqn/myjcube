(function() {
    "use strict";
    var topDiv = document.createElement("div");
    topDiv.className = "topPane";
    document.body.appendChild(topDiv);
    var leftDiv = document.createElement("div");
    leftDiv.className = "leftPane";
    document.body.appendChild(leftDiv);
    var cubeDiv = document.createElement("div");
    cubeDiv.className = "cubePane";
    document.body.appendChild(cubeDiv);

    var hidePane = document.createElement("div");
    hidePane.className = "hidePane";
    document.body.appendChild(hidePane);
    
    window.addOnLoadedRef = function() {
	if(!window.onLoadedCount) {
	    window.onLoadedCount = 0;
	}
	window.onLoadedCount++;
    }

    window.releaseOnLoadedRef = function() {
	window.onLoadedCount--;
	if(window.onLoadedCount === 0) {
	    hidePane.style.opacity = 1;
	    var interval = setInterval(function () {
		hidePane.style.opacity -= 0.25;
		if(hidePane.style.opacity <= 0) {
		    document.body.removeChild(hidePane);
		    clearInterval(interval);
		}
	    }, 50);
	}
    }

    var pageId = window.pageId;
    function buildSubPath(item) {
	if(item.id === pageId) {
	    return [item];
	}
	var i, path, node;
	for(i = 0; item.children && i < item.children.length; i++) {
	    node = item.children[i];
	    path = buildSubPath(node);
	    if(path) {
		return [item].concat(path);
	    }
	}
	return null;
    }
    var path = buildSubPath(window.menuData.navigationRoot);
    function displayLevel(index) {
	var i;
	var node = path[index], element, child;
	for(i = 0; node && node.children && i < node.children.length; i++) {
	    child = node.children[i];
	    element = document.createElement("p");
	    element.className = "leftPaneMenu"+index
		+ (child.id === pageId ? " leftPaneMenuHighlight"+index : "");
	    element.innerText = child.shortTitle;
	    leftDiv.appendChild(element);
	    if(child === path[index+1]) {
		displayLevel(index+1);
	    }
	}
    }
    var space = document.createElement("p");
    space.innerHTML = "&nbsp;";
    space.className = "leftPaneMenu0";
    leftDiv.appendChild(space);
    displayLevel(0);
    var myJCube = document.createElement('img');
    window.addOnLoadedRef();
    myJCube.src = '../img/myJCube.png';
    myJCube.style.position = "relative";
    myJCube.style.left = "20px";
    myJCube.style.top = "0px";
    myJCube.onload = window.releaseOnLoadedRef;
    topDiv.appendChild(myJCube);
    require.config({
	paths: {
            "cube": "../src/cube",
            "scene": "../src/scene",
            "oll": "../src/oll",
            "utils": "../src/utils"
	}
    });
    window.rootDir = '../';
    window.addOnLoadedRef();
    require(['scene/Scene'],  function(Scene) {
	var materials = {
	    white: new THREE.MeshBasicMaterial({color: "#666666"}),
	    yellow: new THREE.MeshBasicMaterial({color: 0xfe84cd}),
	    blue: new THREE.MeshBasicMaterial({color: 0x55bbf4}),
	    green: new THREE.MeshBasicMaterial({color: 0xb1eb00}),
	    red: new THREE.MeshBasicMaterial({color: 0xfe452c}),
	    orange: new THREE.MeshBasicMaterial({color: 0xffab01}),
	    gray: new THREE.MeshBasicMaterial({color: "gray"}),
	    space: new THREE.MeshBasicMaterial({color: "white"})
	};
	var scene = new Scene(200, 200, undefined, undefined, undefined, materials);
	scene.domElement.style.position = "absolute";
	scene.domElement.style.left = "0px";
	scene.domElement.style.top = "0px";
	cubeDiv.appendChild(scene.domElement);
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
	window.releaseOnLoadedRef();
    });
})();
