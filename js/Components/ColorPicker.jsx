// @flow
import React from 'react';
import Paper from 'material-ui/Paper';

const colorPickerStyle = {
  left: 0,
  bottom: 0,
  backgroundColor: 'rgb(0,188,212)',
  position: 'fixed',
  height: 100,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'grid',
  gridTemplateRows: 'repeat(3,1fr)',
  gridTemplateColumns: 'repeat(3,1fr)'
};

// const pickerStyle = {
//   gridColumnStart: 2,
//   gridRowStart: 2,
//   fontSize: '20px'
// };

const ColorPicker = () => (
  <Paper id="ColorPickerBody" style={colorPickerStyle} zDepth={4} circle>
    <input type="color" />
  </Paper>
);

export default ColorPicker;
