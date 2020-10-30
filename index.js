const fs = require('fs');
const express = require('express');

const app = express(); 
app.use('/', express.static('public'));

app.get('/', (req, res) => {
  res.send('index.html')
})

const data = fs.readFileSync('./data/rate.dat', 'utf-8');
const publishData = data.split("\n");

app.get('/streaming', function(req, res) {
  req.socket.setTimeout(Number.MAX_VALUE);
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    "Access-Control-Allow-Origin": "*",
  });
  res.write('\n');
  var lastEventId = Number(req.headers["last-event-id"]) || 0;
  setInterval(() => {
    for (var i = 0; i < 10; i++) {
      lastEventId++;
      console.log("id: " + lastEventId + ", data: " + publishData[lastEventId - 1]);
      res.write('id:' + lastEventId + '\n');
      res.write('data: ' + publishData[lastEventId - 1] + '\n');
      res.write('\n');
    }
  }, 5000);
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`listing port http://localhost:${PORT}`);
})