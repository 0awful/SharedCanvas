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

function handleIO(socket) {
  function disconnect() {
    sockets.splice(sockets.indexOf(socket), 1);
  }

  sockets.push(socket);
  socket.emit('updateDrawings', drawings);

  socket.on('disconnect', disconnect);
  socket.on('drawing', (key, drawing) => {
    drawings[key] = drawing;
    socket.broadcast.emit('drawing', key, drawing);
  });
}

const httpServe = http.createServer(handleHTTP).listen(port, host);

const io = require('socket.io').listen(httpServe);

io.on('connection', handleIO);
