// @flow
/* eslint-disable */
export type Drawing =
  | {
      x: number,
      y: number,
      dragging: boolean,
      radius: number,
      color: string
    }
  | false;

export type AppState = {
  timerValue: number,
  keyValue: string,
  currentLine: [Drawing],
  drawingObject: { string: [Drawing] },
  brushColorDefault: string,
  brushColor: string,
  drawingEnabled: boolean,
  painting: boolean,
  radius: number,
  radiusModifier: number
};
