const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  telephone: {
    type: String,
    required: true
  },
  whatsapp: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  }
});

const User = mongoose.model('User', usersSchema);

module.exports = User;
