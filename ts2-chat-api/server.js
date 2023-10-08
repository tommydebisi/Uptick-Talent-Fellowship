require('dotenv').config();
const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const cors = require('cors');
const indexRoutes = require('./routes/indexRoutes');
const chatController = require('./controllers/chatController');
const dbConnect = require('./utils/dbConnect');

// Initialize Express application
const app = express();

// Create HTTP server using Express
const server = http.createServer(app);

// parse json in request body
app.use(express.json());

// parse form in request body
app.use(express.urlencoded({extended: false}));

// Use CORS
app.use(cors());

// Use User Routes
app.use("/api", indexRoutes);
// Create WebSocket server
const wss = new WebSocket.Server({ server });


// WebSocket event handling
wss.on('connection', function connection(ws) {
  ws.send(JSON.stringify({ type: 'connected' }));

  ws.on('message', function incoming(message) {
    chatController.handleChat.call(chatController, ws, message);
  });
});

// Connect to MongoDB
dbConnect.connect()
  .then(() => {
    console.log('Connected to MongoDB');

    const port = process.env.PORT || 3000;
    // Start the HTTP server
    server.listen(port, function() {
      console.log(`Server is listening on port ${port}...`);
    });
  })
  .catch((err) => {
    console.error('Could not connect to MongoDB:', err);
  });

// module.exports = app;