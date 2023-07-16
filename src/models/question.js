const mongoose = require('mongoose');

const questionsSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  }
});

const Question = mongoose.model('Question', questionsSchema);

module.exports = Question;
