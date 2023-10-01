const User = require('../models/User');

// Function to handle joining a room or chat
async function joinRoomOrChat(ws, parsedMessage, clients) {
  const user = await User.findOne({ username: parsedMessage.username });
  if (user) {
    clients[parsedMessage.username] = ws;
    if (parsedMessage.room) {
      user.rooms.push(parsedMessage.room);
      await user.save();
      ws.room = parsedMessage.room;
    }
  }
}

// Function to handle leaving a room or chat
async function leaveRoomOrChat(ws, parsedMessage, clients) {
  const leavingUser = await User.findOne({ username: parsedMessage.username });
  if (leavingUser && parsedMessage.room) {
    const index = leavingUser.rooms.indexOf(parsedMessage.room);
    if (index !== -1) {
      leavingUser.rooms.splice(index, 1);
      await leavingUser.save();
      if (ws.room === parsedMessage.room) {
        ws.room = null;
      }
    }
  }
}

// Function to handle sending a message to a room or chat
async function sendMessage(ws, parsedMessage, clients) {
  const recipientWs = clients[parsedMessage.recipient];
  if (parsedMessage.room) {
    for (const username in clients) {
      const clientWs = clients[username];
      if (clientWs.room === parsedMessage.room) {
        clientWs.send(JSON.stringify(parsedMessage));
      }
    }
  } else if (recipientWs) {
    recipientWs.send(JSON.stringify(parsedMessage));
  }
}

module.exports = {
  joinRoomOrChat,
  leaveRoomOrChat,
  sendMessage
};
