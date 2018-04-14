import {
  SET_TIMER_VALUE,
  SET_KEY_VALUE,
  SET_BRUSH_COLOR,
  SET_DRAWING_ENABLED,
  SET_PAINTING,
  SET_RADIUS,
  SET_RADIUS_MODIFIER,
  SET_CURRENT_LINE
} from './actions';

const DEFAULT_STATE = {
  timerValue: 15,
  keyValue: '',
  brushColor: '#000000',
  drawingEnabled: false,
  painting: false,
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

const setRadiusModifier = (state, action) => {
  Object.assign({}, state, { radiusModifier: action.payload });
};
const setRadius = (state, action) => {
  Object.assign({}, state, { radius: action.payload });
};
const setCurrentLine = (state, action) => {
  Object.assign({}, state, { radius: action.payload });
};

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
    case SET_RADIUS_MODIFIER:
      return setRadiusModifier(state, action);
    case SET_RADIUS:
      return setRadius(state, action);
    case SET_CURRENT_LINE:
      return setCurrentLine(state, action);
    default:
      return state;
  }
};

export default rootReducer;
