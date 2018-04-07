import React from 'react';
import Paper from 'material-ui/Paper';

const paperStyle = {
  height: '1000px',
  width: '1000px',
  gridRowStart: 2,
  gridColumnStart: 2
};

const gridStyle = {
  display: 'grid',
  width: '100%',
  height: '100%',
  marginTop: '5%',
  marginBottom: '5%',
  gridTemplateColumns: 'auto 1000px auto',
  gridTemplateRows: 'minmax(5%, 10%) 1000px minmax(5%, 10%)'
};

const canvasStyle = {
  height: '1000px',
  width: '1000px'
};

//
// // define canvas specifications
// const canvasWidth = 1000;
// const canvasHeight = 1000;
//
//
//
// const canvasDiv = document.getElementById('canvasContainer');
// let canvas = document.createElement('canvas');
// canvas.setAttribute('width', canvasWidth);
// canvas.setAttribute('height', canvasHeight);
// canvas.setAttribute('id', 'canvas');
// canvasDiv.appendChild(canvas);
//
// // prettier-ignore
// if (typeof G_vmlCanvasManager !== 'undefined') { // eslint-disable-line camelcase
//   canvas = G_vmlCanvasManager.initElement(canvas); // eslint-disable-line no-undef
// }
// let context = canvas.getContext('2d');
//
//
// function render(drawingObject) {
//   const keys = Object.keys(drawingObject);
//   context = canvas.getContext('2d');
//
//   context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
//   // pull up the line array by line
//   for (let j = 0; j < keys.length; j += 1) {
//     const drawingArray = drawingObject[keys[j]];
//     context.lineJoin = 'round';
//
//     for (let i = 0; i < drawingArray.length; i += 1) {
//       context.beginPath();
//       if (drawingArray[i].dragging && i) {
//         context.moveTo(drawingArray[i - 1].x, drawingArray[i - 1].y);
//       } else {
//         context.moveTo(drawingArray[i].x, drawingArray[i].y);
//       }
//
//       context.lineTo(drawingArray[i].x, drawingArray[i].y);
//       context.closePath();
//       context.lineWidth = drawingArray[i].radius;
//       context.strokeStyle = drawingArray[i].clickColor;
//       context.stroke();
//     }
//   }
// }
//

const Canvas = () => (
  <div id="grid" style={gridStyle}>
    <Paper style={paperStyle} zDepth={5}>
      <canvas style={canvasStyle} />
    </Paper>
  </div>
);

export default Canvas;
