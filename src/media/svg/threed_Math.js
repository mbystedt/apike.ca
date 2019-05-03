
//  threed_Math.js
//
//  Matthew Bystedt - May 2003
//  Adapted from matMath.java
//  

/**
 * Matrix math class. Run away. Don't walk.
 */
	

var matMath = function () {
	// The matrix which is being transformed
	this.transformMatrix = new Array(new Array(), new Array(), new Array(), new Array());
	this.result = new Array(new Array(), new Array(), new Array(), new Array());
	
	this.rot = new Array(new Array(0,0,0,0), new Array(0,0,0,0), new Array(0,0,0,0), new Array(0,0,0,0));
	this.trans = new Array(new Array(0,0,0,0), new Array(0,0,0,0), new Array(0,0,0,0), new Array(0,0,0,0));
	this.p = new Array(new Array(), new Array(), new Array(), new Array());
	this.q = new Array(new Array(), new Array(), new Array(), new Array());	
	this.r = new Array(new Array(), new Array(), new Array(), new Array());
		
	this.loadIdentity();

	this.rot[3][0] = 0.0; this.rot[3][1] = 0.0; this.rot[3][2] = 0.0; this.rot[3][3] = 1.0;
	this.trans [0][0] = 1;
	this.trans [1][1] = 1;
	this.trans [2][2] = 1;
	this.trans [3][3] = 1;
}

/** Loads the transform matrix with the 4x4 identity */
matMath.prototype.loadIdentity = function () {
	for (var i = 0; i < 4; i ++ ) {
		this.transformMatrix [i][0] = 0;
		this.transformMatrix [i][1] = 0;
		this.transformMatrix [i][2] = 0;
		this.transformMatrix [i][3] = 0;
	}

	this.transformMatrix [0][0] = 1;
	this.transformMatrix [1][1] = 1;
	this.transformMatrix [2][2] = 1;
	this.transformMatrix [3][3] = 1;
}

/** Rotates the matrix around the x-axis
	* @param	angle	The angle to rotate to.
*/

matMath.prototype.rotateX = function ( angle ) {
	//double [][] result = new double [4][4];
	
	this.rot[0][0] = 1.0; this.rot[0][1] = 0.0; this.rot[0][2] = 0.0;
	this.rot[1][0] = 0.0; this.rot[1][1] = Math.cos(angle); this.rot[1][2] = -Math.sin(angle);
	this.rot[2][0] = 0.0; this.rot[2][1] = Math.sin(angle); this.rot[2][2] = Math.cos(angle);

	this.multiplyMatrix (4, 4, this.rot, this.transformMatrix, this.result);
	this.copyMatrix (this.transformMatrix, this.result);
}

/** Rotates the matrix around the y-axis
	* @param	angle	The angle to rotate to.
*/

matMath.prototype.rotateY = function ( angle) {
	//double [][] result = new double [4][4];

	this.rot[0][0] = Math.cos(angle); this.rot[0][1] = 0.0; this.rot[0][2] = Math.sin(angle);
	this.rot[1][0] = 0.0; this.rot[1][1] = 1.0; this.rot[1][2] = 0.0;
	this.rot[2][0] = -Math.sin(angle); this.rot[2][1] = 0.0; this.rot[2][2] = Math.cos(angle);
	
	this.multiplyMatrix (4, 4, this.rot, this.transformMatrix, this.result);
	this.copyMatrix (this.transformMatrix, this.result);
}

/** Rotates the matrix around the z-axis
	* @param	angle	The angle to rotate to.
*/

matMath.prototype.rotateZ = function ( angle) {
	//double [][] result = new double [4][4];
	this.rot[0][0] = Math.cos(angle); this.rot[0][1] = -Math.sin(angle); this.rot[0][2] = 0.0;
	this.rot[1][0] = Math.sin(angle); this.rot[1][1] = Math.cos(angle); this.rot[1][2] = 0.0;
	this.rot[2][0] = 0.0; this.rot[2][1] = 0.0; this.rot[2][2] = 1.0;
	
	this.multiplyMatrix (4, 4, this.rot, this.transformMatrix, this.result);
	this.copyMatrix (this.transformMatrix, this.result);
}

/** Scales the transform matrix.
	* @param	scale	The scaling factor.
*/	
matMath.prototype.scale = function ( scale ) {
	this.scale(scale, scale, scale);
}

/** Scales the transform matrix.
	* @param	scaleX	The ammount to scale on the x-axis.
	* @param	scaleY	The ammount to scale on the y-axis.
	* @param	scaleZ	The ammount to scale on the z-axis.
*/		
matMath.prototype.scale = function ( scaleX, scaleY, scaleZ ) {
	for (var x = 0; x < 3; x++) {
		this.transformMatrix[x][0] *= scaleX;
		this.transformMatrix[x][1] *= scaleY;
		this.transformMatrix[x][2] *= scaleZ;
	}
}

