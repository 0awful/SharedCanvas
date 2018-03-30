/*
TODO: LARGE SCALE:

  refactor this disgusting speghetti code
  replace the buttons with a color picker
  make the timer better

  codesplit, because this is gross.






*/

// create a tools object that represents the toolbar
let tools = document.getElementById('tools');

// set this object to contain some basic things
tools.innerHTML = `

<input id="purple" type="button" value="purple" onclick="changeColor(colorPurple);" />
<input id="Green" type="button" value="Green" onclick="changeColor(colorGreen);" />
<input id="Yellow" type="button" value="Yellow" onclick="changeColor(colorYellow);" />
<input id="Brown" type="button" value="Brown" onclick="changeColor(colorBrown);" />
<input id="Red" type="button" value="Red" onclick="changeColor(colorRed);" />
<input id="Blue" type="button" value="Blue" onclick="changeColor(colorBlue);" />
<input id="Orange" type="button" value="Orange" onclick="changeColor(colorOrange);" />
<input id="White" type="button" value="White" onclick="changeColor(colorWhite);" />
<input id="Black" type="button" value="Black" onclick="changeColor(colorBlack);" />
<input id="Gray" type="button" value="Gray" onclick="changeColor(colorGray);" />


`;

function randomLetter() {
  let letter = '';
  switch (Math.floor(Math.random() * 26)) {
    case 0:
      letter = 'a';
      break;
    case 1:
      letter = 'b';
      break;
    case 2:
      letter = 'c';
      break;
    case 3:
      letter = 'd';
      break;
    case 4:
      letter = 'e';
      break;
    case 5:
      letter = 'f';
      break;
    case 6:
      letter = 'g';
      break;
    case 7:
      letter = 'h';
      break;
    case 8:
      letter = 'i';
      break;
    case 9:
      letter = 'j';
      break;
    case 10:
      letter = 'k';
      break;
    case 11:
      letter = 'l';
      break;
    case 12:
      letter = 'm';
      break;
    case 13:
      letter = 'n';
      break;
    case 14:
      letter = 'o';
      break;
    case 15:
      letter = 'p';
      break;
    case 16:
      letter = 'q';
      break;
    case 17:
      letter = 'r';
      break;
    case 18:
      letter = 's';
      break;
    case 19:
      letter = 't';
      break;
    case 20:
      letter = 'u';
      break;
    case 21:
      letter = 'v';
      break;
    case 22:
      letter = 'w';
      break;
    case 23:
      letter = 'x';
      break;
    case 24:
      letter = 'y';
      break;
    case 25:
      letter = 'z';
      break;
    default:
      console.error('error in randomLetterFunction');
      break;
  }
  if (Math.floor(Math.random() * 2)) {
    return letter.toUpperCase();
  } else {
    return letter;
  }
}

let timerTemplate = 'Timer: <br>';
let timerReady = timerTemplate + 'Ready';
let intialTimerValue = 10;
let timerRunning = false;

let timer = document.getElementById('timer');
timer.innerHTML = timerReady;

function refreshInk() {
  radius = initialRadius;
}

function updateTimer(value) {
  if (value == 0) {
    timer.innerHTML = timerReady;
    refreshInk();
  } else {
    timer.innerHTML = timerTemplate + value;
  }
}

function startTimer(value) {
  if (timerRunning == false) {
    timerRunning = true;
    updateTimer(value);
    timerInterval = setInterval(function() {
      value--;
      updateTimer(value);
      if (value == 0) {
        timerRunning = false;
        clearInterval(timerInterval);
      }
    }, 1000);
  }
}

// define canvas specifications
let canvasWidth = 1000;
let canvasHeight = 1000;

// color specifications
let colorPurple = '#cb3594';
let colorGreen = '#659b41';
let colorYellow = '#ffcf33';
let colorBrown = '#986928';
let colorRed = '#ff0000';
let colorBlue = '#0000ff';
let colorOrange = '#FFA500';
let colorWhite = '#ffffff';
let colorBlack = '#000000';
let colorGray = '#D3D3D3';

let curColor = colorPurple;
let clickColor = new Array();
let initialRadius = 15;
let radiusFalloffModifier = 0.02;
let radiusArray = new Array();
let drawingObject = {};
let currentKey = '';

let canvasDiv = document.getElementById('canvasContainer');
canvas = document.createElement('canvas');
canvas.setAttribute('width', canvasWidth);
canvas.setAttribute('height', canvasHeight);
canvas.setAttribute('id', 'canvas');
canvasDiv.appendChild(canvas);
if (typeof G_vmlCanvasManager != 'undefined') {
  canvas = G_vmlCanvasManager.initElement(canvas);
}
let context = canvas.getContext('2d');

function changeColor(color) {
  curColor = color;
}

$('#canvas').mousedown(function(e) {
  let letter = '';
  letter = randomLetter() + randomLetter() + randomLetter() + randomLetter();
  currentKey = letter;

  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;

  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, false);
  render();
});

$('#canvas').mousemove(function(e) {
  if (paint) {
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    render();
  }
});

$('#canvas').mouseup(function(e) {
  paint = false;
  radius = 0;
  console.log(drawingObject);
  startTimer(intialTimerValue);
});

$('#canvas').mouseleave(function(e) {
  paint = false;
});

var paint;

let radius = initialRadius;
let lastX;
let lastY;

let currentLine = new Array();

function pushDrawing(drawing) {
  currentLine.push(drawing);
  drawingObject[currentKey] = currentLine;
}

function recieveDrawing(key, drawing) {
  drawingObject[key] = drawing;
}

function emitDrawing(drawing) {
  console.log('drawingSent');
  socket.emit('drawing', currentKey, currentLine);
}

function addClick(x, y, dragging) {
  if (radius <= 0) {
    paint = false;
    startTimer(intialTimerValue);
  } else {
    drawing = {
      x: x,
      y: y,
      radius: radius,
      dragging: dragging,
      clickColor: curColor
    };
    pushDrawing(drawing);
    emitDrawing(drawing);
    if (dragging) {
      displaceX = Math.abs(lastX - x);
      displaceY = Math.abs(lastY - y);
      displacement = (displaceX ** 2 + displaceY ** 2) ** (1 / 2);
      radius = radius - radiusFalloffModifier * displacement;
    }
    lastX = x;
    lastY = y;
  }
}

function render() {
  let keys = Object.keys(drawingObject);
  context = canvas.getContext('2d');

  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  // pull up the line array by line
  for (let j = 0; j < keys.length; j++) {
    let drawingArray = drawingObject[keys[j]];
    context.lineJoin = 'round';

    for (let i = 0; i < drawingArray.length; i++) {
      context.beginPath();
      if (drawingArray[i].dragging && i) {
        context.moveTo(drawingArray[i - 1].x, drawingArray[i - 1].y);
      } else {
        context.moveTo(drawingArray[i].x, drawingArray[i].y);
      }

      context.lineTo(drawingArray[i].x, drawingArray[i].y);
      context.closePath();
      context.lineWidth = drawingArray[i].radius;
      context.strokeStyle = drawingArray[i].clickColor;
      context.stroke();
    }
  }
}

var socket = io.connect('/');
socket.on('connect', function() {
  console.log('Connected!');
});

socket.on('drawing', function(key, drawing) {
  console.log('drawing recieved');
  recieveDrawing(key, drawing);
  render();
});

socket.on('disconnect', function() {
  console.log('disconnected');
});

socket.on('updateDrawings', function(drawings) {
  console.log('updateDrawings');
  drawingObject = drawings;
  console.log('Drawing Object', drawingObject);
  render();
});
