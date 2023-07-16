const mongoose = require('mongoose');

const testPaperQuestionsSchema = new mongoose.Schema({
  testPaper_id: {
    type: String,
    required: true
  },
  question_id: {
    type: String,
    required: true
  },
  year_id: {
    type: String,
    required: true
  },
});

const TestPaperQuestion = mongoose.model('TestPaperQuestion', testPaperQuestionsSchema);

module.exports = TestPaperQuestion;
