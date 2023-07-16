const mongoose = require('mongoose');

const yearSchema = new mongoose.Schema({
  year_id: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  }
});

const Year = mongoose.model('Year', yearSchema);

module.exports = Year;
