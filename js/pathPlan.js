for (i = 0; i<areaMap.length; i += 1) {
	areaMap[i] = intMAX;
}
path    = [];

function map(num) {
    return Math.floor(num);
}

function expToArr(pointExp) {
    return [pointExp%canvas.width, Math.floor(pointExp/canvas.width)]
}

function arrToExp(pointArr) {
    return (pointArr[0] + pointArr[1]*(canvas.width))
}

function parseIntPoint(point) {
    return [parseInt(point[0]), parseInt(point[1])];
}

// function nextBiggest(arr) incorporated from https://stackoverflow.com/a/17040125/6539635
function nextBiggest(arr) {
  let max = -Infinity, result = -Infinity;

  for (const value of arr) {
    const nr = Number(value)

    if (nr > max) {
      [result, max] = [max, nr] // save previous max
    } else if (nr < max && nr > result) {
      result = nr; // new second biggest
    }
  }

  return result;
}

// function copy(o) incorporated from https://www.codementor.io/@avijitgupta/deep-copying-in-js-7x6q8vh5d
function copy(o) {
   var output, v, key;
   output = Array.isArray(o) ? [] : {};
   for (key in o) {
       v = o[key];
       output[key] = (typeof v === "object") ? copy(v) : v;
   }
   return output;
}

start = [map(700), map(400)];
end   = [map(710), map(400)];

function generateBounds(point) {
    return [
            // arrToExp([point[0]-1, point[1]-1]),
            arrToExp([point[0],   point[1]-1]),
            // arrToExp([point[0]+1, point[1]-1]),
            arrToExp([point[0]-1, point[1]]),
            arrToExp([point[0]+1, point[1]]),
            // arrToExp([point[0]-1, point[1]+1]),
            arrToExp([point[0],   point[1]+1]),
            // arrToExp([point[0]+1, point[1]+1]),
        ];
}

function checkPath() {
    boundPoints = generateBounds(start);
    for (i = 0; i < boundPoints.length; i += 1) {
        if (areaMap[boundPoints[i]] < intMAX) {
            return true;
        }
    }
    return false;
}

function generateVals(point) {
    boundPoints = generateBounds(point);
    pointVal    = areaMap[arrToExp(point)];
    for (genVal = 0; genVal < boundPoints.length; genVal += 1) {
        boundVal = boundPoints[genVal]
        if (areaMap[boundVal] > pointVal + 1) {
            areaMap[boundVal] = pointVal + 1;
        }
    }
}

makePath = function() {
    start = [map(myGamePiece.posX), map(myGamePiece.posY)]
    areaMap[arrToExp(end)] = 1
    generateVals(end)
    pathPoints  = [end]
    donePoints  = []
    checkPoints = []
    iteration   = 0

    while (!checkPath()) {
        iteration  +=  1
        checkPoints = []

        for (i = 0; i < pathPoints.length; i += 1) {
            if (checkPoints.indexOf(pathPoints[i]) == -1) {
                checkPoints.push(pathPoints[i])
            }
        }
        
        for (i = 0; i < checkPoints.length; i += 1) {
            if (!(donePoints.includes(checkPoints[i]))) {
                donePoints.push(checkPoints[i])
                pointBounds = generateBounds(checkPoints[i])
                
                for (j = 0; j < pointBounds.length; j += 1) {
                    presentPoint = expToArr(pointBounds[j])
                    generateVals(presentPoint)
                    if  (pathPoints.toString().indexOf(presentPoint) == -1) {
                        pathPoints.push(presentPoint)
                    }
                }
            }
        }
    }
}

extendPath = function() {
    start = [map(myGamePiece.posX), map(myGamePiece.posY)]
    areaMap[arrToExp(end)] = 1
    pathPoints   = []
    donePoints   = []
    checkPoints  = []
    displayRatio = 0
    checkVal    = nextBiggest(areaMap)
    for (i = 0; i < areaMap.length; i += 1) {
        if (areaMap[i] == checkVal) {
            pathPoints.push(expToArr(i))
        }
    }

    function frame() {
        let elem = document.getElementById("myBar");
        if (displayRatio >= 1) {
            clearInterval(id);
        } else {
            elem.style.width = displayRatio*100 + "%";
        }
    }

    while (!checkPath()) {
        checkPoints = []

        for (i = 0; i < pathPoints.length; i += 1) {
            if (checkPoints.indexOf(pathPoints[i]) == -1) {
                checkPoints.push(pathPoints[i])
            }
        }
        
        for (i = 0; i < checkPoints.length; i += 1) {
            if (!(donePoints.includes(checkPoints[i]))) {
                donePoints.push(checkPoints[i])
                pointBounds = generateBounds(checkPoints[i])
                
                displayRatio = Math.max(displayRatio, Math.abs(1 - Math.sqrt(Math.pow((start[0] - checkPoints[i][0]), 2) + Math.pow((start[1] - checkPoints[i][1]), 2))/
                                                                   Math.sqrt(Math.pow((start[0] -            end[0]), 2) + Math.pow((start[1] -            end[1]), 2))));
                displayRatio = Math.min(displayRatio, 1)
                id = setInterval(frame, 10);

                
                for (j = 0; j < pointBounds.length; j += 1) {
                    
                    presentPoint = expToArr(pointBounds[j])
                    console.log(displayRatio)
                    generateVals(presentPoint)
                    if  (pathPoints.toString().indexOf(presentPoint) == -1) {
                        pathPoints.push(presentPoint)
                    }
                }
            }
        }        
    }
}

planPath = function() {
    path    = []
    point   = start
    while ((point[0] != end[0]) || (point[1] != end[1])) {
        presVal = areaMap[point[0] + point[1] * canvas.width]
        boundPoints = generateBounds(point)
        for (i = 0; i < boundPoints.length; i += 1) {
            newPointExp = boundPoints[i]
            newPointArr = expToArr(newPointExp)
            if (areaMap[newPointExp] < presVal) {
                path.push(point)
                point   = newPointArr
                presVal = areaMap[newPointExp]
                break;
            }
        }
    }
    path.push(end)
    console.log(path)
    setTimeout(function() {
        document.getElementById("myBar").style.width = 3 + '%';
    }, 2000);
}

drawPath = function() {
    myPath.splice(0, myPath.length)
    for (i = 0; i < path.length; i += 1) {
        myPath.push(new component(2, 2, "blue", path[i][0], path[i][1], "rectangle"))
    }
}

sameEnd = true;

function pathPlanner() {
    if (sameEnd) {
        extendPath();
    }
    else {
        makePath();
    }
    planPath();
    drawPath();
}

shortcut.add("P",function() {
    console.time("timer")
    pathPlanner();
    console.timeEnd("timer")
},{
    'type': 'keydown'
});

shortcut.add("P",function() {
    return
},{
    'type': 'keyup'
});