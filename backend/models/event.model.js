const mongoose = require("mongoose");

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    date: {
      type: String,
      required: [true, "Please provide a date"],
    },
    location: {
      type: String,
      required: [true, "Please provide a location"],
    },
    ticketInitialNumber: {
      type: Number,
      required: [true, "Please provide a Initial number"],
      
    },
    ticketRemainNumber: {
      type: Number,
      required: [true, "Please provide a Remain number"],
      
    },
    organizer: {
      type: String,
      required: [true, "Please provide an organizer"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
