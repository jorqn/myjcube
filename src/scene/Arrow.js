define('scene/Arrow', [], function() {
    var Arrow = function(params) {
	this.material = params.material;
	var position = params.position;
	var normal = params.normal;
	this.normal = normal;
	this.command = params.command;
	this.altCommand = params.altCommand;
	var size = params.size;
	// this.geometry = new THREE.BoxGeometry(size*(this.normal.x === 0 ? 1 : 0.001),
	// 				     size*(this.normal.y === 0 ? 1 : 0.001),
	// 				     size*(this.normal.z === 0 ? 1 : 0.001));
	this.geometry = new THREE.PlaneBufferGeometry(size*0.35,size*0.35,1,1);
	this.mesh = new THREE.Mesh( this.geometry, null );
	this.mesh.material = this.material.material;
	this.mesh.myarrow = this;
	this.permanent = params.permanent;
	this.visible = false;
	this.noshift = params.noshift;
	// if(this.normal.x === 1) {
	//     this.mesh.rotateY(Math.PI/2);
	// }
	var target = new THREE.Vector3(normal.x, normal.y, normal.z);
	var src = new THREE.Vector3(0, 0, 1.0);
	var quat = new THREE.Quaternion();
	quat.setFromUnitVectors(src, target);

	this.mesh.rotateZ(Math.PI*params.angle/180.0);
	var nono = new THREE.Object3D;
	nono.add(this.mesh);
//	var coeff = this.normal.z < 0 ? -1 : 1;
//	this.invertX = this.normal.z < 0;

/*	if(this.normal.z < 0) {
//	    this.mesh.rotateY(Math.PI);
	    this.mesh.rotateZ(Math.PI/2.0);
//	    this.mesh.rotateZ(Math.PI);
	} else {*/
	    nono.setRotationFromQuaternion(quat);
//	}

	var subnode = new THREE.Object3D();
	subnode.position.set(size * (position.x+0.51*normal.x),
			       size * (position.y+0.51*normal.y),
			       size * (position.z+0.51*normal.z));
	
	subnode.add(nono);
	this.node = new THREE.Object3D();
	this.node.add(subnode);
	params.node.add(this.node);
	this.highlight = false;
	this.frameIndex = 0;
	this.oldHighlight = false;
	this.oldVisible = false;
    };
    Arrow.prototype.setVisible = function(visible, frameIndex) {
	if(visible !== this.visible) {
	    this.frameIndex = frameIndex;
	    this.oldHighlight = false;
 	}
	this.visible = visible;
    };
    Arrow.prototype.setHighlight = function(highlight, frameIndex) {
	if(highlight !== this.highlight) {
	    this.frameIndex = frameIndex;
	    this.oldHighlight = this.highlight;
	}
	this.highlight = highlight;
    };
    Arrow.prototype.updateMesh = function(frameIndex) {
	this.mesh.visible = this.material.isVisible(this, frameIndex);
	this.mesh.material = this.material.getMaterial(this, frameIndex);
    }
    return Arrow;
});
