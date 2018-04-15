// @flow
import React from 'react';
import { connect } from 'react-redux';

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
    <div>
      <p id="Timer">{displayValue}</p>
    </div>
  );
};

const mapStateToProps = state => ({
  timerValue: state.timerValue,
  painting: state.painting
});

export default connect(mapStateToProps)(Timer);
