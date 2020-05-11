shortcut.add("W",function() {
    myGamePiece.accY = -0.05;
},{
    'type': 'keydown'
});

shortcut.add("W",function() {
    myGamePiece.accY = 0.00;
},{
    'type': 'keyup'
});

shortcut.add("S",function() {
    myGamePiece.accY =  0.05;
},{
    'type': 'keydown'
});

shortcut.add("S",function() {
    myGamePiece.accY = 0.00;
},{
    'type': 'keyup'
});

shortcut.add("A",function() {
    myGamePiece.accX = -0.05;
},{
    'type': 'keydown'
});

shortcut.add("A",function() {
    myGamePiece.accX = 0.00;
},{
    'type': 'keyup'
});

shortcut.add("D",function() {
    myGamePiece.accX = 0.05;
},{
    'type': 'keydown'
});

shortcut.add("D",function() {
    myGamePiece.accX = 0.00;
},{
    'type': 'keyup'
});

shortcut.add("Up",function() {
    myGamePiece.vYLim *= 1.10;
},{
    'type': 'keydown'
});

shortcut.add("Up",function() {
    myGamePiece.vYLim *= 1.00;
},{
    'type': 'keyup'
});

shortcut.add("Down",function() {
    myGamePiece.vYLim /= 1.10;
},{
    'type': 'keydown'
});

shortcut.add("Down",function() {
    myGamePiece.vYLim /= 1.00;
},{
    'type': 'keyup'
});

shortcut.add("Left",function() {
    myGamePiece.vXLim /= 1.10;
},{
    'type': 'keydown'
});

shortcut.add("Left",function() {
    myGamePiece.vXLim /= 1.00;
},{
    'type': 'keyup'
});

shortcut.add("Right",function() {
    myGamePiece.vXLim *= 1.10;
},{
    'type': 'keydown'
});

shortcut.add("Right",function() {
    myGamePiece.vXLim *= 1.00;
},{
    'type': 'keyup'
});


shortcut.add("Space",function() {
    myGamePiece.velX = 0.00;
    myGamePiece.velY = 0.00;
    myGamePiece.accX = 0.00;
    myGamePiece.accY = 0.00;
},{
    'type': 'keydown'
});

shortcut.add("Escape",function() {
    myGamePiece.posX = document.getElementById("gameCanvas").width/2;
    myGamePiece.posY = document.getElementById("gameCanvas").height/2;
    myGamePiece.velX = 0.00;
    myGamePiece.velY = 0.00;
    myGamePiece.accX = 0.00;
    myGamePiece.accY = 0.00;
},{
    'type': 'keydown'
});

shortcut.add("Backspace",function() {
    myGamePiece.vXLim = 0.5;
    myGamePiece.vYLim = 0.5;
},{
    'type': 'keydown'
});