import axios from "axios";
const API_URL = "http://localhost:5000/api/v1/ticket/";

// book a ticket
const bookTicket = async (bookingData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(
    API_URL + "bookTicket",
    bookingData,
    config
  );

  return response.data;
};

// client get his /her booked tickets

const getAllBookedTicket = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "viewBookings", config);
  return response.data;
};

// client cancel booking
const cancelMyBooking = async (bookingId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Add the token to the request headers
    },
  };
  const response = await axios.put(
    API_URL + "rejectBooking/" + bookingId,
    config
  );
  return response.data;
};

//admin view bookings
const adminViewBookings = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "adminViewAllBookings", config);

  return response.data;
};

// admin change booking status
const manageBookingStatusAdmin = async (bookingId, statusData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    API_URL + "manageBookingStatus/" + bookingId,
    statusData,
    config
  );
  return response.data;
};

const bookingService = {
  bookTicket,
  getAllBookedTicket,
  cancelMyBooking,
  adminViewBookings,
  manageBookingStatusAdmin,
};

export default bookingService;
