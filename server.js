const keygen = require('./keygen.js');

const host = 'localhost';
const port = 9000;

const http = require('http');

const nodeStatic = require('node-static');

const staticFiles = new nodeStatic.Server(__dirname);

let drawings = {};
const sockets = [];

// TODO: create a unified sockets method

function handleHTTP(req, res) {
  if (req.method === 'GET') {
    // TODO: DEFINITELY REPLACE THIS WITH AN AUTHENTICATED WAY OF DOING THIS
    if (req.url === '/resetcanvas') {
      drawings = [];
    }
    if (req.url === '/') {
      req.addListener('end', () => {
        req.url = req.url.replace(/.*/, '/site.html');
        staticFiles.serve(req, res);
      });
      req.resume();
    } else {
      staticFiles.serve(req, res);
      req.resume();
    }
  } else {
    res.writeHead(403);
    res.end();
  }
}

const httpServe = http.createServer(handleHTTP).listen(port, host);

const io = require('socket.io').listen(httpServe);

function handleIO(socket) {
  function disconnect() {
    sockets.splice(sockets.indexOf(socket), 1);
  }

  sockets.push(socket);
  socket.emit('updateDrawings', drawings);

  socket.on('disconnect', disconnect);
  socket.on('drawing', (key, drawing) => {
    console.log(key, drawing);
    drawings[key] = drawing;
    socket.broadcast.emit('drawing', key, drawing);
  });
}

// TODO: Create a unified sockets architecture

io.on('connection', handleIO);

io.on('connection', client => {
  client.on('subscribeToTimer', (interval, timerValue) => {
    console.log('client is subscribing to timer with interval ', interval);
    let internalTimerValue = timerValue;
    const timer = setInterval(() => {
      internalTimerValue -= 1;
      client.emit('timer', internalTimerValue);
      if (internalTimerValue === 0) {
        clearInterval(timer);
      }
    }, interval);
  });
  client.on('requestKey', () => {
    console.log('client is requesting a key');
    const key = keygen.randomKey();
    console.log('serving key: ', key);
    client.emit('key', key);
  });
});
