
//  unSeth.js
//
//  Matthew Bystedt - March 2005
//  

var aniBody = function ( img, x, y, scale ) {
	this.x = x;
    this.y = y;
    this.scale = scale;
    this.img = img;
    this.time = 0;
    this.timeDelta = 0;
    this.cTime = new Date();

    this.step = 1;
    this.stepTime = 0;
    
    this.animating = "reset";
    this.movecbObj = null;
    this.direction = 4;
    
    this.load();
    
    this.stop();
}

aniBody.prototype.load = function () {
    // Loads all the images so that they are prefetched
    // Really... it would be better not to do this but lets avoid hammering the server.
    
}

aniBody.prototype.reset = function () {
    this.stop();
}

aniBody.prototype.setMoveCallBack = function (cb) {
    this.movecbObj = cb;
}

aniBody.prototype.animate = function (delta) {
    if (this.stopped != 1) {
        this.cTime = new Date();
        this.timeDelta = this.cTime.getTime() - this.time;
        this.time = this.cTime.getTime();
//        window.status = this.timeDelta;
        this.stepTime += this.timeDelta;    
        eval("this." + this.animating + "();");
    }
}

aniBody.prototype.stop = function () {
    if (this.direction == 0) {
        this.img.setAttribute("xlink:href", "unseth/stopu.png");        
    } else if (this.direction == 2) {
        this.img.setAttribute("xlink:href", "unseth/stopr.png");        
    } else if (this.direction == 4) {
        this.img.setAttribute("xlink:href", "unseth/stopd.png");                
    } else if (this.direction == 6) {
        this.img.setAttribute("xlink:href", "unseth/stopl.png");        
    }

    this.img.setAttribute("x", this.x);
    this.img.setAttribute("y", this.y);
    this.stopped = 1;
}

aniBody.prototype.startAnimate = function (animation, direction) {
    this.animating = animation;
    this.direction = direction;
    this.cTime = new Date();
    this.time = this.cTime.getTime();
    this.stopped = 0;
    this.step = 1;
    this.stepTime = 151;
}

aniBody.prototype.offsetDist = function (offset) {

    if (this.movecbObj != null) {
        if (this.movecbObj.validateMove(this.timeDelta * offset) == 0) {
            this.stepTime = 0;
            this.stop();
            return;
        }
    }
    
    if (this.direction == 0) {
        this.y = this.y - (this.timeDelta * offset);
    } else if (this.direction == 2) {
        this.x = this.x + (this.timeDelta * offset);    
    } else if (this.direction == 4) {
        this.y = this.y + (this.timeDelta * offset);    
    } else if (this.direction == 6) {
        this.x = this.x - (this.timeDelta * offset);    
    }
    this.img.setAttribute("x", this.x);
    this.img.setAttribute("y", this.y);    
}

aniBody.prototype.face = function (direction) {
    this.direction = direction;
    this.stop();
}

aniBody.prototype.walk = function () {
    this.offsetDist(0.1 * this.scale);

    if (this.stepTime < 150) {
        return;
    }

    this.stepTime -= 150;
    
    if (this.direction == 0) {
        this.img.setAttribute("xlink:href", "unseth/stepu" + this.step + ".png");
    } else if (this.direction == 2) {
        this.img.setAttribute("xlink:href", "unseth/stepr" + this.step + ".png");
    } else if (this.direction == 4) {
        this.img.setAttribute("xlink:href", "unseth/stepd" + this.step + ".png");    
    } else if (this.direction == 6) {
        this.img.setAttribute("xlink:href", "unseth/stepl" + this.step + ".png");    
    }

    this.step++;
    
    if (this.step > 4) {
        this.step = 1;
    }
}

aniBody.prototype.run = function () {

}