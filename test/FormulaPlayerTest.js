window.start = function() {
    "use strict";
    require.config({
	paths: {
            "cube": "../src/cube",
            "scene": "../src/scene"
	}
    });
    require(['scene/FormulaPlayer'], function(FormulaPlayer) {
	var player = new FormulaPlayer(400, 400, 25);
	document.body.appendChild(player.domElement);
	player.startAnimationLoop();
	window.player = player;
    });
};
