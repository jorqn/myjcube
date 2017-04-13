window.start = function() {
    "use strict";
    require.config({
	paths: {
            "cube": "../src/cube",
            "scene": "../src/scene"
	}
    });
    require(['scene/FormulaPlayer'], function(FormulaPlayer) {
	var player = new FormulaPlayer({
	    width: 400,
	    height: 400,
	    buttonsSize: 25,
	    formula: "URU'R'd'L'ULy'",
	    fillString: "rrr_r__r_____o_ooo_g_______wwwwwwwwwggg_g____bbb_b____"
	});
	document.body.appendChild(player.domElement);
	player.startAnimationLoop();
	window.player = player;
    });
};
