// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');
const uuidv1 = require('uuid/v1');
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// WebSockets server
const wss = new SocketServer({ server });
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
 });
};

//how many users online
function broadcast() {
  let userCount = {
    type: 'clientCount',
    count: wss.clients.size
  }
  wss.broadcast(JSON.stringify(userCount));
}

wss.on('connection', (ws) => {
  console.log('Client connected');
  broadcast();

  ws.on('message', (message) => {
    const newMessage = JSON.parse(message);

    if (newMessage.type === "postNotification") {
      newMessage.id = uuidv1();
      newMessage.type = "incomingNotification";
      wss.broadcast(JSON.stringify(newMessage));
    }
    
    if (newMessage.type === "postMessage") {
      newMessage.id = uuidv1();
      newMessage.type = "incomingMessage";
      wss.broadcast(JSON.stringify(newMessage));
    }
  });

 ws.on('close', () => {
    console.log('Client disconnected');
    broadcast();
 });

});