/** Translates the transform matrix.
	* @param	x	The ammount to translate along the x.
	* @param	y	The ammount to translate along the y.
	* @param	z	The ammount to translate along the z.
	*/		
matMath.prototype.translate = function ( x, y, z ) {
	//double [][] result = new double [4][4];
	this.trans[0][3] = x;
	this.trans[1][3] = y;
	this.trans[2][3] = z;
	
	this.multiplyMatrix (4, 4, this.trans, this.transformMatrix, this.result);
	this.copyMatrix (this.transformMatrix, this.result);
}

/** Computes the normal of three points.
	* @param	cp		The centre point.
	* @param	p1		The point 1.
	* @param	p2		The point 2.
	* @param	result	The computed normal.
	*/	

matMath.prototype.computeNormal = function ( cp,  p1,  p2, result) {
	p[0] = p2[0] - cp[0];
	p[1] = p2[1] - cp[1];
	p[2] = p2[2] - cp[2];
	
	q[0] = p1[0] - cp[0];
	q[1] = p1[1] - cp[1];
	q[2] = p1[2] - cp[2];
	
	result[0] = p[1] * q[2] - p[2] * q[2];
	result[1] = (- p[0] * q[2]) + p[2] * q[0];
	result[2] = p[0] * q[1] - p[1] * q[0];
}

/** Computes the dot product of two points.
	* @param	v1		The point 1.
	* @param	v2		The point 2.
	* @return			The computed dot product.
	*/	
	
matMath.prototype.computeDotProduct = function (v1, v2) {
	return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
}

/** Normalizes a vector. Overwrites the old vector.
	* @param	dbnew	The vector to be normalized.
	* @return			The normalized vector.
	*/	

matMath.prototype.normVector = function ( dbnew ) {
	var b = Math.sqrt(dbnew[0]* dbnew[0] + dbnew[1] * dbnew[1] + dbnew[2] * dbnew[2]);
	dbnew[0] /= b;
	dbnew[1] /= b;
	dbnew[2] /= b;
	return dbnew;
}


/** Returns the transform matrix */

matMath.prototype.getMatrix = function () {
	return this.transformMatrix;
}

/** Multiplies two matrixs together
	* @param	rows	The # of rows in the matrixs.
	* @param	cols	The # of columns in the matrixs.
	* @param	m1	The 1rst matrix.
	* @param	m2	The 2nd matrix.
	* @param	m3	The result matrix.
	*/	

matMath.prototype.multiplyMatrix = function (rows, cols, m1, m2, m3) {
	var val = 0;
	for (var i=0; i < rows; i++) {
		for (var j=0; j < cols; j++) {
		val = 0;
		for (var k=0; k<cols; k++) {
			val += m1[i][k] * m2[k][j];
		}
		m3[i][j] = val;
		}
	}
}

/** Copies one matrix to onto another.
	* @param	m1	The matrix being copied to.
	* @param	m2	The matrix being copied from.
	*/	
	
matMath.prototype.copyMatrix = function ( m1, m2) {
	for (var i = 0; i < 4; i ++ ) {
		m1[i][0] = m2[i][0];
		m1[i][1] = m2[i][1];
		m1[i][2] = m2[i][2];
		m1[i][3] = m2[i][3];
	}
}

/** Multiplies a 3d vector by the transform matrix.
	* @param	p			The point being multiplied.
	* @param	transformMatrix		The matrix being multiplied.
	*/
matMath.prototype.fullMultiplyVector = function ( p, transformMatrix ) {
	for (var i = 0; i < 4; i++ ) {
		this.r[i] = transformMatrix [i][0] * p[0] + transformMatrix [i][1] * p[1] + transformMatrix [i][2] * p[2] + transformMatrix [i][3] * p[3];
	}
	p[0] = this.r[0]; 
	p[1] = this.r[1]; 
	p[2] = this.r[2];
	p[3] = this.r[3];
	
	return p;
}

/** Multiplies a 3d vector by the transform matrix. 4th element in point assumed to be 1.
	* @param	p			The point being multiplied.
	* @param	transformMatrix		The transformation matrix being applied.
	*/
matMath.prototype.multiplyVector = function (p, transformMatrix ) {
	for (var i = 0; i < 3; i++ ) {
		this.r[i] = transformMatrix [i][0] * p[0] + transformMatrix [i][1] * p[1] + transformMatrix [i][2] * p[2] + transformMatrix [i][3];
	}
	p[0] = this.r[0]; 
	p[1] = this.r[1]; 
	p[2] = this.r[2];
	
	return p;
}
