// @flow
import openSocket from 'socket.io-client';

const socket = openSocket('/');

function subscribeToTimer(
  timerDuration: number,
  cb: (?string, number) => void
) {
  socket.on('timer', timerValue => cb(null, timerValue));
  socket.emit('subscribeToTimer', 1000, timerDuration);
}

function requestKey() {
  socket.emit('requestKey');

  // $FlowFixMe dunno how it wants me to denote this
  const keyPromise = new Promise(resolve => {
    socket.on('key', key => resolve(key));
  });
  return keyPromise;
}

function emitDrawing(key: string, drawing: Drawing | false) {
  socket.emit('drawing', key, drawing);
}

const connect = (
  updateDrawingsCB: ({ string: [Drawing] }) => void,
  newDrawingCB: (string, Drawing) => void
) => {
  socket.on('updateDrawings', drawings => {
    updateDrawingsCB(drawings);
  });

  socket.on('drawing', (key: string, drawing: Drawing) => {
    newDrawingCB(key, drawing);
  });
};

export { subscribeToTimer, requestKey, emitDrawing, connect };
