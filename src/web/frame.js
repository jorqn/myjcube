(function() {
    "use strict";
    var link = document.createElement("link");
    link.setAttribute("rel", "icon");
    link.setAttribute("href", "../img/myjcube_icon.png");
    document.head.appendChild(link);
    var topDiv = document.createElement("div");
    topDiv.className = "topPane";
    document.body.appendChild(topDiv);

    // var dotCom = document.createElement("div");
    // dotCom.style.position = 'absolute';
    // dotCom.innerHTML = ".com";
    // dotCom.style.fontSize = "40px";
    // dotCom.style.fontWeight = "bold";
    // dotCom.style.color = "white";
    // dotCom.style.top = "145px";
    // dotCom.style.left = "575px";
    // dotCom.style.cursor = "pointer";
    // topDiv.appendChild(dotCom);

    var topRightDiv = document.createElement("div");
    topRightDiv.className = "topRightPane";
    topDiv.appendChild(topRightDiv);
    
    var topRightDiv2 = document.createElement("div");
    topRightDiv2.className = "topRightPane2";
    topDiv.appendChild(topRightDiv2);
    
    var topRightDiv3 = document.createElement("div");
    topRightDiv3.className = "topRightPane3";
    topDiv.appendChild(topRightDiv3);

    // var contact = document.createElement("div");
    // contact.innerHTML = "contact";
    // contact.style.position = "absolute";
    // contact.style.left = "0px";
    // contact.style.top = "100px";
    // topRightDiv.appendChild(contact);
    
    
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
	    element.innerHTML= "<a class='vanilla' href='./" + child.id + ".html'>"+child.shortTitle+"</a>";
	    leftDiv.appendChild(element);
	    //	    element.onclick = createOnMenuClickCb(child.id);
//	    element.href = "./"+child.id+".html";
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

    var languageSelect = document.createElement('select');
    languageSelect.name = 'language';
    languageSelect.className = 'leftPone';
    var french = document.createElement('option');
    french.value = 'fr';
    french.textContent = 'Français';
    french.className = 'leftPone';
    var english = document.createElement('option');
    english.value = 'en';
    english.textContent = 'English';
    english.className = 'leftPone';
    var languageMap = {
	fr: french,
	en: english
    };

    languageSelect.appendChild(french);
    languageSelect.appendChild(english);

    var contact = document.createElement('p');
    contact.innerHTML = "Contact";
    contact.className = "leftPaneMenu0";
    contact.style.fontStyle = "italic";
    leftDiv.appendChild(contact);
    var displayContactDiv = null;
    var imgNum = 4;
    var imgs = [], clickCounter = 0;
    contact.addEventListener('click', function() {
	if(!displayContactDiv) {
	    var rect = contact.getBoundingClientRect();
	    var parentRect = leftDiv.getBoundingClientRect();
	    var top = rect.top - parentRect.top + 20;
	    var left = rect.left - parentRect.left + 14;
	    displayContactDiv = document.createElement('div');
	    leftDiv.appendChild(displayContactDiv);
	    displayContactDiv.style.position = "absolute";
	    displayContactDiv.style.left = left + "px";
	    displayContactDiv.style.top = top + "px";
	}

	if(clickCounter < imgNum) {
	    clickCounter++;
	    var img = document.createElement('img');
	    img.src = "../img/contact"+clickCounter+".png";
	    img.style.position = "absolute";
	    img.style.left = "0px";
	    img.style.top = "0px";
	    displayContactDiv.appendChild(img);
	    
	} else {
	    while(displayContactDiv.firstChild) {
		displayContactDiv.removeChild(displayContactDiv.firstChild);
	    }
	    clickCounter = 0;
	}
	// var img1 = document.createElement('img');
	// img1.src = "../img/contact1.png";
	// img1.style.position = "absolute";
	// img1.style.left = "0px";
	// img1.style.top = "0px";
	// displayContactDiv.appendChild(img1);
	// var img2 = document.createElement('img');
	// img2.src = "../img/contact2.png";
	// img2.style.position = "absolute";
	// img2.style.left = "0px";
	// img2.style.top = "0px";
	// displayContactDiv.appendChild(img2);
    });

    // languageSelect.style.position = "absolute";
    // languageSelect.style.top = '10px';
    // languageSelect.style.left = '795px';

    languageSelect.value =  window.menuData.lang;

    languageSelect.addEventListener('change', function () {
	window.location = '../'+languageSelect.value+'/'+ pageId + '.html';
    });

    leftDiv.appendChild(document.createElement('br'));
    leftDiv.appendChild(languageSelect);

    
    
    window.rootDir = '../';
    window.addOnLoadedRef();
    var bgDiv = document.createElement('div');
    bgDiv.className = "bgPane";
    document.body.appendChild(bgDiv);
    function onResize() {
	//	console.log(document.body.clientWidth);
	
	var mainPane = document.getElementsByClassName('mainPane')[0];
	var winWidth = window.innerWidth;
	var winHeight = window.innerHeight;
	leftDiv.style.height = winHeight - 200;
	topDiv.style.width = winWidth - 200;
	if(mainPane) {
	    mainPane.style.width = document.body.clientWidth - 200;
	    mainPane.style.visibility = 'visible';
	}
	bgDiv.style.width = winWidth - 200;
	leftDiv.style.height = Math.max(mainPane ? mainPane.clientHeight : 0, winHeight - 200);
	bgDiv.style.height = winHeight - 200;
	var margin = Math.floor((winWidth - (topDiv.clientWidth + 200))/2);
	margin = Math.max(margin, 0);
	var margin2 = margin + 200;
	mainPane && (mainPane.style.left = margin2+"px");
	topDiv.style.left = margin2 + "px";
	bgDiv.style.left = margin2 + "px";
	cubeDiv.style.left = margin + "px";
	leftDiv.style.left = margin + "px";
	if(mainPane) {
	    console.log(mainPane.style.left);
	}
	
    }
    window.addEventListener('resize', onResize, false);
    window.addEventListener('load', function () {
	onResize();
	if(window.onStart) {
	    window.onStart();
	}
    });
    window.doResize = onResize;
    window.insertTitle = function () {
	var title = path[path.length-1].title;
	document.write("<h1 class='title'>"+title+"</h1>");
    }
    document.title = window.menuData.title + " - " + path[path.length-1].title;

    var formulaPlayers = [];
    // window.insertFormulaPlayer0 = function(parameters) {
    // 	//	var name, fillString, width, height, buttonsSize, formula
    // 	var style = parameters.style ? ' style="' + parameters.style + '"': "";
    // 	document.write("<div id='"+parameters.name+"'" + style +"></div>");
    // 	formulaPlayers.push({ name: parameters.name, parameters: parameters });
    // }
    window.insertFormulaPlayer = function(parameters) {
	if(!parameters.name) {
	    parameters.name = 'formulaPlayer#'+formulaPlayers.length;
	}
	var displayFormula = parameters.formula && !parameters.hideFormula;
	//	var name, fillString, width, height, buttonsSize, formula
	if(displayFormula) {
	    document.write('<div style="width:'+parameters.width+'">');
	}
	var style = parameters.style ? ' style="' + parameters.style + '"': "";
	document.write("<div id='"+parameters.name+"'" + style +"></div>");
	formulaPlayers.push({ name: parameters.name, parameters: parameters });
	var formula = parameters.formula;
	if(displayFormula && formula) {
	    var translation = window.stdToShataro(formula, false, ",");
	    var phonems = translation.result.split(",");
	    var i;
	    document.write("<p align='center'>");
	    for(i = 0; i < phonems.length; i++) {
		document.write("<span class='formulaOff' id='" + parameters.name + i + "'>"+phonems[i]+"</span>");
	    }
	    document.write("</p>");
	}
	if(displayFormula) {
	    document.write('</div>');
	}
    }
    window.getFormulaPlayer = function(name) {
	var i;
	for(i = 0; i < formulaPlayers.length; i++) {
	    if(formulaPlayers[i].name === name) {
		return formulaPlayers[i].player;
	    }
	}
    }
    window.playFormula = function(name, formula) {
	window.getFormulaPlayer(name).playFormula(formula, true);
    }
    onResize();
    require(['scene/Scene', 'scene/FormulaPlayer', 'utils/MyQueryString'],  function(Scene, FormulaPlayer, MyQueryString) {
	function getMaterials() {
	    return {
	    	white: new THREE.MeshBasicMaterial({color: "#666666"}),
	    	yellow: new THREE.MeshBasicMaterial({color: 0xfe84cd}),
	    	blue: new THREE.MeshBasicMaterial({color: 0x55bbf4}),
	    	green: new THREE.MeshBasicMaterial({color: 0xb1eb00}),
	    	red: new THREE.MeshBasicMaterial({color: 0xfe452c}),
	    	orange: new THREE.MeshBasicMaterial({color: 0xffab01}),
	    	gray: new THREE.MeshBasicMaterial({color: 0xdddddd}),
	    	space: new THREE.MeshBasicMaterial({color: "white"})
	    };
	    // return {
	    // 	white: new THREE.MeshBasicMaterial({color: "white"}),
	    // 	yellow: new THREE.MeshBasicMaterial({color: 0xfe84cd}),
	    // 	blue: new THREE.MeshBasicMaterial({color: 0x55bbf4}),
	    // 	green: new THREE.MeshBasicMaterial({color: 0xb1eb00}),
	    // 	red: new THREE.MeshBasicMaterial({color: 0xfe452c}),
	    // 	orange: new THREE.MeshBasicMaterial({color: 0xffab01}),
	    // 	gray: new THREE.MeshBasicMaterial({color: 0xdddddd}),
	    // 	space: new THREE.MeshBasicMaterial({color: "black"})
	    // };
	}
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
	MyQueryString.addFromCookie('myjcube');
	var fillString = MyQueryString.getValue('fill');
	var scene = new Scene({
	    width: 200,
	    height: 200,
	    cubeMaterials: getMaterials(),
	    backgroundColor: "#ffffff",
	    scramble: fillString ? false : true,
	    fill: fillString || undefined,
	    onCommandCompletedCB: updateCubeCookie
	});

	function updateCubeCookie() {
	    var fillString = scene.cube3d.cube.getFillString();
	    MyQueryString.setValue('fill', fillString);
	    MyQueryString.saveToCookie('myjcube', 60, ['fill']);
	}
	if(!fillString) {
	    updateCubeCookie();
	}
	scene.domElement.style.position = "relative";
	scene.domElement.style.left = "0px";
	scene.domElement.style.top = "0px";
	scene.domElement.style.cursor = "pointer";
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

	var i, div, player;
	for(i = 0; i < formulaPlayers.length; i++) {
	    div = document.getElementById(formulaPlayers[i].name);
	    formulaPlayers[i].parameters.materials = getMaterials();
	    player = new FormulaPlayer(formulaPlayers[i].parameters);
	    formulaPlayers[i].div = div;
	    formulaPlayers[i].player = player;
	    player.domElement.style.cursor = "pointer";
	    div.appendChild(player.domElement);
	    player.startAnimationLoop();
	}
	window.releaseOnLoadedRef();
	onResize();
    });

    var translateTable = [
	{ std: "RUR'", shataro: "SHA", combo: true },
	{ std: "RU'R'", shataro: "SHU", combo: true },
	{ std: "R'UR", shataro: "SHO", combo: true },
	{ std: "UR'U'", shataro: "SHI", combo: true },
	{ std: "R'", shataro: "RO" },
	{ std: "L'", shataro: "LO" },
	{ std: "U'", shataro: "TO" },
	{ std: "D'", shataro: "DO" },
	{ std: "B'", shataro: "BO" },
	{ std: "F'", shataro: "FO" },
	{ std: "r'", shataro: "REO" },
	{ std: "l'", shataro: "LEO" },
	{ std: "u'", shataro: "TEO" },
	{ std: "d'", shataro: "DEO" },
	{ std: "b'", shataro: "BEO" },
	{ std: "f'", shataro: "FEO" },
	{ std: "x'", shataro: "MO" },
	{ std: "y'", shataro: "NO" },
	{ std: "z'", shataro: "PO" },
	{ std: "R2", shataro: "RI" },
	{ std: "L2", shataro: "LI" },
	{ std: "U2", shataro: "TI" },
	{ std: "D2", shataro: "DI" },
	{ std: "B2", shataro: "BI" },
	{ std: "F2", shataro: "FI" },
	{ std: "r2", shataro: "REI" },
	{ std: "l2", shataro: "LEI" },
	{ std: "u2", shataro: "TEI" },
	{ std: "d2", shataro: "DEI" },
	{ std: "b2", shataro: "BEI" },
	{ std: "f2", shataro: "FEI" },
	{ std: "x2", shataro: "MI" },
	{ std: "y2", shataro: "NI" },
	{ std: "z2", shataro: "PI" },
	{ std: "R", shataro: "RA" },
	{ std: "L", shataro: "LA" },
	{ std: "U", shataro: "TA" },
	{ std: "D", shataro: "DA" },
	{ std: "B", shataro: "BA" },
	{ std: "F", shataro: "FA" },
	{ std: "r", shataro: "REA" },
	{ std: "l", shataro: "LEA" },
	{ std: "u", shataro: "TEA" },
	{ std: "d", shataro: "DEA" },
	{ std: "b", shataro: "BEA" },
	{ std: "f", shataro: "FEA" },
	{ std: "x", shataro: "MA" },
	{ std: "y", shataro: "NA" },
	{ std: "z", shataro: "PA" },
    ];

    function xToY(x, y, input, withCombo, separator) {
	var str = input || "";
	str = str.replace(/\s/g, '');
	var result = "", i, found, entry;
	while(str.length) {
	    found = false;
	    for(i = 0; i < translateTable.length && !found; i++) {
		entry = translateTable[i];
		if((withCombo || !entry.combo) && str.indexOf(entry[x]) === 0) {
		    if(result.length && separator) {
			result += separator;
		    }
		    result += entry[y];
		    found = true;
		    str = str.substr(entry[x].length);
		}
	    }
	    if(!found) {
		return { complete: false, result: result };
	    }
	}
	return { complete: true, result: result };
    }

    window.stdToShataro = function(std, withCombo, separator) {
	return xToY('std', 'shataro', std, withCombo, separator);
    }
    window.shataroToStd = function(shataro, separator) {
	return xToY('shataro', 'std', shataro.toUpperCase(), true, separator);
    }

})();
