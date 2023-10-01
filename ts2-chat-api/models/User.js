const mongoose = require('mongoose');

// User Schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  rooms: [String],
});

module.exports = mongoose.model('User', UserSchema);
