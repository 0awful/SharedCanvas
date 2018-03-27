function handleHTTP(req, res) {
  if (req.method === 'GET') {
    // TODO: DEFINITELY REPLACE THIS WITH AN AUTHENTICATED WAY OF DOING THIS
    if (req.url == '/resetcanvas') {
      drawings = [];
    }
    if (req.url === '/') {
      req.addListener('end', function() {
        req.url = req.url.replace(/.*/, '/site.html');
        static_files.serve(req, res);
      });
      req.resume();
    } else {
      static_files.serve(req, res);
      req.resume();
    }
  } else {
    res.writeHead(403);
    res.end();
  }
}

function handleIO(socket) {
  function disconnect() {
    console.log('client disconnected');
    // Remove this socket from the list of connected people
  }

  console.log('client Connected');

  socket.emit('updateDrawings', drawings);
  socket.on('disconnect', disconnect);

  socket.on('drawing', function(key, drawing) {
    drawings[key] = drawing;

    // TODO: This is the wrong call. I need to send to everyone who didn't already have this information.
    io.sockets.emit('drawing', key, drawing);
  });
}

var host = 'localhost';
var port = 8080;

var http = require('http');
var http_serv = http.createServer(handleHTTP).listen(port, host);

var node_static = require('node-static');

var static_files = new node_static.Server(__dirname);

var io = require('socket.io').listen(http_serv);

io.on('connection', handleIO);

let drawings = {};
