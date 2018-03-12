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

let timerTemplate = 'Timer: <br>';
let timerReady = timerTemplate + 'Ready';
let intialTimerValue = 15;
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
  var mouseX = e.pageX - this.offsetLeft;
  var mouseY = e.pageY - this.offsetTop;

  paint = true;
  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  redraw();
});

$('#canvas').mousemove(function(e) {
  if (paint) {
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    redraw();
  }
});

$('#canvas').mouseup(function(e) {
  paint = false;
  radius = 0;
  startTimer(intialTimerValue);
});

$('#canvas').mouseleave(function(e) {
  paint = false;
});

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

let radius = initialRadius;
let lastX;
let lastY;

function pushDrawing(drawing) {
  clickX.push(drawing.x);
  clickY.push(drawing.y);
  radiusArray.push(drawing.radius);
  clickDrag.push(drawing.dragging);
  clickColor.push(drawing.clickColor);
}

function emitDrawing(drawing) {
  console.log(drawing);
  socket.emit('drawing', drawing);
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
      displacement = displaceX ** 2 + displaceY ** 2;
      radius = radius - radiusFalloffModifier * displacement;
    }
    lastX = x;
    lastY = y;
  }
}

function redraw() {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

  context.lineJoin = 'round';
  context.lineWidth = 5;

  for (var i = 0; i < clickX.length; i++) {
    context.beginPath();
    if (clickDrag[i] && i) {
      context.moveTo(clickX[i - 1], clickY[i - 1]);
    } else {
      context.moveTo(clickX[i] - 1, clickY[i]);
    }
    context.lineTo(clickX[i], clickY[i]);
    context.closePath();
    context.lineWidth = radiusArray[i];
    context.strokeStyle = clickColor[i];
    context.stroke();
  }
}

var socket = io.connect('/');
socket.on('connect', function() {
  console.log('Connected!');
  console.log(socket);
});

socket.on('drawing', function(drawing) {
  console.log(drawing);
  pushDrawing(drawing);
  redraw();
});

socket.on('disconnect', function() {
  console.log('disconnected');
});

socket.on('updateDrawings', function(drawings) {
  for (let i = 0; i < drawings.length; i++) {
    pushDrawing(drawings[i]);
  }
  redraw();
});
