function handleHTTP(req, res) {
  if (req.method === 'GET') {
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

var host = 'localhost';
var port = 8080;

var http = require('http');
var http_serv = http.createServer(handleHTTP).listen(port, host);

var node_static = require('node-static');

var static_files = new node_static.Server(__dirname);
