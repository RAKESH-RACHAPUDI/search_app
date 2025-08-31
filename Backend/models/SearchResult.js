const mongoose = require('mongoose');

const searchResultSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('SearchResult', searchResultSchema);
