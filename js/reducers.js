import {
  SET_TIMER_VALUE,
  SET_KEY_VALUE,
  SET_BRUSH_COLOR,
  SET_DRAWING_ENABLED,
  SET_PAINTING,
  SET_RADIUS,
  SET_RADIUS_MODIFIER,
  APPEND_TO_DRAWING_OBJECT,
  APPEND_TO_CURRENT_LINE,
  SET_CURRENT_LINE,
  NEW_DRAWING_OBJECT
} from './actions';

const DEFAULT_STATE = {
  timerValue: 0,
  keyValue: '',
  currentLine: [],
  drawingObject: {},
  brushColorDefault: 'rgb(245,245,220)',
  brushColor: 'rgb(245,245,220)',
  drawingEnabled: true,
  painting: false,
  radius: 15,
  radiusModifier: '0.02'
};

const setTimerValue = (state, action) =>
  Object.assign({}, state, { timerValue: action.payload });

const setKeyValue = (state, action) =>
  Object.assign({}, state, { keyValue: action.payload });

const setBrushColor = (state, action) =>
  Object.assign({}, state, { brushColor: action.payload });

const setDrawingEnabled = (state, action) =>
  Object.assign({}, state, { drawingEnabled: action.payload });

const setPainting = (state, action) =>
  Object.assign({}, state, { painting: action.payload });

const setRadiusModifier = (state, action) =>
  Object.assign({}, state, { radiusModifier: action.payload });

const setRadius = (state, action) =>
  Object.assign({}, state, { radius: action.payload });

const appendToCurrentLine = (state, action) => {
  const newArray = state.currentLine.slice();
  newArray.push(action.payload);
  return Object.assign({}, state, {
    currentLine: newArray
  });
};
const appendToDrawingObject = (state, action) => {
  const newDrawingObject = Object.assign({}, state.drawingObject);

  newDrawingObject[action.payload.key] = action.payload.value;
  return Object.assign({}, state, {
    drawingObject: newDrawingObject
  });
};

const newDrawingObject = (state, action) =>
  Object.assign({}, state, { drawingObject: action.payload });

const setCurrentLine = (state, action) =>
  Object.assign({}, state, { currentLine: action.payload });

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_TIMER_VALUE:
      return setTimerValue(state, action);
    case SET_KEY_VALUE:
      return setKeyValue(state, action);
    case SET_BRUSH_COLOR:
      return setBrushColor(state, action);
    case SET_DRAWING_ENABLED:
      return setDrawingEnabled(state, action);
    case SET_PAINTING:
      return setPainting(state, action);
    case SET_RADIUS:
      return setRadius(state, action);
    case SET_RADIUS_MODIFIER:
      return setRadiusModifier(state, action);
    case APPEND_TO_CURRENT_LINE:
      return appendToCurrentLine(state, action);
    case APPEND_TO_DRAWING_OBJECT:
      return appendToDrawingObject(state, action);
    case NEW_DRAWING_OBJECT:
      return newDrawingObject(state, action);
    case SET_CURRENT_LINE:
      return setCurrentLine(state, action);
    default:
      return state;
  }
};

export default rootReducer;
