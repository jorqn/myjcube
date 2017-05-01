(function() {
    "use strict";
    require(['oll/OLLConfigDisplay', 'oll/OLLConfigs'], function(OLLConfigDisplay, OLLConfigs) {
	var layout = window.layout;
	var caseSize = 150, caseHStep = caseSize+20, caseVStep = caseSize + 40;
	var div = document.getElementById('configsContainer');
	var configDisplay = new OLLConfigDisplay({size: caseSize, color: "#fe84cd", noColor: "white",/* "#dddddd",*/
						  outlineColor: "black"});
	var y = 0;
	var i = 0, id, divCase, object, coords, canvas, solution, config;
	for(i = 0; i < layout.length; i++) {
	    var j = 0;
	    for(j = 0; j < layout[i].length; j++) {
		id = layout[i][j];
		if(id !== null) {
		    coords = { x: caseHStep*j, y: y};
		    canvas = configDisplay.createCanvas(id, coords.x, coords.y, 0/*, true*/);
		    div.appendChild(canvas);
		    solution = document.createElement('div');
		    config = OLLConfigs.getConfig(id);
		    solution.innerHTML = config.getShataroSolution();
		    solution.style.textAlign = "center";
		    solution.style.position = "absolute";
		    solution.style.maxWidth = caseSize + "px";
		    solution.style.width = caseSize+"px";
		    solution.style.left = coords.x + "px";
		    solution.style.wordWrap = "break-word";
		    solution.style.top = (coords.y+ caseSize-Math.floor(caseSize/7)) + "px";
		    div.appendChild(solution);
		}
	    }
	    if(layout[i].length) {
		y += caseVStep;
	    } else {
		y += Math.floor(caseVStep/3);
	    }
	}
	div.style.width = (3*caseHStep)+"px";
	div.style.height = (y+caseVStep)+"px";
	div.style.position = "relative";
	div.style.left = "0px";
	div.style.top = "0px";
	window.doResize();
    });
})();
