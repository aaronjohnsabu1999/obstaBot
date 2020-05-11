// removeArrElem() adopted from https://stackoverflow.com/a/5767357/6539635
function removeArrElem(arr, posX, posY) {
    var i = 0;
    while (i < arr.length) {
        if (arr[i].text) {
            if(arr[i].type == "rectangle" && arr[i].posX == posX && arr[i].posY == posY) {
                arr.splice(i, 1);
                continue
            }
            else if((arr[i].type == "circle_empty" || arr[i].type == "circle_fill") && Math.abs(Math.sqrt(Math.pow(arr[i].posX - posX, 2) + Math.pow(arr[i].posY - posY, 2)) - arr[i].width) < 10) {
                arr.splice(i, 1);
                continue
            } 
            else if(arr[i].type == "line" && Math.min(arr[i].posX, arr[i].width) <= posX && Math.max(arr[i].posX, arr[i].width) >= posX && Math.min(arr[i].posY, arr[i].height) <= posY && Math.max(arr[i].posY, arr[i].height) >= posY) {
                arr.splice(i, 1);
                continue
            }
        }
        ++i;
    }
    return arr;
}

function getMousePosition(canvas, event) { 
    let rect = canvas.getBoundingClientRect(); 
    let x = event.clientX - rect.left - 10; 
    let y = event.clientY - rect.top  - 10; 
    x = x - x%10
    y = y - y%10

    return [event.button, x, y];
}

let canvasElem = document.getElementById("gameCanvas"); 
canvasElem.oncontextmenu = () => false;

lineStart  = [0.0, 0.0]
lineEnd    = [0.0, 0.0]
lineInit   = false

circCenter = [0.0, 0.0]
circEnd    = [0.0, 0.0]
circInit   = false

canvasElem.addEventListener("mousedown", function(e) { 
    obsOption = document.getElementsByName("obsType");
    action    = getMousePosition(canvasElem, e);
    
    if (action[0] == 1) {
        myObstacles = [];
        
        myObstacles.push(new component(canvas.width, 20,  "green", 0.0, 0.0, "rectangle"));
        myObstacles.push(new component(20, canvas.height, "green", 0.0, 0.0, "rectangle"));
        myObstacles.push(new component(canvas.width, 20,  "green", 0.0, canvas.height - 20, "rectangle"));
        myObstacles.push(new component(20, canvas.height, "green", canvas.width - 20, 0.0,  "rectangle"));
        
        myObstacles.push(new component(0.1*canvas.width + 10, 10, "red", 0.45*canvas.width, 0.55*canvas.height, "rectangle"));
        myObstacles.push(new component(10, 0.15*canvas.height, "red", 0.45*canvas.width, 0.4*canvas.height, "rectangle"));
        myObstacles.push(new component(10, 0.15*canvas.height, "red", 0.55*canvas.width, 0.4*canvas.height, "rectangle"));
        return
    }
    if (action[0] == 2) {
        myObstacles = removeArrElem(myObstacles, action[1], action[2])
        return
    }

    if (obsOption[0].checked) {
        obsPoint(action);
    }
    else if (obsOption[1].checked) {
        if (!window.lineInit) {
            obsLineStart(action);
        }
        else {
            obsLineEnd(action);
        }
    }
    else if (obsOption[2].checked) {
        if (!window.circInit) {
            obsCircCenter(action);
        }
        else {
            obsCircEnd(action);
        }
    }
}); 

function obsPoint(action) {
    button = action[0]
    posX   = action[1]
    posY   = action[2]

    if (button == 0) {
        myObstacles.push(new component(10, 10, "black", posX, posY, "rectangle", "addedObs"+addedObsIter));
        addedObsIter += 1;
    }
}

function obsLineStart(action) {
    button = action[0]
    posX   = action[1]
    posY   = action[2]

    if (button == 0) {
        lineStart = [posX, posY];
        window.lineInit  = true;
    }
}

function obsLineEnd(action) {
    button = action[0]
    posX   = action[1]
    posY   = action[2]

    if (button == 0) {
        if (Math.abs(this.posX-lineStart[0]) > Math.abs(this.posY-lineStart[1])) {
            lineEnd = [this.posX, lineStart[1]+10]
        }
        else {
            lineEnd = [lineStart[0]+10, this.posY]
        }
            
        myObstacles.push(new component(lineStart[0], lineStart[1], "black", lineEnd[0], lineEnd[1], "line", "addedObs"+addedObsIter));
        addedObsIter += 1;
        window.lineInit  = false;
    }
}

function obsCircCenter(action) {
    button = action[0]
    posX   = action[1]
    posY   = action[2]

    if (button == 0) {
        circCenter = [posX, posY];
        window.circInit  = true;
    }
}

function obsCircEnd(action) {
    button = action[0]
    posX   = action[1]
    posY   = action[2]

    if (button == 0) {
        circEnd = [posX, posY]
        rad     = Math.sqrt(Math.pow(circCenter[0]-circEnd[0], 2) + Math.pow(circCenter[1]-circEnd[1], 2))

        myObstacles.push(new component(rad, 10, "black", circCenter[0], circCenter[1], "circle_empty", "addedObs"+addedObsIter));
        addedObsIter += 1;
        window.circInit  = false;
    }
}