define("cube/FillStringBuilder", [], function() {
    var faceList = [ "front", "back", "up", "down", "right",
		     "left" ];
    var faceToColor = { front: "g", back: "b", left: "r", right: "o",
			up: "y", down: "w" };
    var FillStringBuilder = function() {
	this.colors = [];
	var i, j;
	for(i = 0; i < faceList.length; i++) {
	    for(j = 0; j < 9; j++) {
		this.colors.push(faceToColor[faceList[i]]);
	    }
	}
    };
    FillStringBuilder.prototype.fillFace = function(face, color) {
	var index = faceList.indexOf(face);
	var i;
	for(i = 0; i < 9; i++) {
	    this.colors[index*9 + i] = color;
	}
    };
    FillStringBuilder.prototype.getString = function() {
	return this.colors.join("");
    };
    return FillStringBuilder;
});
