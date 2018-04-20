import { connect } from './sockets';
import store from '../store';
import { newDrawingObject, appendToEndOfLineWithKey } from '../actionCreators';

const updateDrawingsCB = drawingObject => {
  store.dispatch(newDrawingObject(drawingObject));
};

const newDrawingsCB = (key, drawing) => {
  store.dispatch(appendToEndOfLineWithKey(key, drawing));
};

const openConnection = () => {
  connect(updateDrawingsCB, newDrawingsCB);
};

export default openConnection;
