const mongoose = require('mongoose');

const referralSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
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
  }
});

const Referral = mongoose.model('Referral', referralSchema);

module.exports = Referral;
