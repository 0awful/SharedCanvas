const stores = require('./server/stores.js');

const host = '0.0.0.0';
let port = 9000;

/* eslint-disable */
if (process.env.NODE_ENV === 'development') {
  /* eslint-enable */
  port = 3000;
}

const http = require('http');

const nodeStatic = require('node-static');

const staticFiles = new nodeStatic.Server(__dirname);

let drawings = {};
const sockets = [];
const store = new stores.KeyStore();

function handleHTTP(req, res) {
	console.log(req.url)
  if (req.method === 'GET') {
    // TODO: DEFINITELY REPLACE THIS WITH AN AUTHENTICATED WAY OF DOING THIS
    if (req.url === '/resetcanvas') {
      drawings = {};
    }
    if (req.url === '/logs') {
      console.log(drawings);
    }
    if (req.url === '/') {
			console.log("req.url trigged", req.url)
      req.addListener('end', () => {
        req.url = req.url.replace('/', 'dist/index.html');
        staticFiles.serve(req, res);
      });
      req.resume();
    } else {
			// req.addListener('end', () => {
				console.log("before replace", req.url);
				req.url = req.url.replace(req.url, `dist/${req.url}`);
				console.log("after replace", req.url);
        staticFiles.serve(req, res);
      // });
      req.resume();
    }
  } else {
    res.writeHead(403);
    res.end();
  }
}

const httpServe = http.createServer(handleHTTP).listen(port, host);
console.log('server is listening on ', port);

const io = require('socket.io').listen(httpServe);

function handleIO(socket) {
  function disconnect() {
    sockets.splice(sockets.indexOf(socket), 1);
  }

  sockets.push(socket);

  socket.emit('updateDrawings', drawings);

  socket.on('disconnect', disconnect);

  socket.on('drawing', (key, drawing) => {
    if (store.checkKey(key)) {
      if (drawings[key]) {
        const array = drawings[key];
        array.push(drawing);
        drawings[key] = array;
      } else {
        drawings[key] = [drawing];
      }
      socket.broadcast.emit('drawing', key, drawing);
    } else {
      console.log('illegalKey');
    }
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
    const key = store.guardedKey();
    console.log('serving key: ', key);
    socket.emit('key', key);
  });
}

io.on('connection', handleIO);
