const keygen = require('./keygen.js');

const host = 'localhost';
const port = 9000;

const http = require('http');

const nodeStatic = require('node-static');

const staticFiles = new nodeStatic.Server(__dirname);

let drawings = {};
const sockets = [];

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
    if (drawings[key]) {
      const array = drawings[key];
      array.push(drawing);
      drawings[key] = array;
    } else {
      drawings[key] = [drawing];
    }
    socket.broadcast.emit('drawing', key, drawing);
  });

  socket.on('subscribeToTimer', (interval, timerValue) => {
    console.log('client is subscribing to timer with interval ', interval);
    let internalTimerValue = timerValue;
    const timer = setInterval(() => {
      internalTimerValue -= 1;
      socket.emit('timer', internalTimerValue);
      if (internalTimerValue === 0) {
        clearInterval(timer);
      }
    }, interval);
  });

  socket.on('requestKey', () => {
    console.log('client is requesting a key');
    const key = keygen.randomKey();
    console.log('serving key: ', key);
    socket.emit('key', key);
  });
}

io.on('connection', handleIO);
