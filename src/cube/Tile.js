define("cube/Tile", [], function() {
    "use strict";
    var Tile = function(params) {
	this.id = params.id;
	this.x = params.x;
	this.y = params.y;
	this.rotation = params.rotation;
	this.mesh = params.mesh;
    };
    Tile.prototype.clone = function() {
	return new Tile(this);
    };
    Tile.prototype.rotate = function(angle) {
	this.rotation = (this.rotation + angle) % 360;
	// if(this.rotation > 180) {
	//     this.rotation -= 360;
	// } else if(this.rotation < -179) {
	//     this.rotation += 360;
	// }
	if(this.rotation < 0) {
	    this.rotation += 360;
	}
    }
    return Tile;
});
