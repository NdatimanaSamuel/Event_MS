const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  totalTicket: {
    type: String,
    required: [true, "Please provide needed ticket"],
  },
  status: {
    type: String,
    enum: ["pending", "approved", "cancelled"], 
    default: "pending" 
  },
  createdAt: {
    type: String, // Store as string to keep formatted date
    default: () => format(new Date(), "yyyy-MM-dd"),
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
