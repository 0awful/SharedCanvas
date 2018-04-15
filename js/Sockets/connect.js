import { connect } from './sockets';
import store from '../store';
import { appendToDrawingObject, newDrawingObject } from '../actionCreators';

const updateDrawingsCB = drawingObject => {
  store.dispatch(newDrawingObject(drawingObject));
};

const newDrawingsCB = (key, line) => {
  store.dispatch(appendToDrawingObject(key, line));
};

const openConnection = () => {
  connect(updateDrawingsCB, newDrawingsCB);
};

export default openConnection;
