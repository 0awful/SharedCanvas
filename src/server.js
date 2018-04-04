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
    sockets.splice(sockets.indexOf(socket), 1);
  }

  sockets.push(socket);
  console.log('client Connected');
  console.log(sockets.length);
  socket.emit('updateDrawings', drawings);

  socket.on('disconnect', disconnect);
  socket.on('drawing', function(key, drawing) {
    drawings[key] = drawing;
    socket.broadcast.emit('drawing', key, drawing);
  });
}

let host = 'localhost';
let port = 8080;

let http = require('http');
let http_serv = http.createServer(handleHTTP).listen(port, host);

let node_static = require('node-static');

let static_files = new node_static.Server(__dirname);

let io = require('socket.io').listen(http_serv);

io.on('connection', handleIO);

let drawings = {};
let sockets = new Array();
