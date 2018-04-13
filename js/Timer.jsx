// @flow
import React from 'react';
import { connect } from 'react-redux';
// import setDrawingState from './actions';

const Timer = (props: { timerValue: number }) => (
  <div>
    <p id="Timer">{props.timerValue}</p>
  </div>
);

const mapStateToProps = state => ({
  timerValue: state.timerValue
});
// const mapDispatchToProps = (dispatch: Function) => ({
//   handleDrawingStateChange(event) {
//     dispatch(setDrawingState);
//   }
// });

export default connect(mapStateToProps)(Timer);
