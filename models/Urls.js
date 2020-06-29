const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UrlSchema = new Schema({
  _id: { type: String },
  url: {
    type: String,
    require: true,
  },
  hash: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = URL = mongoose.model('URL', UrlSchema);
