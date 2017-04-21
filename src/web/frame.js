(function() {
    "use strict";
    var link = document.createElement("link");
    link.setAttribute("rel", "icon");
    link.setAttribute("href", "../img/myjcube_icon.png");
    document.head.appendChild(link);
    var topDiv = document.createElement("div");
    topDiv.className = "topPane";
    document.body.appendChild(topDiv);
    var leftDiv = document.createElement("div");
    leftDiv.className = "leftPane";
    document.body.appendChild(leftDiv);
    var cubeDiv = document.createElement("div");
    cubeDiv.className = "cubePane";
    document.body.appendChild(cubeDiv);

    var useHidePane = false;
    var hidePane = useHidePane ? document.createElement("div") : null;
    window.addOnLoadedRef = function() {
	if(!window.onLoadedCount) {
	    window.onLoadedCount = 0;
	}
	window.onLoadedCount++;
    }

    window.showPage = function() {
	if(!hidePane) return;
	var myHidePane = hidePane;
	hidePane = null;
	myHidePane.style.opacity = 1;
	var interval = setInterval(function () {
	    myHidePane.style.opacity -= 0.25;
	    if(myHidePane.style.opacity <= 0) {
		document.body.removeChild(myHidePane);
		clearInterval(interval);
	    }
	}, 50);
    }

    if(hidePane) {
	hidePane.className = "hidePane";
	document.body.appendChild(hidePane);
	setTimeout(function() {
	    window.showPage();
	}, 3000);
    }
    
    window.releaseOnLoadedRef = function() {
//	return;
	if(!hidePane) return;
	window.onLoadedCount--;
	if(window.onLoadedCount === 0) {
	    window.showPage();
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
    function createOnMenuClickCb(id) {
	return function() {
		window.location = "./" + id + ".html";
	};
    }
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
	    element.onclick = createOnMenuClickCb(child.id);
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
    myJCube.style.top = "-20px";
    myJCube.onload = window.releaseOnLoadedRef;
    myJCube.style.cursor = "pointer";
    myJCube.onclick = function () {
	document.location = './index.html';
    }
    
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
    var bgDiv = document.createElement('div');
    bgDiv.className = "bgPane";
    document.body.appendChild(bgDiv);
    function onResize() {
//	console.log(document.body.clientWidth);
	var mainPane = document.getElementsByClassName('mainPane')[0];
	leftDiv.style.height = document.body.clientHeight - 200;
	topDiv.style.width = document.body.clientWidth - 200;
	if(mainPane) {
	    mainPane.style.width = document.body.clientWidth - 200;
	}
	leftDiv.style.height = document.body.clientHeight - 200;
	bgDiv.style.height = document.body.clientHeight - 200;
	var margin = Math.floor((document.body.clientWidth - (topDiv.clientWidth + 200))/2);
	margin = Math.max(margin, 0);
	var margin2 = margin + 200;
	mainPane && (mainPane.style.left = margin2+"px");
	topDiv.style.left = margin2 + "px";
	bgDiv.style.left = margin2 + "px";
	cubeDiv.style.left = margin + "px";
	leftDiv.style.left = margin + "px";
	
    }
    window.addEventListener('resize', onResize, false);
    window.onload = onResize;
    window.doResize = onResize;
    window.insertTitle = function () {
	var title = path[path.length-1].title;
	document.write("<h1 class='title'>"+title+"</h1>");
    }
    document.title = 'myJCube - ' + path[path.length-1].title;
    
    onResize();
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
	// var materials = {
	//     white: new THREE.MeshBasicMaterial({color: 0xfe84cd}),
	//     yellow: new THREE.MeshBasicMaterial({color: 0xfe84cd}),
	//     blue: new THREE.MeshBasicMaterial({color: 0xfe84cd}),
	//     green: new THREE.MeshBasicMaterial({color: 0xfe84cd}),
	//     red: new THREE.MeshBasicMaterial({color: 0xfe84cd}),
	//     orange: new THREE.MeshBasicMaterial({color: 0xfe84cd}),
	//     gray: new THREE.MeshBasicMaterial({color: 0xfe84cd}),
	//     space: new THREE.MeshBasicMaterial({color: 0xfe84cd})
	// };
	var scene = new Scene({
	    width: 200,
	    height: 200,
	    cubeMaterials: materials,
	    backgroundColor: "#ffffff",
	    scramble: true
	});
	scene.domElement.style.position = "relative";
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
	scene.domElement.addEventListener("contextmenu", function(event) {
	    event.preventDefault();
	    return false;
	});
	window.releaseOnLoadedRef();
    });
})();
