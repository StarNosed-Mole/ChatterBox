const express = require('express');
const path = require('path');
const { Connection } = require('pg');
const WebSocket = require('ws');

const app = express();

/* ***************************
 *
 *  WEBSOCKET CONNECTION
 *
 *************************** */

// starts a server on port 4040
const wss = new WebSocket.Server({ port: 4040 });

// helper function:
// broadcast sends data to all clients connected
// to websocket server
const broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

// waits for connection on client
wss.on('connection', (ws) => {
  // waits to recieve message
  ws.on('message', (message) => {
    // if message recieved, console log message
    console.log(message);
    // send data back to all the clients
    broadcast(message);
  });
});

/* STATIC FILES */

app.get('/', (req, res) => res.status(200).sendFile(path.resolve(__dirname, '../client/index.html')));

app.listen(3000);
