const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true
  },
  testPaper_questions_id: {
    type: String,
    required: true
  },
  total_marks: {
    type: String,
    required: true
  },
  obtained_marks: {
    type: String,
    required: true
  }
});

const Marks = mongoose.model('Marks', marksSchema);

module.exports = Marks;
