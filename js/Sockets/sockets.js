import openSocket from 'socket.io-client';

const socket = openSocket('/');

function subscribeToTimer(timerDuration, cb) {
  socket.on('timer', timerValue => cb(null, timerValue));
  socket.emit('subscribeToTimer', 1000, timerDuration);
}

function requestKey() {
  socket.emit('requestKey');

  const keyPromise = new Promise(resolve => {
    socket.on('key', key => resolve(key));
  });
  return keyPromise;
}

function emitDrawing(key, drawing) {
  socket.emit('drawing', key, drawing);
}

const connect = (updateDrawingsCB, newDrawingCB) => {
  socket.on('updateDrawings', drawings => {
    updateDrawingsCB(drawings);
  });

  socket.on('drawing', (key, drawing) => {
    newDrawingCB(key, drawing);
  });
};

export { subscribeToTimer, requestKey, emitDrawing, connect };
