const WebSocket = require('ws');
const url = process.env.development.REACT_APP_WEBSOCKET_URL;
const port = process.env.development.port;


const ws = new WebSocket(url);

ws.on('open', () => {
  ws.send('something');
})

ws.on('message', function message(data) {
  console.log(data)
})


const wss = new WebSocket.Server({ port });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.send('something');
});