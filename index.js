const fs = require('fs');
const express = require('express');

const app = express(); 
app.use('/', express.static('public'));

app.get('/', (req, res) => {
  res.send('index.html')
})

let clientId = 0
let clients = {}
app.get('/streaming', function(req, res) {
  req.socket.setTimeout(Number.MAX_VALUE);
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    "Access-Control-Allow-Origin": "*",
  });
  res.write('\n');
  (clientId => {
    clients[clientId] = {
      'res': res,
      'req': req,
      'id': Number(req.headers["last-event-id"]) || 0
    };
    req.on('close', function() {
      delete clients[clientId]
    })
  })(++clientId);
})

var data = fs.readFileSync('./data/rate.dat', 'utf-8');
var publishData = data.split("\n");
setInterval(() => {
  for (let clientId in clients) {
    for (var i = 0; i < 10; i++) {
      clients[clientId].id++;
      var id = clients[clientId].id;
      console.log("id: " + id + ", data: " + publishData[id - 1]);
      clients[clientId].res.write('id:' + id + '\n');
      clients[clientId].res.write('data: ' + publishData[id - 1] + '\n');
      clients[clientId].res.write('\n');
    }
  }
}, 5000);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`listing port http://localhost:${PORT}`);
})