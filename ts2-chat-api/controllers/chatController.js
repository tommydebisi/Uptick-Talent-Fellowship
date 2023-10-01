// const User = require('../models/User');

// exports.clients = {};

// exports.handleChat = async function(ws, message) {
//   const parsedMessage = JSON.parse(message);

//   switch (parsedMessage.type) {
//     case 'join':
//       const user = await User.findOne({ username: parsedMessage.username });
//       if (user) {
//         this.clients[parsedMessage.username] = ws;
//         // Join the room if specified
//         if (parsedMessage.room) {
//           user.rooms.push(parsedMessage.room);
//           await user.save();
//           ws.room = parsedMessage.room;
//         }
//       }
//       break;

//     case 'leave':
//       const leavingUser = await User.findOne({ username: parsedMessage.username });
//       if (leavingUser && parsedMessage.room) {
//         const index = leavingUser.rooms.indexOf(parsedMessage.room);
//         if (index !== -1) {
//           leavingUser.rooms.splice(index, 1);
//           await leavingUser.save();
//           if (ws.room === parsedMessage.room) {
//             ws.room = null;  // Reset room on WebSocket object
//           }
//         }
//       }
//       break;

//     // 
//     case 'message':
//       const recipientWs = this.clients[parsedMessage.recipient];
//       if (parsedMessage.room) {
//         // Broadcast to all clients in the room
//         for (const username in this.clients) {
//           const clientWs = this.clients[username];
//           if (clientWs.room === parsedMessage.room) {
//             clientWs.send(JSON.stringify(parsedMessage));
//           }
//         }
//       } else if (recipientWs) {
//         // Direct message
//         recipientWs.send(JSON.stringify(parsedMessage));
//       }
//       break;
//   }
// };

const User = require('../models/User');
const { joinRoomOrChat, leaveRoomOrChat, sendMessage } = require('../utils/chatActions');

exports.clients = {};

exports.handleChat = async function(ws, message) {
  const parsedMessage = JSON.parse(message);

  switch (parsedMessage.type) {
    case 'join':
      await joinRoomOrChat(ws, parsedMessage, this.clients);
      break;

    case 'leave':
      await leaveRoomOrChat(ws, parsedMessage, this.clients);
      break;

    case 'message':
      await sendMessage(ws, parsedMessage, this.clients);
      break;
  }
};
