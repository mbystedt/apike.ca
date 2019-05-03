
//  maze.js
//
//  Matthew Bystedt - March 2005
//  


var mazePoint = function () {
    this.wall = new Array(6);
    
	for (var i = 0; i < 6; i++ ) {
        this.wall[i] = 1;
    }
    
    // for, left, back, right, up, dwn
    
    this.visited = 0;
}

var Point = function () {
    this.x = 0;
    this.y = 0;
    this.z = 0;
}

var maze = function ( x, y, z ) {
	this.x = x;
    this.y = y;
    this.z = z;
    
    this.visited = 0;
    
    // Since JavaScript has no easy way to do multi-dimensional
    // arrays... do it by using a one dimensional and calculate.
    this.maze = new Array(x * y * z);
    
	for (var i = 0; i < (x * y * z); i++ ) {
        this.maze[i] = new mazePoint();
    }
}

var pointa = new Array (3);
var visitPnts = new Array (1);

maze.prototype.generate = function () {
    // Pick a random point
    this.picka();
    visitPnts[0] = new Array (pointa[0], pointa[1], pointa[2]);
    this.numvisited = 1;
    
    this.tunnel();
    
    while (this.x*this.y*this.z > this.numvisited) {
        var accept = 0;
        var rand = 0;
        while (accept == 0) {
            rand = Math.round(Math.random()*(visitPnts.length-1));
            if (this.countFree(visitPnts[rand][0],visitPnts[rand][1],visitPnts[rand][2]) != -1) {
                accept = 1;
            }
        }
            
        pointa[0] = visitPnts[rand][0];
        pointa[1] = visitPnts[rand][1];
        pointa[2] = visitPnts[rand][2];
        
        this.tunnel();
    }
}


maze.prototype.tunnel = function () {
    var dir = -1;
    while ((dir = this.countFree(pointa[0], pointa[1], pointa[2])) != -1) {
        this.maze[this.address(pointa[0], pointa[1], pointa[2])].visited = 1;
        this.maze[this.address(pointa[0], pointa[1], pointa[2])].wall[dir] = 0;
        this.movePoint(dir);
        this.maze[this.address(pointa[0], pointa[1], pointa[2])].visited = 1;
        this.maze[this.address(pointa[0], pointa[1], pointa[2])].wall[this.reverseDir(dir)] = 0;
        visitPnts.push(new Array (pointa[0], pointa[1], pointa[2]));
       // window.status = window.status + dir;
        this.numvisited++;
    }    

}

var track = new Array (4);
var trackz = new Array (2);

maze.prototype.picka = function () {
    pointa[0] = Math.round(Math.random()*(this.x-1));
    pointa[1] = Math.round(Math.random()*(this.y-1));
    pointa[2] = Math.round(Math.random()*(this.z-1));    
}

maze.prototype.countFree = function (x, y, z) {
    var cnt = 0;
    var cntz = 0;
    
    for (var dir = 0; dir < 4; dir++ ) { 
        var nPos = this.move(dir, x,y,z);
        if ((nPos != -1 )&&(this.maze[nPos].visited == 0)) {
            track[cnt] = dir;
            cnt++;
        }
    }
    
    for (var dir = 4; dir < 6; dir++ ) { 
        var nPos = this.move(dir, x,y,z);
        if ((nPos != -1 )&&(this.maze[nPos].visited == 0)) {
            trackz[cntz] = dir;
            cntz++;
        }
    }
    
    if (cnt > 0) {
        var rand = Math.round(Math.random()*(cnt-1));
        return track[rand];
    }

    if (cntz > 0) {
        var rand = Math.round(Math.random()*(cntz-1));
        return trackz[rand];
    }
    
    return -1;
}

maze.prototype.movePoint = function (dir) {
    if (dir == 0) {
        pointa[1]--;
    } else if (dir == 1) {
        pointa[0]++;
    } else if (dir == 2) {
        pointa[1]++;
    } else if (dir == 3) {
        pointa[0]--;
    } else if (dir == 4) {
        pointa[2]++;
    } else if (dir == 5) {
        pointa[2]--;
    }
}

