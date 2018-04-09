import { SET_TIMER } from './actions';

const DEFAULT_STATE = {
  timerValue: 0
};

const setTimer = (state, action) => Object.assign({}, state, { timerValue: action.payload });

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_TIMER:
      return setTimer(state, action);
    default:
      return state;
  }
};

export default rootReducer;
