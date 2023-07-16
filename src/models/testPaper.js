const mongoose = require('mongoose');

const testPapersSchema = new mongoose.Schema({
  year_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  },
  type: {
    type: String,
    required: true
  }
});

const TestPaper = mongoose.model('TestPaper', testPapersSchema);

module.exports = TestPaper;
