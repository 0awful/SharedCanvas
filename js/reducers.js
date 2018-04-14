import { SET_TIMER_VALUE } from './actions';

const DEFAULT_STATE = {
  timerValue: 15
};

const setTimerValue = (state, action) =>
  Object.assign({}, state, { timerValue: action.payload });

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_TIMER_VALUE:
      return setTimerValue(state, action);
    default:
      return state;
  }
};

export default rootReducer;
