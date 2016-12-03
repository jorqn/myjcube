define("scene/ArrowMaterial", [], function() {
    "use strict";
    var ArrowMaterial = function(parameters) {
	this.map = parameters.map;
        this.material = new THREE.MeshBasicMaterial({map: this.map, transparent: true, opacity: 0.5, depthTest: false, side: THREE.DoubleSide});
        this.material0= new THREE.MeshBasicMaterial({map: this.map, transparent: true, opacity: 0.25, depthTest: false, side: THREE.DoubleSide});
        this.materialHL = new THREE.MeshBasicMaterial({map: this.map, transparent: true, depthTest: false, side: THREE.DoubleSide});
        this.materialHL0 = new THREE.MeshBasicMaterial({map: this.map, transparent: true, opacity: 0.75, depthTest: false, side: THREE.DoubleSide});

	var _this = this;
	function buildMaterial(opacity) {
	    return new THREE.MeshBasicMaterial({map: _this.map, transparent: true, opacity: opacity, depthTest: false, side: THREE.DoubleSide});
	}
	    
	this.materials = {
	    'normal': [
	    ],
	    'highlight': [
	    ],
	};
	this.material.arrowMaterial = this;
	this.materialHL.arrowMaterial = this;

	var i=0;
	this.delay = 10;
	for(i = 0; i < this.delay; i++) {
	    this.materials.normal.push(buildMaterial(0.5*((i+1)/this.delay)));
	    this.materials.highlight.push(buildMaterial(0.5+0.5*((i+1)/this.delay)));
	}
    };
    ArrowMaterial.prototype.isVisible = function (arrow, frameIndex) {
	if(frameIndex - arrow.frameIndex < this.delay) {
	    return true;
	}
	return arrow.visible;
    };

    ArrowMaterial.prototype.getM = function (id, k) {
	return this.materials[id][k];
    };

    ArrowMaterial.prototype.getMaterial = function (arrow, frameIndex) {
	var delta = Math.min(Math.floor((frameIndex - arrow.frameIndex)), this.delay - 1);
	if(!arrow.visible) {
	    return this.getM('normal', this.delay - delta - 1);
	}
	if(arrow.visible) {
	    if(arrow.highlight) {
		return this.getM('highlight', delta);
	    }
	    if(arrow.oldHighlight) {
		return this.getM('highlight', this.delay - delta - 1);
	    }

	    return this.getM('normal', delta);

	    // if(delta < this.delay) {
	    // 	if(arrow.highlight || arrow.oldHighlight) {
	    // 	    return this.materialHL0; 
	    // 	} else {
	    // 	    return this.material0;
	    // 	}
	    // } else {
	    // 	if(arrow.highlight) { 
	    // 	    return this.materialHL;
	    // 	} else {
	    // 	    return this.material;
	    // 	}
	    // }
	}
    };

    return ArrowMaterial;
});
