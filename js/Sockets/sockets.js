import openSocket from 'socket.io-client';

const socket = openSocket('/');

function subscribeToTimer(timerDuration, cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000, timerDuration);
}
export default subscribeToTimer;
