import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import subscribeToTimer from './sockets';

const Timer = props => (
  <div>
    <p id="Timer">{props.timerValue}</p>
  </div>
);

Timer.propTypes = {
  timerValue: PropTypes.number
};

Timer.defaultProps = {
  timerValue: 0
};

const mapStateToProps = state => ({
  timerValue: state.timerValue
});
const mapDispatchToProps = (dispatch: Function) => ({
  handleDrawingStateChange(event) {
    dispatch(setDrawingState);
  }
});

export default connect(mapStateToProps)(Timer);