maze.prototype.reverseDir = function (dir) {
    if (dir == 0) {
        return 2;
    } else if (dir == 1) {
        return 3;
    } else if (dir == 2) {
        return 0;
    } else if (dir == 3) {
        return 1;
    } else if (dir == 4) {
        return 5;
    } else if (dir == 5) {
        return 4;
    }
}

maze.prototype.move = function (dir, x, y, z) {
    if (dir == 0) {
        if (y-1 < 0)
            return -1;
        else
            return this.address(x,y-1,z);
    } else if (dir == 1) {
        if (x+1 > this.x-1)
            return -1;
        else
            return this.address(x+1,y,z);
    } else if (dir == 2) {
        if (y+1 > this.y-1)
            return -1;
        else
            return this.address(x,y+1,z);
    } else if (dir == 3) {
        if (x-1 < 0)
            return -1;
        else
            return this.address(x-1,y,z);
    } else if (dir == 4) {
        if (z+1 > this.z-1)
            return -1;
        else
            return this.address(x,y,z+1);
    } else if (dir == 5) {
        if (z-1 < 0)
            return -1;
        else
            return this.address(x,y,z-1);
    }
    
    return 0;
}

maze.prototype.address = function (x, y, z) {
    return ((x*this.y+y)*this.z+z);
}

maze.prototype.show = function (svgDoc, w, offx, offy) {
	var svgns = "http://www.w3.org/2000/svg";
    
	for (var z = 0; z < this.z; z++ ) {
    
    var mGroup = svgDoc.createElementNS(svgns, "g");
    //mGroup.setAttributeNS(null, "transform", 'translate(' + (offx + z*w*this.x)  + ', ' + offy + ')');
    mGroup.setAttributeNS(null, "transform", 'translate(' + (offx)  + ', ' + offy + ')');
//    mGroup.setAttributeNS(null, "stroke-width", '2px');
    mGroup.setAttributeNS(null, "stroke", 'black');
    mGroup.setAttributeNS(null, "id", 'maze_' + z);

    if (z != 0) {
        mGroup.setAttributeNS(null, "visibility", 'hidden');        
    }

	for (var x = 0; x < this.x; x++ ) {
	for (var y = 0; y < this.y; y++ ) {
        var block = this.maze[this.address(x,y,z)];

        if (block.wall[0] == 1) {
            var shape = svgDoc.createElementNS(svgns, "line");
            shape.setAttributeNS(null, "x1", x*w);
            shape.setAttributeNS(null, "y1", y*w);
            shape.setAttributeNS(null, "x2", x*w + w);
            shape.setAttributeNS(null, "y2", y*w);
            mGroup.appendChild(shape);
        }
        
        if (block.wall[1] == 1) {
            var shape = svgDoc.createElementNS(svgns, "line");
            shape.setAttributeNS(null, "x1", x*w + w);
            shape.setAttributeNS(null, "y1", y*w);
            shape.setAttributeNS(null, "x2", x*w + w);
            shape.setAttributeNS(null, "y2", y*w + w);
            mGroup.appendChild(shape);
        }
        if (block.wall[4] == 0) {
            var shape = svgDoc.createElementNS(svgns, "polygon");
            shape.setAttributeNS(null, "points", (x*w+w/8) + "," + (y*w+w/5) + " " + (x*w+w/4) + ", " + (y*w+2*w/5)
            + " " + x*w + ", " + (y*w+2*w/5));
            shape.setAttributeNS(null, "fill", "red");
            shape.setAttributeNS(null, "opacity", "0.5");
            mGroup.appendChild(shape);
        }
        if (block.wall[5] == 0) {
            var shape = svgDoc.createElementNS(svgns, "polygon");
            shape.setAttributeNS(null, "points", (x*w+w/8) + "," + (y*w+4*w/5) + " " + (x*w+w/4) + ", " + (y*w+3*w/5)
            + " " + x*w + ", " + (y*w+3*w/5));          
            shape.setAttributeNS(null, "width", w/2);
            shape.setAttributeNS(null, "height", w/2);
            shape.setAttributeNS(null, "fill", "blue");
            shape.setAttributeNS(null, "opacity", "0.5");
            mGroup.appendChild(shape);
        }             
    }
    }
    svgDoc.documentElement.appendChild(mGroup);
    }

}

