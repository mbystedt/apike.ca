
//  cube.js
//
//  Matthew Bystedt - May 2003
//  Adapted from cube.java
//  

var pointDouble = function () {
	this.x = 0;
    this.y = 0;	
}


var cube = function {
	this.points = new Array(new Array(), new Array(), new Array(), new Array(), 
							new Array(), new Array(), new Array(), new Array() );
    this.colours = new Array( "blue", "cyan", "green", "magenta", "orange", "pink", "red", "yellow");
    this.W = new Array();
    
    this.reset();
}

/**
*	Resets the cube's points positions.
*/

cube.prototype.reset = function () {
    this.points[0][0] = 1.0; this.points[0][1] = 1.0; this.points[0][2] = 1.0;
    this.points[1][0] = -1.0; this.points[1][1] = 1.0; this.points[1][2] = 1.0;
    this.points[2][0] = -1.0; this.points[2][1] = -1.0; this.points[2][2] = 1.0;
    this.points[3][0] = 1.0; this.points[3][1] = -1.0; this.points[3][2] = 1.0;
    
    this.points[4][0] = 1.0; this.points[4][1] = 1.0; this.points[4][2] = -1.0;
    this.points[5][0] = -1.0; this.points[5][1] = 1.0; this.points[5][2] = -1.0;
    this.points[6][0] = -1.0; this.points[6][1] = -1.0; this.points[6][2] = -1.0;
    this.points[7][0] = 1.0; this.points[7][1] = -1.0; this.points[7][2] = -1.0;
}
	
	int[][] connections = {
		// Top
		{ 0, 1 },
		{ 1, 2 },
		{ 2, 3 },
		{ 3, 0 },
		// Bottom
		{ 4, 5 },
		{ 5, 6 },
		{ 6, 7 },
		{ 7, 4 },
		// Top-Bottom Connections
		{ 0, 4 },
		{ 1, 5 },
		{ 2, 6 },
		{ 3, 7 }
	};


/** Takes the cubes points and outputs them to the render.
 *	@param	cdp		The draw panel which will render the cube.
 */
	public void draw ( sceneDrawPanel cdp ) {
		cdp.startObj( sceneDrawPanel.line );
		for (int i = 0; i < 12; i++) {
			cdp.setColor(colours[i%8]);
			cdp.addPoint (
				points[connections[i][0]][0],
				points[connections[i][0]][1],
				points[connections[i][0]][2]);
			cdp.addPoint ( 
				points[connections[i][1]][0],
				points[connections[i][1]][1],
				points[connections[i][1]][2]);
		}
	}
	
}