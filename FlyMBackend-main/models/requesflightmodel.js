const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  to: {
    required: true,
    type: String,
  },
  from: {
    required: true,
    type: String,
  },
  date: {
    required: true,
    type: String,
  },

  
});
module.exports = mongoose.model('FlightsRequest', dataSchema)