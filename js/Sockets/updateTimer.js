import { setTimerValue } from '../actionCreators';
import store from '../store';

const updateTimer = newValue => {
  store.dispatch(setTimerValue(newValue));
};

export default updateTimer;
