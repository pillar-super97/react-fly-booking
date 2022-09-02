const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  airline: {
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

  arrival: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: String,
  },
  duration: {
    required: true,
    type: String,
  },
  type: {
    required: true,
    type: String,
  },
  totalSeats: {
    required: true,
    type: String,
  },
  availableSeats: {
    required: true,
    type: String,
  },
});
module.exports = mongoose.model('Flights', dataSchema)