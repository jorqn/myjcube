define("cube/Tile3D", [], function() {
    "use strict";

    THREE.MyPlaneBufferGeometry = function ( width, height, widthSegments, heightSegments,  uvBounds ) {

	THREE.BufferGeometry.call( this );

	this.type = 'MyPlaneBufferGeometry';

	this.parameters = {
	    width: width,
	    height: height,
	    widthSegments: widthSegments,
	    heightSegments: heightSegments
	};

	var width_half = width / 2;
	var height_half = height / 2;

	var gridX = widthSegments || 1;
	var gridY = heightSegments || 1;

	var gridX1 = gridX + 1;
	var gridY1 = gridY + 1;

	var segment_width = width / gridX;
	var segment_height = height / gridY;

	var vertices = new Float32Array( gridX1 * gridY1 * 3 );
	var normals = new Float32Array( gridX1 * gridY1 * 3 );
	var uvs = new Float32Array( gridX1 * gridY1 * 2 );

	var offset = 0;
	var offset2 = 0;
	var xt, yt;

	for ( var iy = 0; iy < gridY1; iy ++ ) {

	    var y = iy * segment_height - height_half;

	    for ( var ix = 0; ix < gridX1; ix ++ ) {

		var x = ix * segment_width - width_half;

		vertices[ offset     ] = x;
		vertices[ offset + 1 ] = - y;

		normals[ offset + 2 ] = 1;
		xt = ix / gridX;
		yt = (1 - ( iy / gridY ));
		uvs[ offset2     ] = uvBounds.origin.x + uvBounds.u.x*xt + uvBounds.v.x*yt ;
		uvs[ offset2 + 1 ] = uvBounds.origin.y + uvBounds.u.y*xt + uvBounds.v.y*yt;

		offset += 3;
		offset2 += 2;

	    }

	}

	offset = 0;

	var indices = new ( ( vertices.length / 3 ) > 65535 ? Uint32Array : Uint16Array )( gridX * gridY * 6 );

	for ( var iy = 0; iy < gridY; iy ++ ) {

	    for ( var ix = 0; ix < gridX; ix ++ ) {

		var a = ix + gridX1 * iy;
		var b = ix + gridX1 * ( iy + 1 );
		var c = ( ix + 1 ) + gridX1 * ( iy + 1 );
		var d = ( ix + 1 ) + gridX1 * iy;

		indices[ offset     ] = a;
		indices[ offset + 1 ] = b;
		indices[ offset + 2 ] = d;

		indices[ offset + 3 ] = b;
		indices[ offset + 4 ] = c;
		indices[ offset + 5 ] = d;

		offset += 6;

	    }

	}

	this.addAttribute( 'index', new THREE.BufferAttribute( indices, 1 ) );
	this.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	this.addAttribute( 'normal', new THREE.BufferAttribute( normals, 3 ) );
	this.addAttribute( 'uv', new THREE.BufferAttribute( uvs, 2 ) );

    };

    THREE.MyPlaneBufferGeometry.prototype = Object.create( THREE.BufferGeometry.prototype );
    THREE.MyPlaneBufferGeometry.prototype.constructor = THREE.MyPlaneBufferGeometry;

    var Tile3D = function(position, normal, uvs, cube3d, uvBounds) {
	this.position = {x: position[0], y: position[1], z: position[2]};
	this.normal = {x: normal[0], y: normal[1], z: normal[2]};
	this.cube3d = cube3d;
	var size = cube3d.size;
	// this.geometry = new THREE.BoxGeometry(size*(this.normal.x === 0 ? 1 : 0.001),
	// 				     size*(this.normal.y === 0 ? 1 : 0.001),
	// 				     size*(this.normal.z === 0 ? 1 : 0.001));

	
	// if(uvs) {
	//     uvBounds.origin = {x: uvs[0]*1.0/3.0, y: uvs[1]*1.0/3.0};
	//     this.hasUV = true;
	// }
	var newUvBounds = { origin: {x: uvBounds.origin.x + uvs[0]*uvBounds.u.x + uvs[1]*uvBounds.v.x,
				     y: uvBounds.origin.y + uvs[0]*uvBounds.u.y + uvs[1]*uvBounds.v.y},
			    u: uvBounds.u,
			    v: uvBounds.v};
	this.backGeometry = new THREE.MyPlaneBufferGeometry(size,size,1,1, newUvBounds);
	this.stickerGeometry = new THREE.MyPlaneBufferGeometry(size*0.95,size*0.95,1,1, newUvBounds);
	this.mesh = new THREE.Mesh( this.stickerGeometry, null );
	this.mesh.position.set(0,0,size*0.01);
	this.backMesh = new THREE.Mesh( this.backGeometry, null );
	this.backMesh.material = new THREE.MeshBasicMaterial({ color: "#dddddd", side: THREE.DoubleSide });
	this.mesh.mytile = this;
	// if(this.normal.x === 1) {
	//     this.mesh.rotateY(Math.PI/2);
	// }
	var target = new THREE.Vector3(this.normal.x, this.normal.y, this.normal.z);
	var src = new THREE.Vector3(0, 0, 1.0);
	var quat = new THREE.Quaternion();
	quat.setFromUnitVectors(src, target);

	var coeff = this.normal.z < 0 ? -1 : 1;
	this.invertX = this.normal.z < 0;

/*	if(this.normal.z < 0) {
//	    this.mesh.rotateY(Math.PI);
	    this.mesh.rotateZ(Math.PI/2.0);
//	    this.mesh.rotateZ(Math.PI);
	} else {*/
//	this.mesh.rotation.set(0,0,Math.PI/2.0);
	this.subnode0 = new THREE.Object3D();
	    this.subnode0.setRotationFromQuaternion(quat);
	this.subnode0.add(this.mesh);
	this.subnode0.add(this.backMesh);
//	}

	var subnode = new THREE.Object3D();
//	subnode.rotation.set(Math.PI/2.0,0,0);
	subnode.position.set(size * (coeff * this.position.x+0.5*this.normal.x),
			       size * (this.position.y+0.5*this.normal.y),
			       size * (this.position.z+0.5*this.normal.z));
	
	subnode.add(this.subnode0);
	this.node = new THREE.Object3D();
	this.node.add(subnode);
    };

    Tile3D.prototype.setTile = function(tile) {
	if(tile.mesh) {
	    if(tile.mesh !== this.mesh) {
		this.subnode0.remove(this.mesh);
		this.subnode0.add(tile.mesh);
		this.mesh = tile.mesh;
		this.mesh.mytile = this;
	    }
	} else {
	    tile.mesh = this.mesh;
	    if(tile.id) {
		this.mesh.material = this.cube3d.materials[tile.id];
	    } else {
		this.mesh.material = new THREE.MeshBasicMaterial({ color: tile.color });
	    }
	}
	if(this.normal.z < -0.5) {
	    this.mesh.rotation.set(0,0,tile.rotation*Math.PI/180.0 + Math.PI);
	} else {
	    this.mesh.rotation.set(0,0,tile.rotation*Math.PI/180.0);
	}
	// var colors = null;
	// if(tile.y === 1) {
	//     colors = [0xff0000, 0xff7777, 0xffdddd];
	// } else if(tile.y === 0) {
	//     colors = [0x00ff00, 0x77ff77, 0xddffdd];
	// } else {
	//     colors = [0x0000ff, 0x7777ff, 0xddddff];
	// }
	// this.mesh.material = new THREE.MeshPhongMaterial({color: (tile.x === 1 ? colors[0] : (tile.x === 0 ? colors[1] : colors[2]))});
    };
    Tile3D.prototype.normalEquals = function(normal, dual) {
	if(normal[0] === this.normal.x && normal[1] === this.normal.y
	  && normal[2] === this.normal.z) {
	    return true;
	}
	if(!this.invertX) {
	    if(normal[0] > 0 && this.position.x > 0) {
		return true;
	    }
	    if(normal[0] < 0 && this.position.x < 0) {
		return true;
	    }
	} else {
	    if(normal[0] > 0 && this.position.x < 0) {
		return true;
	    }
	    if(normal[0] < 0 && this.position.x > 0) {
		return true;
	    }
	}
	if(normal[1] > 0 && this.position.y > 0) {
	    return true;
	}
	if(normal[1] < 0 && this.position.y < 0) {
	    return true;
	}
	if(normal[2] > 0 && this.position.z > 0) {
	    return true;
	}
	if(normal[2] < 0 && this.position.z < 0) {
	    return true;
	}
	if(dual) {
	    if(normal[0] !== 0 && this.position.x === 0) {
		return true;
	    }
	    if(normal[1] !== 0 && this.position.y === 0) {
		return true;
	    }
	    if(normal[2] !== 0 && this.position.z === 0) {
		return true;
	    }
	}
	return false;
    }
    return Tile3D;
});
