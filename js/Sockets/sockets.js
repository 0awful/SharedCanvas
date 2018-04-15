import openSocket from 'socket.io-client';

const socket = openSocket('/');

function subscribeToTimer(timerDuration, cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000, timerDuration);
}

function requestKey() {
  console.log('request key called');
  socket.emit('requestKey');

  const keyPromise = new Promise(resolve => {
    console.log('in promise body');
    socket.on('key', key => resolve(key));
  });
  return keyPromise;
}

function emitDrawing(key, line) {
  socket.emit('drawing', key, line);
}

export { subscribeToTimer, requestKey, emitDrawing };
