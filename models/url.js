const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  visitHistory: [
    {
      timestamp: {
        type: Date,
        default: Date.now,} 
    }]
}, {timestamps: true});

const URL = mongoose.model('URL', urlSchema);
module.exports = URL;