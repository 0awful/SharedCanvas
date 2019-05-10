// @flow
import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';

const timerStyle = {
  backgroundColor: 'rgb(0,188,212)'
};

const pStyle = {
  gridColumnStart: 2,
  gridRowStart: 2,
  fontSize: '20px'
};

const Timer = (props: {
  timerValue: number,
  painting: boolean,
  brushColor: string
}) => {
  let displayValue = props.timerValue;
  if (props.timerValue === 0) {
    if (props.painting) {
      displayValue = 'Painting...';
    } else {
      displayValue = 'Ready!';
    }
  }

  timerStyle.backgroundColor = props.brushColor;
  return (
    <Paper
      id="Timer"
      style={timerStyle}
      zDepth={4}
      className="circle timer"
      circle
    >
      <p id="TimerValue" style={pStyle}>
        {displayValue}
      </p>
    </Paper>
  );
};

const mapStateToProps = (state: {
  timerValue: number,
  painting: boolean,
  brushColor: string
}) => ({
  timerValue: state.timerValue,
  painting: state.painting,
  brushColor: state.brushColor
});

export default connect(mapStateToProps)(Timer);
