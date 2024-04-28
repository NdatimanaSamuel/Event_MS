const express = require("express");
const router = express.Router();
const {
  createBooking,
  getAllBookingsByUser,
  cancelBooking,
  AdminviewAllBookings,
  ManageBookingStatusAdmin,
} = require("../controllers/booking.controller");
const { protect, checkRole } = require("../Middleware/auth.middleware");
// Define the route for creating a booking
router.post("/bookTicket", protect, checkRole(["client"]), createBooking);
router.get(
  "/viewBookings",
  protect,
  checkRole(["client"]),
  getAllBookingsByUser
);
router.put(
  "/rejectBooking/:bookingId",
  protect,
  checkRole(["client"]),
  cancelBooking
);
router.get(
  "/adminViewAllBookings",
  protect,
  checkRole(["admin"]),
  AdminviewAllBookings
);

router.put(
  "/manageBookingStatus/:bookingId",
  protect,
  checkRole(["admin"]),
  ManageBookingStatusAdmin
),
    
  (module.exports = router);
