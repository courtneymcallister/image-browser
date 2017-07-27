const express = require('express');
const server = express();

const port = 8080;

server.get('/', function(request, response){
  response.sendFile('index.html', {root: __dirname + '/public/html'});
});

server.listen(port, function(){
  console.log('Now listening on port', port);
});
