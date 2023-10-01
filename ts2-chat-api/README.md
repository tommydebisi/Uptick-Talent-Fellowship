## Distributed chat application using node.js
## About

This is a simple chat application built with Node.js. The application allows users to register and then join a chat room or have a personal chat with another registered user.

## Features

- User registration
- Joining chat rooms
- Personal chats between users

## Getting Started

### Prerequisites

- Node.js
- MongoDB
- Docker

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/tommydebisi/Uptick-Talent-Fellowship.git
2. Navigate to the project directory
    ```bash
    cd Uptick-Talent-Fellowship/ts2-chat-api
    ```
3. Install dependencies
    ```bash
    npm install
    ```
4. Create a `.env` file in the root directory and add the following environment variables
    ```bash
    PORT=your-port-of-choice
    DB_HOST=your-mongodb-host
    DB_NAME=your-mongodb-database-name
    DB_PORT=your-mongodb-port
    DB_USER=your-mongodb-username
    DB_PASS=your-mongodb-password
    ```
5. Start the server
    ```bash
    npm start
    ```

## Usage
After starting the server, you can use a WebSocket client to connect to `ws://localhost:3000` for chat functionalities.

**API Endpoints**
POST /api/register: Register a new user

## WebSocket Events
**Join a Room or Personal Chat**
Send a JSON payload with the following format to join a room or start a personal chat:
```json
{
    "type": "join",
    "username": "registered-user-name",
    "room": "optional-room-name"
}
```

**Leave a Room**
Send a JSON payload with the following format to leave a room:

```json
{
    "type": "leave",
    "username": "registered-user-name",
    "room": "optional-room-name"
}
```

**Send a Message**
To send a message, use the following JSON payload format:
```json
{
    "type": "message",
    "username": "registered-user-name",
    "recipient": "optional-recipient-name",
    "room": "optional-room-name",
    "message": "your-message"
}
```

## Authors
Oluwatomiwa Adebisi