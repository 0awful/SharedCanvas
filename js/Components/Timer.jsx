// @flow
import React from 'react';
import { connect } from 'react-redux';

const Timer = (props: { timerValue: number }) => (
  <div>
    <p id="Timer">{props.timerValue}</p>
  </div>
);

const mapStateToProps = state => ({
  timerValue: state.timerValue
});

export default connect(mapStateToProps)(Timer);
