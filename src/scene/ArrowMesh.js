define('scene/ArrowMesh', [], function() {
    "use strict";
    var ArrowMesh = function(params) {
	THREE.BufferGeometry.call(this);
	this.start = params.start;
	this.end = params.end;
	this.width = params.width;
	this.normal = params.normal;
	this.headSize = params.headSize;
	var start = this.start;

	var u = new THREE.Vector3();
	u.subVectors(this.end, this.start);
	var length = u.length();
	u.divideScalar(length);

	var v = new THREE.Vector3();
	v.crossVectors(this.normal, u);

	var headSize = this.headSize;
	var width = this.width;
	var headEdgeSize = headSize / (Math.sqrt(3)/2);
	var vertices = new Float32Array(7*3);
	var normals = new Float32Array(7*3);
	var halfWidth = width / 2;
	var points = [ {u: 0, v: halfWidth},
		       {u: length - headSize, v: halfWidth},
		       {u: length - headSize, v: headEdgeSize / 2},
		       {u: length, v: 0},
		       {u: length - headSize, v: -headEdgeSize / 2},
		       {u: length - headSize, v: -halfWidth},
		       {u: 0, v: -halfWidth} ];
	
	var i, point;
	for(i = 0; i < points.length; i++) {
	    point = points[i];
	    vertices[3*i + 0] = start.x + point.u * u.x + point.v * v.x;
	    vertices[3*i + 1] = start.y + point.u * u.y + point.v * v.y;
	    vertices[3*i + 2] = start.z + point.u * u.z + point.v * v.z;

	    normals[3*i + 0] = this.normal.x;
	    normals[3*i + 1] = this.normal.y;
	    normals[3*i + 2] = this.normal.z;
	}

	var indices = new Uint16Array(5*3);
	var k = 0;
	indices[k++] = 0;
	indices[k++] = 1;
	indices[k++] = 6;

	indices[k++] = 6;
	indices[k++] = 1;
	indices[k++] = 5;

	indices[k++] = 1;
	indices[k++] = 2;
	indices[k++] = 3;

	indices[k++] = 1;
	indices[k++] = 3;
	indices[k++] = 5;

	indices[k++] = 5;
	indices[k++] = 3;
	indices[k++] = 4;
	this.addAttribute( 'index', new THREE.BufferAttribute( indices, 1 ) );
	this.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	this.addAttribute( 'normal', new THREE.BufferAttribute( normals, 3 ) );
    }
    ArrowMesh.prototype = Object.create( THREE.BufferGeometry.prototype );
    ArrowMesh.prototype.constructor = THREE.ArrowMesh;
    return ArrowMesh;
});
