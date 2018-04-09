import { SET_TIMER } from './actions';

export default function setTimer(timerValue) {
  return { type: SET_TIMER, payload: timerValue };
}
