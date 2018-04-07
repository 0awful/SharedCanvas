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

const Canvas = () => (
  <div id="grid" style={gridStyle}>
    <Paper style={paperStyle} zDepth={5}>
      <canvas style={canvasStyle} />
    </Paper>
  </div>
);

export default Canvas;
