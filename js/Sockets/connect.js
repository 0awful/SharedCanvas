// @flow

import { connect } from './sockets';
import store from '../store';
import { newDrawingObject, appendToEndOfLineWithKey } from '../actionCreators';

const updateDrawings = (drawingObject: { string: [Drawing] }) => {
  store.dispatch(newDrawingObject(drawingObject));
};

const newDrawings = (key: string, drawing: Drawing) => {
  store.dispatch(appendToEndOfLineWithKey(key, drawing));
};

const openConnection = () => {
  // $FlowFixMe Here flow thinks newDrawings is string, any and not string, Drawing...
  connect((updateDrawings, newDrawings));
};

export default openConnection;
