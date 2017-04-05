define('scene/PlayBackButtonFactory', function() {
    "use strict";
    var PlayBackButtonFactory = function(size) {
	this.size = size;
	this.step = size*1.1;
	this.width = size / 5;
    };

    PlayBackButtonFactory.prototype.createPlayButton = function() {
	var geometry = new THREE.BufferGeometry();
	var vertices = new Float32Array(3*3);
	var normals = new Float32Array(3*3);
	var i;
	for(i = 0; i < 3; i++) {
	    vertices[3*i] = this.size * Math.cos(i * 2*Math.PI/3);
	    vertices[3*i+1] = this.size * Math.sin(i * 2*Math.PI/3);
	    vertices[3*i+2] = 0;

	    normals[3*i] = 0;
	    normals[3*i+1] = 0;
	    normals[3*i+2] = 1;
	}
	var indices = new Uint16Array(1*3);
	var k = 0;
	indices[k++] = 0;
	indices[k++] = 1;
	indices[k++] = 2;

	geometry.addAttribute( 'index', new THREE.BufferAttribute( indices, 1 ) );
	geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	geometry.addAttribute( 'normal', new THREE.BufferAttribute( normals, 3 ) );

	var mesh = new THREE.Mesh(geometry, null);
	return mesh;
    }
    PlayBackButtonFactory.prototype.createRestartButton = function() {
	var geometry = new THREE.BufferGeometry();
	var vertices = new Float32Array(2*3*3+4*3);
	var normals = new Float32Array(2*3*3+4*3);
	var i;
	for(i = 0; i < 3; i++) {
	    vertices[3*i] = this.size * Math.cos(Math.PI + i * 2*Math.PI/3);
	    vertices[3*i+1] = this.size * Math.sin(Math.PI + i * 2*Math.PI/3);
	    vertices[3*i+2] = 0;

	    normals[3*i] = 0;
	    normals[3*i+1] = 0;
	    normals[3*i+2] = 1;
	}
	var deltax = this.size * 1.5;
	for(i = 3; i < 6; i++) {
	    vertices[3*i] = deltax + this.size * Math.cos(Math.PI + i * 2*Math.PI/3);
	    vertices[3*i+1] = this.size * Math.sin(Math.PI + i * 2*Math.PI/3);
	    vertices[3*i+2] = 0;

	    normals[3*i] = 0;
	    normals[3*i+1] = 0;
	    normals[3*i+2] = 1;
	}
	var cornerx = -this.size-this.width, cornery = this.size * Math.sin(2*Math.PI/3);
	vertices[3*i] = cornerx;
	vertices[3*i+1] = cornery;
	vertices[3*i+2] = 0;
	normals[3*i] = 0;
	normals[3*i+1] = 0;
	normals[3*i+2] = 1;
	i++;
	vertices[3*i] = cornerx+this.width;
	vertices[3*i+1] = cornery;
	vertices[3*i+2] = 0;
	normals[3*i] = 0;
	normals[3*i+1] = 0;
	normals[3*i+2] = 1;
	i++;
	vertices[3*i] = cornerx+this.width;
	vertices[3*i+1] = -cornery;
	vertices[3*i+2] = 0;
	normals[3*i] = 0;
	normals[3*i+1] = 0;
	normals[3*i+2] = 1;
	i++;
	vertices[3*i] = cornerx;
	vertices[3*i+1] = -cornery;
	vertices[3*i+2] = 0;
	normals[3*i] = 0;
	normals[3*i+1] = 0;
	normals[3*i+2] = 1;
	
	var indices = new Uint16Array(2*3+ 2*3);
	var k = 0;
	indices[k++] = 0;
	indices[k++] = 1;
	indices[k++] = 2;
	
	indices[k++] = 3;
	indices[k++] = 4;
	indices[k++] = 5;
	
	indices[k++] = 6+2;
	indices[k++] = 6+1;
	indices[k++] = 6+0;
	
	indices[k++] = 6+3;
	indices[k++] = 6+2;
	indices[k++] = 6+0;
	

	geometry.addAttribute( 'index', new THREE.BufferAttribute( indices, 1 ) );
	geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	geometry.addAttribute( 'normal', new THREE.BufferAttribute( normals, 3 ) );

	var mesh = new THREE.Mesh(geometry, null);
	return mesh;
    }
    PlayBackButtonFactory.prototype.createNextButton = function() {
	var geometry = new THREE.BufferGeometry();
	var vertices = new Float32Array(3*3+4*3);
	var normals = new Float32Array(3*3+4*3);
	var i;
	for(i = 0; i < 3; i++) {
	    vertices[3*i] = this.size * Math.cos(i * 2*Math.PI/3);
	    vertices[3*i+1] = this.size * Math.sin(i * 2*Math.PI/3);
	    vertices[3*i+2] = 0;

	    normals[3*i] = 0;
	    normals[3*i+1] = 0;
	    normals[3*i+2] = 1;
	}
	var cornerx = this.size, cornery = this.size * Math.sin(2*Math.PI/3);
	vertices[3*i] = cornerx;
	vertices[3*i+1] = cornery;
	vertices[3*i+2] = 0;
	normals[3*i] = 0;
	normals[3*i+1] = 0;
	normals[3*i+2] = 1;
	i++;
	vertices[3*i] = cornerx+this.width;
	vertices[3*i+1] = cornery;
	vertices[3*i+2] = 0;
	normals[3*i] = 0;
	normals[3*i+1] = 0;
	normals[3*i+2] = 1;
	i++;
	vertices[3*i] = cornerx+this.width;
	vertices[3*i+1] = -cornery;
	vertices[3*i+2] = 0;
	normals[3*i] = 0;
	normals[3*i+1] = 0;
	normals[3*i+2] = 1;
	i++;
	vertices[3*i] = cornerx;
	vertices[3*i+1] = -cornery;
	vertices[3*i+2] = 0;
	normals[3*i] = 0;
	normals[3*i+1] = 0;
	normals[3*i+2] = 1;
	
	var indices = new Uint16Array(1*3+ 2*3);
	var k = 0;
	indices[k++] = 0;
	indices[k++] = 1;
	indices[k++] = 2;
	
	indices[k++] = 3+2;
	indices[k++] = 3+1;
	indices[k++] = 3+0;
	
	indices[k++] = 3+3;
	indices[k++] = 3+2;
	indices[k++] = 3+0;
	

	geometry.addAttribute( 'index', new THREE.BufferAttribute( indices, 1 ) );
	geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	geometry.addAttribute( 'normal', new THREE.BufferAttribute( normals, 3 ) );

	var mesh = new THREE.Mesh(geometry, null);
	return mesh;
    }
    PlayBackButtonFactory.prototype.createPauseButton = function () {
	var geometry = new THREE.BufferGeometry();
	var vertices = new Float32Array(8*3);
	var normals = new Float32Array(8*3);
	var width = this.size, height = 2*this.size * Math.sin(2*Math.PI/3);
	var bar = 1.5*this.size/3;
	var i = 0;;

	vertices[3*i] = -width/2;
	vertices[3*i+1] = height/2;
	vertices[3*i+2] = 0;
	normals[3*i] = 0;
	normals[3*i+1] = 0;
	normals[3*i+2] = 1;
	i++;
	vertices[3*i] = -width/2+bar;
	vertices[3*i+1] = height/2;
	vertices[3*i+2] = 0;
	normals[3*i] = 0;
	normals[3*i+1] = 0;
	normals[3*i+2] = 1;
	i++;
	vertices[3*i] = -width/2+bar;
	vertices[3*i+1] = -height/2;
	vertices[3*i+2] = 0;
	normals[3*i] = 0;
	normals[3*i+1] = 0;
	normals[3*i+2] = 1;
	i++;
	vertices[3*i] = -width/2;
	vertices[3*i+1] = -height/2;
	vertices[3*i+2] = 0;
	normals[3*i] = 0;
	normals[3*i+1] = 0;
	normals[3*i+2] = 1;
	i++;
	
	vertices[3*i] = -width/2+2*bar;
	vertices[3*i+1] = height/2;
	vertices[3*i+2] = 0;
	normals[3*i] = 0;
	normals[3*i+1] = 0;
	normals[3*i+2] = 1;
	i++;
	vertices[3*i] = -width/2+bar+2*bar;
	vertices[3*i+1] = height/2;
	vertices[3*i+2] = 0;
	normals[3*i] = 0;
	normals[3*i+1] = 0;
	normals[3*i+2] = 1;
	i++;
	vertices[3*i] = -width/2+bar+2*bar;
	vertices[3*i+1] = -height/2;
	vertices[3*i+2] = 0;
	normals[3*i] = 0;
	normals[3*i+1] = 0;
	normals[3*i+2] = 1;
	i++;
	vertices[3*i] = -width/2+2*bar;
	vertices[3*i+1] = -height/2;
	vertices[3*i+2] = 0;
	normals[3*i] = 0;
	normals[3*i+1] = 0;
	normals[3*i+2] = 1;
	i++;

	var indices = new Uint16Array(4*3);
	var k = 0;
	indices[k++] = 0+2;
	indices[k++] = 0+1;
	indices[k++] = 0+0;
	
	indices[k++] = 0+3;
	indices[k++] = 0+2;
	indices[k++] = 0+0;
	
	indices[k++] = 4+2;
	indices[k++] = 4+1;
	indices[k++] = 4+0;
	
	indices[k++] = 4+3;
	indices[k++] = 4+2;
	indices[k++] = 4+0;
	

	geometry.addAttribute( 'index', new THREE.BufferAttribute( indices, 1 ) );
	geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	geometry.addAttribute( 'normal', new THREE.BufferAttribute( normals, 3 ) );

	var mesh = new THREE.Mesh(geometry, null);
	return mesh;
	
    };
    return PlayBackButtonFactory;
});
