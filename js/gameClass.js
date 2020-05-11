const pi = 3.141592653589793;
var myGamePiece;
var myObstacles = [];
var myValues;
var addedObsIter = 1;

function startGame() {
    canvas = document.getElementById("gameCanvas")
    myGamePiece  = new component(10, 10, "blue", canvas.width/2, canvas.height/2, "circle_fill");
    myValues     = new component("20px", "Consolas", "black", canvas.width/2 - 250, canvas.height-10, "text");
    myObstacles.push(new component(0.1*canvas.width + 10, 10, "red", 0.45*canvas.width, 0.55*canvas.height, "rectangle"));
    myObstacles.push(new component(10, 0.15*canvas.height, "red", 0.45*canvas.width, 0.4*canvas.height, "rectangle"));
    myObstacles.push(new component(10, 0.15*canvas.height, "red", 0.55*canvas.width, 0.4*canvas.height, "rectangle"));
    
    myGameArea.start();
}

var myGameArea = {
    title  : document.getElementById("title"),
    canvas : document.getElementById("gameCanvas"),
    start  : function() {
        this.canvas.style    = "border:10px solid green;"
        this.context         = this.canvas.getContext("2d");
        this.frameNo         = 0;
        this.interval        = setInterval(updateGameArea, 10);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, posX, posY, type, text) {
    this.type     = type;
    this.width    = width;
    this.height   = height;
    this.posX     = posX;
    this.posY     = posY;
    this.velX     = 0;
    this.velY     = 0;    
    this.accX     = 0;
    this.accY     = 0;
    this.vXLim    = 0.5;
    this.vYLim    = 0.5;
    this.text     = text;
    
    this.update   = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.posX, this.posY);
        }
        else if (this.type == "rectangle") {
            ctx.fillStyle = color;
            ctx.fillRect(this.posX, this.posY, this.width, this.height);
        }
        else if (this.type == "line") {
            ctx.fillStyle = color;
            ctx.fillRect(this.width, this.height, this.posX-this.width, this.posY-this.height);
            /*
                ctx.beginPath();
                ctx.moveTo(this.width, this.height);
                ctx.lineTo(this.posX,  this.posY);
                ctx.lineWidth = 10;
                ctx.stroke();
            */
        }
        else if (this.type == "circle_fill") {
            ctx.beginPath();
            ctx.arc(this.posX, this.posY, this.width, 0.0*Math.PI, 2.0*Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
        }
        else if (this.type == "circle_empty") {
            ctx.beginPath();
            ctx.arc(this.posX, this.posY, this.width, 0.0*Math.PI, 2.0*Math.PI);
            ctx.strokeStyle = color;
            ctx.lineWidth   = this.height;
            ctx.stroke();
        }
    }
    
    this.newPos   = function() {
        this.velX += this.accX;
        this.velY += this.accY;
        this.velLimit();
        this.posX += this.velX;
        this.posY += this.velY;
        this.hitEdge();
    }

    this.velLimit = function() {
        if (this.velX > this.vXLim) {
            this.velX = this.vXLim;
            this.accX = 0;
        }
        else if (this.velX < - this.vXLim) {
            this.velX = - this.vXLim;
            this.accX = 0;
        }
        if (this.velY > this.vYLim) {
            this.velY = this.vYLim;
            this.accY = 0;
        }
        else if (this.velY < - this.vYLim) {
            this.velY = - this.vYLim;
            this.accY = 0;
        }
    }   
    
    this.hitEdge  = function() {
        if (this.type == "rectangle") {
            var XLeft   = 0;
            var XRight  = myGameArea.canvas.width  - this.width;
            var XTop    = 0;
            var XBottom = myGameArea.canvas.height - this.height;
        }
        else if (this.type == "circle_fill") {
            var XLeft   = this.width;
            var XRight  = myGameArea.canvas.width  - this.width;
            var XTop    = this.width;
            var XBottom = myGameArea.canvas.height - this.width;
        }
        
        if (this.posX < XLeft) {
            this.posX = XLeft;
            this.velX = 0;
        }
        else if (this.posX > XRight) {
            this.posX = XRight;
            this.velX = 0;
        }
        if (this.posY < XTop) {
            this.posY = XTop;
            this.velY = 0;
        }
        else if (this.posY > XBottom) {
            this.posY = XBottom;
            this.velY = 0;
        }
    }
    
    this.crashWith = function(otherobj) {
        if (this.type == "rectangle") {
            var myleft      = this.posX;
            var myright     = this.posX + (this.width);
            var mytop       = this.posY;
            var mybottom    = this.posY + (this.height);
        }
        else if (this.type == "circle_fill") {
            var myleft      = this.posX - (this.width);
            var myright     = this.posX + (this.width);
            var mytop       = this.posY - (this.width);
            var mybottom    = this.posY + (this.width);
        }
        
        var obsDir      = " ";
        var crash = true;
        var otherleft;
        var otherright;
        var othertop;
        var otherbottom;

        if (otherobj.type == "rectangle") {
            otherleft   = otherobj.posX;
            otherright  = otherobj.posX + (otherobj.width);
            othertop    = otherobj.posY;
            otherbottom = otherobj.posY + (otherobj.height);
        }
        else if (otherobj.type == "line") {
            otherleft   = Math.min(otherobj.width,  otherobj.posX);
            othertop    = Math.min(otherobj.height, otherobj.posY);
            otherright  = Math.max(otherobj.width,  otherobj.posX);
            otherbottom = Math.max(otherobj.height, otherobj.posY);
        }
        else if (otherobj.type == "circle_empty") {
            dist = Math.sqrt(Math.pow(otherobj.posX-this.posX, 2) + Math.pow(otherobj.posY-this.posY, 2))
            if (dist > otherobj.width + this.width + 5 || dist < otherobj.width - this.width - 5) {
                return [false, true, true, false, false]
            }
            else {
                t2 = false
                l2 = false
                b2 = false
                r2 = false
                if (this.posX >= otherobj.posX) {
                    r2 = true
                }
                else {
                    l2 = true
                }
                if (this.posY >= otherobj.posY) {
                    b2 = true
                }
                else {
                    t2 = true
                }
                return [true, t2, l2, b2, r2]
            }
        }

        t1 = (mytop    > otherbottom)
        l1 = (myleft   > otherright)
        b1 = (mybottom < othertop)
        r1 = (myright  < otherleft)
        t2 = (mytop    + this.height/3 >= otherbottom)
        l2 = (myleft   + this.width /3 >= otherright)
        b2 = (mybottom - this.height/3 <= othertop)
        r2 = (myright  - this.width /3 <= otherleft)
        
        if (t1 || r1 || b1 || l1)
            crash = false;
        
        return [crash, t2, l2, b2, r2];
    }
}
