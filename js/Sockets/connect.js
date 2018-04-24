// @flow

import { connect } from './sockets';
import store from '../store';
import { newDrawingObject, appendToEndOfLineWithKey } from '../actionCreators';

const updateDrawingsCB = (drawingObject: { string: [Drawing] }) => {
  store.dispatch(newDrawingObject(drawingObject));
};

const newDrawingsCB = (key: string, drawing: drawing) => {
  store.dispatch(appendToEndOfLineWithKey(key, drawing));
};

const openConnection = () => {
  connect(updateDrawingsCB, newDrawingsCB);
};

export default openConnection;
