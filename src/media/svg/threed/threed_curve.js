
//  threed_curve.js
//
//  Matthew Bystedt - May 2003
//  Adapted from .java
//  

/**
 * Encapsulates a curve. The curve has 4 control points which are can be set. The curve can be set to be either
 * a bezier type or a Spline type.
 * @author		Matthew Bystedt
 */

var curve = function () {

	/** The control points */
	this.cPoint = new Array(new Array(), new Array(), new Array(), new Array());
    this.cPoint[0][0] = 40; this.cPoint[0][1] = 80;
    this.cPoint[1][0] = 40; this.cPoint[1][1] = 40;
    this.cPoint[2][0] = 80; this.cPoint[2][1] = 40;
    this.cPoint[3][0] = 80; this.cPoint[3][1] = 80;

	this.cMatrix = new Array(new Array(0,0,0,0), new Array(0,0,0,0), new Array(0,0,0,0), new Array(0,0,0,0));
	this.curveTypeMatrix = new Array(new Array(0,0,0,0), new Array(0,0,0,0), new Array(0,0,0,0), new Array(0,0,0,0));
    
	/** The curve mode and the number of samples to take of the curve */
    this.curveMode = 0;
    this.tNum = 15;
    this.maxTcnt = 25;

    this.vecMath = new matMath();
            
	this.pointBuffer = new Array();	
    
	// Bezier Matrix
	this.bezier = new Array(
        new Array(-1.0,3.0,-3.0,1.0), 
        new Array(3.0,-6.0,3.0,0), 
        new Array(-3.0,3.0,0,0),
        new Array(1,0,0,0));
    
	// Bspline Matrix
	this.bspline = new Array(
        new Array(-1.0/6.0, 3.0/6.0, -3.0/6.0, 1.0/6.0), 
        new Array(3.0/6.0, -6.0/6.0, 3.0/6.0, 0.0), 
        new Array(-3.0/6.0, 0.0, 3.0/6.0, 0.0), 
        new Array(1.0/6.0, 4.0/6.0, 1.0/6.0, 0.0));

	this.curveTypeMatrix = this.bezier;

    for (var i = 0; i < this.maxTcnt; i++) {
        this.pointBuffer[i] = new Array();
    }

    this.setupMatrix ();
}

	/** Sets up the matrix, cMatrix, so that samples may be taken of the curve. */
curve.prototype.resetPoints = function () {
    this.cPoint[0][0] = 40; this.cPoint[0][1] = 80;
    this.cPoint[1][0] = 40; this.cPoint[1][1] = 40;
    this.cPoint[2][0] = 80; this.cPoint[2][1] = 40;
    this.cPoint[3][0] = 80; this.cPoint[3][1] = 80;
    this.setupMatrix ();
}

curve.prototype.setupMatrix = function () {
    var v = new Array();
    
    for (var i = 0; i < 4; i++)
        v[i] = this.cPoint[i][0];
        
    this.vecMath.fullMultiplyVector( v, this.curveTypeMatrix );

    for (var i = 0; i < 4; i++)
        this.cMatrix[0][i]= v[i];	

    for (var i = 0; i < 4; i++)
        v[i] = this.cPoint[i][1];		

    this.vecMath.fullMultiplyVector( v, this.curveTypeMatrix );

    for (var i = 0; i < 4; i++)
        this.cMatrix[1][i]= v[i];
    
    this.setupPoints();
}

curve.prototype.setupPoints = function () {
    var tVect = new Array();
    var lastP = new Array();
    
    for (var i = 0; i <= this.tNum - 1; i ++) {
        var tVal = i / (this.tNum-1);
        tVect[3] = 1;
        tVect[2] = tVal;
        tVect[1] = tVal * tVal;
        tVect[0] = tVal * tVect[1];
        
        this.vecMath.fullMultiplyVector( tVect, this.cMatrix );
        
        this.pointBuffer[i][0] = tVect[0];
        this.pointBuffer[i][1] = tVect[1];
    }	
}

/** Sets the type of curve this object represents.
 *	@param	cType	The type of curve to be set.
 */

curve.prototype.setCurveMode = function ( cType ) {
    this.curveMode = cType;
    if (curveMode == 0)
        this.curveTypeMatrix = this.bezier;
    else 
        this.curveTypeMatrix = this.bspline;
    
    this.setupMatrix ();
}

/** Sets T. T is the number of samples taken of the curve.
 *	@param	tNum	The number of samples to be taken.
 */
 
curve.prototype.setT = function ( tNum ) {
    if ((this.tNum == tNum)||(this.tNum > maxTcnt)||(this.tNum < 0))
        return;
        
    this.tNum = tNum;
    this.setupMatrix ();
}

/** Returns T. T is the number of samples taken of the curve.
 *	@return		The number of samples being taken.
 */
 
curve.prototype.getT = function() {
    return this.tNum;
}

/** Returns the array of T sampled points on the curve.
 *	@return		The array of T sampled points on the curve.
 */
 
curve.prototype.getCurvePoints = function () {
    return this.pointBuffer;
}

/** Sets a control point of the curve.
 *	@param	curvePt		The control point to change (0-3).
 *	@param	x			The x value to set the control point to.
 *	@param	y			The y value to set the control point to.
 */

curve.prototype.setPoint = function (curvePt, x, y) {
    this.cPoint[curvePt][0] = x;
    this.cPoint[curvePt][1] = y;
    this.setupMatrix ();
}

/** Returns a control point of the curve.
 *	@param	curvePt		The control point to return (0-3).
 *	@return				A control point
 */

curve.prototype.getCurvePoint = function ( curvePt ) {
    return this.cPoint[curvePt];
}