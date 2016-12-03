define("cube/CubeTexCoords", [], function() {
    "use strict";
    var defaultUvBounds = { origin: {x: 0, y: 0},
				 u: {x: 1.0/3.0, y: 0},
				 v: {x: 0, y: 1.0/3.0}
			       };
    var CubeTexCoords = function() {
	this.uvFrames = {};
    };
    CubeTexCoords.prototype.addFace = function(face, uvFrame) {
	this.uvFrames[face] = uvFrame;
    };
    CubeTexCoords.prototype.getFaceUvBounds = function(face) {
	return this.uvFrames[face] || defaultUvBounds;
    };
    return CubeTexCoords;
});
