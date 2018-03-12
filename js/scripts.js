// create a tools object that represents the toolbar
let tools = document.getElementById('tools');

// set this object to contain some basic things
tools.innerHTML = `

<p> red </p>
<p> blue </p>
<p> yellow </p>
<p> green </p>
<p> purple </p>
<p> orange </p>
<p> pink </p>
<p> teal </p>
<p> white </p>
<p> black </p>
`;

// // get our canvas and it's container
// var canvas = document.getElementById('canvas');
// var canvasContainer = document.getElementById('canvasContainer');
//

//
// // get the canvas context
// context = canvas.getContext('2d');

let canvasWidth = 1000;
let canvasHeight = 1000;

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

// // make the canvas occupy the container and update whenever the container changes size, like if the browser changes size
// window.onload = window.onresize = function() {
//   canvas.width = canvasContainer.innerWidth;
//   canvas.height = canvasContainer.innerHeight;
// };

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
}

function redraw() {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

  context.strokeStyle = '#df4b26';
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
    context.stroke();
  }
}
