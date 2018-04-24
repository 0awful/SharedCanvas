// @flow

import {
  SET_TIMER_VALUE,
  SET_KEY_VALUE,
  SET_BRUSH_COLOR,
  SET_DRAWING_ENABLED,
  SET_PAINTING,
  SET_RADIUS,
  SET_RADIUS_MODIFIER,
  APPEND_TO_CURRENT_LINE,
  APPEND_TO_DRAWING_OBJECT,
  APPEND_TO_END_OF_LINE_WITH_KEY,
  SET_CURRENT_LINE,
  NEW_DRAWING_OBJECT,
  REMOVE_LINE_WITH_KEY
} from './actions';

export function setTimerValue(timerValue: number) {
  return { type: SET_TIMER_VALUE, payload: timerValue };
}

export function setKeyValue(keyValue: string) {
  return { type: SET_KEY_VALUE, payload: keyValue };
}

export function appendToCurrentLine(lineValue: Drawing | false) {
  return { type: APPEND_TO_CURRENT_LINE, payload: lineValue };
}

export function appendToDrawingObject(key: string, value: Drawing | false) {
  return {
    type: APPEND_TO_DRAWING_OBJECT,
    payload: { key, value }
  };
}

export function removeLineWithKey(key: string) {
  return {
    type: REMOVE_LINE_WITH_KEY,
    payload: key
  };
}

export function appendToEndOfLineWithKey(key: string, value: Drawing) {
  return {
    type: APPEND_TO_END_OF_LINE_WITH_KEY,
    payload: { key, value }
  };
}

export function newDrawingObject(drawingObject: { string: [Drawing | false] }) {
  return {
    type: NEW_DRAWING_OBJECT,
    payload: drawingObject
  };
}

export function setCurrentLine(value: [Drawing | false]) {
  return { type: SET_CURRENT_LINE, payload: value };
}

export function setBrushColor(brushColor: string) {
  return { type: SET_BRUSH_COLOR, payload: brushColor };
}

export function setDrawingEnabled(drawingEnabled: boolean) {
  return { type: SET_DRAWING_ENABLED, payload: drawingEnabled };
}

export function setPainting(painting: boolean) {
  return { type: SET_PAINTING, payload: painting };
}

export function setRadius(radius: number) {
  return { type: SET_RADIUS, payload: radius };
}

export function setRadiusFalloffModifier(radiusModifier: number) {
  return { type: SET_RADIUS_MODIFIER, payload: radiusModifier };
}
