function updateGameArea() {
    var posX, height, gap, minHeight, maxHeight, minGap, maxGap;
    canvasWidth  = document.getElementById("gameCanvas").width
    canvasHeight = document.getElementById("gameCanvas").height
    
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])[0]) {
            t = myGamePiece.crashWith(myObstacles[i])[1]
            l = myGamePiece.crashWith(myObstacles[i])[2]
            b = myGamePiece.crashWith(myObstacles[i])[3]
            r = myGamePiece.crashWith(myObstacles[i])[4]
            
            if (myObstacles[i].type != "circle_fill" && myObstacles[i].type != "circle_empty") {        
                if ((!t && b) || (t && !b)) {
                    myGamePiece.velY = - myGamePiece.velY;
                }
                else {
                    myGamePiece.velY =   myGamePiece.velY;
                }
                    
                if ((!l && r) || (l && !r)) {
                    myGamePiece.velX = - myGamePiece.velX;
                }
                else {
                    myGamePiece.velX =   myGamePiece.velX;
                }
            }
            else {
                if (l && t) {
                    myGamePiece.velX =   myGamePiece.velX;
                    myGamePiece.velY = - myGamePiece.velY;
                }
                else if (l && b) {
                    myGamePiece.velX =   myGamePiece.velX;
                    myGamePiece.velY = - myGamePiece.velY;
                }
                else if (r && t) {
                    myGamePiece.velX =   myGamePiece.velX;
                    myGamePiece.velY = - myGamePiece.velY;
                }
                else if (r && b) {
                    myGamePiece.velX =   myGamePiece.velX;
                    myGamePiece.velY = - myGamePiece.velY;
                }
            }

        myGamePiece.accX = 0;
        myGamePiece.accY = 0;
        } 
    }
    
    myGameArea.clear();
    myGameArea.frameNo += 1;
    for (i = 0; i < myObstacles.length; i += 1) {
        myObstacles[i].update();
    }
    myValues.text = "Position : (" + Math.round(myGamePiece.posX) + "," + Math.round(myGamePiece.posY) + ")    Velocity : ("+ Math.round(myGamePiece.velX*100)/100 + "," + Math.round(myGamePiece.velY*100)/100 + ")    Velocity Limits : ("+ Math.round(myGamePiece.vXLim*100)/100 + "," + Math.round(myGamePiece.vYLim*100)/100 + ")";
    myValues.update();
    myGamePiece.newPos();
    myGamePiece.update();
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function accelerate(n) {
    myGamePiece.accY = n;
}