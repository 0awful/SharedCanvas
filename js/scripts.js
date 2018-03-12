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
});

$('#canvas').mouseleave(function(e) {
  paint = false;
});

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();
var paint;

function addClick(x, y, dragging) {
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColor.push(curColor);
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
    context.strokeStyle = clickColor[i];
    context.stroke();
  }
}
