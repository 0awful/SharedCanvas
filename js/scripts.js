/*
TODO: LARGE SCALE:

  refactor this disgusting speghetti code
  replace the buttons with a color picker
  make the timer better

  codesplit, because this is gross.






*/

import io from 'socket.io-client';

const initialRadius = 15;
const radiusFalloffModifier = 0.02;
let drawingObject = {};
let currentKey = '';

let paint;
let $;
let radius = initialRadius;
let lastX;
let lastY;

const socket = io.connect('/');
let currentLine = []; // eslint-disable-line prefer-const
const timerTemplate = 'Timer: <br>';
const timerReady = `${timerTemplate}Ready`;
const intialTimerValue = 10;
let timerRunning = false;

const timer = document.getElementById('timer');
timer.innerHTML = timerReady;

// create a tools object that represents the toolbar
const tools = document.getElementById('tools');

// define canvas specifications
const canvasWidth = 1000;
const canvasHeight = 1000;

// color specifications
const colorPurple = '#cb3594';
const colorGreen = '#659b41'; // eslint-disable-line no-unused-vars
const colorYellow = '#ffcf33'; // eslint-disable-line no-unused-vars
const colorBrown = '#986928'; // eslint-disable-line no-unused-vars
const colorRed = '#ff0000'; // eslint-disable-line no-unused-vars
const colorBlue = '#0000ff'; // eslint-disable-line no-unused-vars
const colorOrange = '#FFA500'; // eslint-disable-line no-unused-vars
const colorWhite = '#ffffff'; // eslint-disable-line no-unused-vars
const colorBlack = '#000000'; // eslint-disable-line no-unused-vars
const colorGray = '#D3D3D3'; // eslint-disable-line no-unused-vars

let curColor = colorPurple;

const changeColor = color => {
  curColor = color;
};

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
      break;
  }
  if (Math.floor(Math.random() * 2)) {
    return letter.toUpperCase();
  }
  return letter;
}

function refreshInk() {
  radius = initialRadius;
}

function updateTimer(value) {
  if (value === 0) {
    timer.innerHTML = timerReady;
    refreshInk();
  } else {
    timer.innerHTML = timerTemplate + value;
  }
}

function startTimer(value) {
  let givenValue = value;
  if (timerRunning === false) {
    timerRunning = true;
    updateTimer(givenValue);
    const timerInterval = setInterval(() => {
      givenValue -= 1;
      updateTimer(givenValue);
      if (value === 0) {
        timerRunning = false;
        clearInterval(timerInterval);
      }
    }, 1000);
  }
}

const canvasDiv = document.getElementById('canvasContainer');
let canvas = document.createElement('canvas');
canvas.setAttribute('width', canvasWidth);
canvas.setAttribute('height', canvasHeight);
canvas.setAttribute('id', 'canvas');
canvasDiv.appendChild(canvas);

// prettier-ignore
if (typeof G_vmlCanvasManager !== 'undefined') { // eslint-disable-line camelcase
  canvas = G_vmlCanvasManager.initElement(canvas); // eslint-disable-line no-undef
}
let context = canvas.getContext('2d');

changeColor(colorPurple);

function pushDrawing(drawing) {
  currentLine.push(drawing);
  drawingObject[currentKey] = currentLine;
}

function recieveDrawing(key, drawing) {
  drawingObject[key] = drawing;
}

function emitDrawing() {
  socket.emit('drawing', currentKey, currentLine);
}

function addClick(x, y, dragging) {
  if (radius <= 0) {
    paint = false;
    startTimer(intialTimerValue);
  } else {
    const drawing = {
      x,
      y,
      radius,
      dragging,
      clickColor: curColor
    };
    pushDrawing(drawing);
    emitDrawing(drawing);
    if (dragging) {
      const displaceX = Math.abs(lastX - x);
      const displaceY = Math.abs(lastY - y);
      const displacement = (displaceX ** 2 + displaceY ** 2) ** (1 / 2);
      radius -= radiusFalloffModifier * displacement;
    }
    lastX = x;
    lastY = y;
  }
}

function render() {
  const keys = Object.keys(drawingObject);
  context = canvas.getContext('2d');

  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  // pull up the line array by line
  for (let j = 0; j < keys.length; j += 1) {
    const drawingArray = drawingObject[keys[j]];
    context.lineJoin = 'round';

    for (let i = 0; i < drawingArray.length; i += 1) {
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

socket.on('connect', () => {});

socket.on('drawing', (key, drawing) => {
  recieveDrawing(key, drawing);
  render();
});

socket.on('disconnect', () => {});

socket.on('updateDrawings', drawings => {
  drawingObject = drawings;
  render();
});

$('#canvas').mousedown(e => {
  // eslint-disable-line no-undef
  let letter = '';
  letter = randomLetter() + randomLetter() + randomLetter() + randomLetter();
  currentKey = letter;

  const mouseX = e.pageX - this.offsetLeft;
  const mouseY = e.pageY - this.offsetTop;

  paint = true;
  addClick(mouseX, mouseY, false);
  render();
});

$('#canvas').mousemove(e => {
  // eslint-disable-line no-undef
  if (paint) {
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
    render();
  }
});

$('#canvas').mouseup(() => {
  paint = false;
  radius = 0;
  startTimer(intialTimerValue);
});

$('#canvas').mouseleave(() => {
  paint = false;
});
