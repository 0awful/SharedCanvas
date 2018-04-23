// @flow
import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';

const timerStyle = {
  right: 0,
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

const pStyle = {
  gridColumnStart: 2,
  gridRowStart: 2,
  fontSize: '20px'
};

const Timer = (props: { timerValue: number, painting: boolean }) => {
  let displayValue = props.timerValue;
  if (props.timerValue === 0) {
    if (props.painting) {
      displayValue = 'Painting...';
    } else {
      displayValue = 'Ready!';
    }
  }

  return (
    <Paper id="Timer" style={timerStyle} zDepth={4} circle>
      <p id="TimerValue" style={pStyle} className="unselectable">
        {displayValue}
      </p>
    </Paper>
  );
};

const mapStateToProps = (state: { timerValue: number, painting: boolean }) => ({
  timerValue: state.timerValue,
  painting: state.painting
});

export default connect(mapStateToProps)(Timer);
