const mongoose = require('mongoose');

const optionsSchema = new mongoose.Schema({
  question_id: {
    type: String,
    required: true
  },
  option: {
    type: String,
    required: true
  },
  answer: {
    type: Boolean,
    required: true
  }
});

const Option = mongoose.model('Options', optionsSchema);

module.exports = Option;
