import { SET_TIMER_VALUE } from './actions';

/* eslint-disable */

export function setTimerValue(timerValue) {
  return { type: SET_TIMER_VALUE, payload: timerValue };
}
