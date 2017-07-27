const express = require('express');
const server = express();
const port = 8080;
const axios = require('axios');
const request = require('request');

server.use(express.static(__dirname + '/public'));

server.get('/', function(request, response){
  response.sendFile('index.html', {root: __dirname + '/public/html/'});
});

const url = 'http://192.168.1.160/pt-dev/graphics_tool/api_passage.php'

//get page count
axios.post(url, {
  'command': 'passage_get_page_count'
})
.then(res => console.log(res.data.num_pages))
.catch(err => console.log(err));

//get page data (static page number for now)
axios.post(url, {
  'command': 'passage_get_page_data',
  'page_number': 1
})
.then(res => console.log(res.data.image_list))
.catch(err => console.log(err));

server.listen(port, function(){
  console.log('Now listening on port', port);
});
