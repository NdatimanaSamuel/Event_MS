const { format } = require('date-fns');
const Booking = require("../models/booking.model");
const Event = require("../models/event.model");

const createBooking = async (req, res) => {
  try {
    const { userId, eventId, numberOfTickets } = req.body;

    // Check if the totalTicket field is provided
    if (!numberOfTickets) {
      return res
        .status(400)
        .json({ message: "Please provide the number of tickets" });
    }

    // Check if the event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Check if there are enough tickets available
    if (numberOfTickets > event.ticketRemainNumber) {
      return res.status(400).json({ message: "Not enough tickets available" });
    }

    // Check if there exists a pending booking for the user and event
    const existingBooking = await Booking.findOne({
      userId: userId,
      eventId: eventId,
      status: "pending"
    });
    if (existingBooking) {
      return res.status(400).json({ message: "There is already a pending booking for this event" });
    }

    // Create the booking
    const booking = new Booking({
      userId,
      eventId,
      totalTicket: numberOfTickets,
      status: "pending", // Default status is pending
      createdAt: format(new Date(), "yyyy-MM-dd"), // Set the createdAt field explicitly
    });

    // Save the booking to the database
    await booking.save();

    // Update the ticket count for the event
    event.ticketRemainNumber -= numberOfTickets;
    await event.save();

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// const getAllBookingsByUser = async (req, res) => {
//   try {
//     // Retrieve the user ID from the request
//     const userId = req.user._id; // Assuming the user ID is stored in the request after authentication middleware

//     // Find all bookings associated with the user
//     const bookings = await Booking.find({ userId });

//     // Check if any bookings are found
//     if (bookings.length === 0) {
//       return res
//         .status(404)
//         .json({ message: "No bookings found for this user" });
//     }

//     // res.status(200).json({ bookings });
//     res.status(200).json(bookings);
//   } catch (error) {
//     console.error("Error retrieving bookings:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
const getAllBookingsByUser = async (req, res) => {
  try {
    // Retrieve the user ID from the request
    const userId = req.user._id; // Assuming the user ID is stored in the request after authentication middleware

    // Find all bookings associated with the user
    const bookings = await Booking.find({ userId })
      .populate('userId', 'name email') // Populate the userId field with name and email
      .populate('eventId', 'title date location'); // Populate the eventId field with name, date, and place

    // Check if any bookings are found
    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found for this user" });
    }

    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error retrieving bookings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const cancelBooking = async (req, res) => {
  try {
    // Retrieve the booking ID from the request
    const bookingId = req.params.bookingId;

    // Find the booking by ID
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({ message: "Booking is already cancelled" });
    } else if (booking.status === "approved") {
      return res
        .status(400)
        .json({ message: "Cannot cancel an approved booking" });
    }

    // Update the booking status to "cancelled"
    booking.status = "cancelled";
    await booking.save();

    // Send a success response
    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// const AdminviewAllBookings = async (req, res) => {
//   try {
//     // Retrieve all bookings from the database
//     const bookings = await Booking.find();

//     // Send the bookings as a response
//     res.status(200).json(bookings );
//   } catch (error) {
//     console.error("Error fetching bookings:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
const AdminviewAllBookings = async (req, res) => {
  try {
    // Retrieve all bookings from the database and populate userId and eventId fields
    const bookings = await Booking.find()
      .populate('userId', 'name email') // populate userId with name and email fields
      .populate('eventId', 'title location date'); // populate eventId with title, location, and date fields

    // Send the bookings as a response
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const ManageBookingStatusAdmin = async (req, res) => {
  try {
    const { status } = req.body;
    const { bookingId } = req.params; // Access bookingId from request parameters

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (status === "approved") {
      booking.status = "approved";
    } else if (status === "cancelled") {
      booking.status = "cancelled";
    } else {
      return res.status(400).json({ message: "Invalid status" });
    }

    await booking.save();

    // Send a success response
    res.status(200).json({ message: `Booking ${status} successfully` });
  } catch (error) {
    console.error("Error processing booking:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};








module.exports = {
  createBooking,
  getAllBookingsByUser,
  cancelBooking,
  AdminviewAllBookings,
  ManageBookingStatusAdmin,
  
};
