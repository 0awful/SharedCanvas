// @flow
import { setTimerValue, setDrawingEnabled } from '../actionCreators';
import { subscribeToTimer } from './sockets';
import store from '../store';

// TODO: handle call with illegal time value (0 or less)
const startTimer = duration => {
  store.dispatch(setTimerValue(duration));
  subscribeToTimer(duration, (err, newValue) => {
    store.dispatch(setTimerValue(newValue));
    if (newValue === 0) {
      store.dispatch(setDrawingEnabled(true));
    }
  });
};

export default startTimer;
