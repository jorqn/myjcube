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
	    fillString:"rrr_r__r_____o_ooo_g_______wwwwwwwwwggg_g____bbb_b____",
	    arrows: [
		{
		    start: { x: 0, y: 1},
		    end: {x: 1, y: 0},
		    normal: { x: 0, y:0, z: 1}
		}
	    ]
	    
	});
	var div = document.createElement('div');
	div.style.position = "absolute";
	div.style.left = "100px";
	div.style.top = "50px";
	document.body.appendChild(div);
	div.appendChild(player.domElement);
//	document.body.appendChild(player.domElement);
	player.startAnimationLoop();
	window.player = player;
    });
};
