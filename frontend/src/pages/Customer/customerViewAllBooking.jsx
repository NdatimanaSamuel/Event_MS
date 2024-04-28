import { FaHome } from "react-icons/fa";
import CustomerMenus from "../../components/CustomerMenus";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { viewBookedTicket } from "../../redux/features/booking/bookingSlice";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const CustomerViewAllBooking = () => {
  const dispatch = useDispatch();

  // State for pagination
  const [pageNumber, setPageNumber] = useState(0);
  const bookingsPerPage = 4;

  const { user } = useSelector((state) => state.auth);
  const { bookings, isError, isLoading, message } = useSelector(
    (state) => state.booking
  );

  // Get the token from the Redux state
  const token = useSelector((state) => state.auth.user?.token);

  useEffect(() => {
    if (user) {
      dispatch(viewBookedTicket());
    }
  }, [dispatch, message, user]);

  // about cancel booking

  const handleCancelConfirmation = async (bookingId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/ticket/rejectBooking/${bookingId}`,
        {}, // If you need to send any additional data, include it here
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the token to the request headers
          },
        }
      );
      toast.success(response.data.message);
      dispatch(viewBookedTicket());
    } catch (err) {
      toast.error(
        err.response ? err.response.data.message : "Error cancelling booking"
      );
    }
  };

  // const handleCancelConfirmation = async (bookingId) => {
  //   try {
  //     const resultAction = await dispatch(cancelBookings(bookingId));
  //     // toast.success("Booking cancelled successfully");
  //     toast.success(resultAction.message);
  //     dispatch(viewBookedTicket());
  //   } catch (err) {
  //     toast.error(err.message || 'Error cancelling booking');
  //   }
  // };

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Check if user's role is not allowed to make a booking
  if (user.role !== "client") {
    return <Navigate to="/unauthorized" />;
  }

  // Calculate the indexes for displaying bookings
  const startIndex = pageNumber * bookingsPerPage;
  const endIndex = startIndex + bookingsPerPage;
  const displayedBookings = bookings.slice(startIndex, endIndex);

  const totalPages = Math.ceil(bookings.length / bookingsPerPage);

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  };

  return (
    <>
      <ToastContainer />
      <header className="bg-white p-4 flex justify-between items-center fixed top-0 w-full z-10 shadow-md">
        <a href="#" className="logo flex items-center">
          <FaHome className="mr-2 text-4xl text-sidebarBg" />
          <h1 className="text-xl font-semibold">Telex Events</h1>
        </a>
        <div className="flex items-center">
          <CustomerMenus />
        </div>
      </header>

      <div className="container mx-auto mt-20">
        <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>{message || "Error fetching data. Please try again later."}</p>
        ) : bookings.length === 0 ? (
          <p>No bookings found for this user.</p>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Name</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Event Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Total Booked Ticket
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Event Place
                    </th>
                    <th className="border border-gray-300 px-4 py-2">
                      Event Date
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Status</th>
                    <th className="border border-gray-300 px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {displayedBookings.map((booking) => (
                    <tr key={booking._id}>
                      <td className="border border-gray-300 px-4 py-2">
                        {booking.userId.name}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {booking.eventId.title}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {booking.totalTicket}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {booking.eventId.location}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {booking.eventId.date}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {booking.status}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <button
                          onClick={() => handleCancelConfirmation(booking._id)}
                          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center mt-4">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index)}
                  className={`${
                    pageNumber === index ? "bg-gray-300" : "bg-gray-200"
                  } text-gray-800 font-semibold py-2 px-4 mx-1 rounded`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <footer className="bg-white text-colorText py-8  border-t-2 border-gray-300 shadow-md mt-48">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-auto mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">Locations</h3>
              <a href="#" className="block">
                Kigali
              </a>
              <a href="#" className="block">
                Kicukiro
              </a>
            </div>
            <div className="w-full md:w-auto mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <a href="#" className="block">
                Home
              </a>
              <a href="#" className="block">
                Events
              </a>
              <a href="#" className="block">
                About
              </a>
              <a href="#" className="block">
                Review
              </a>
            </div>
            <div className="w-full md:w-auto mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">Contact Info</h3>
              <a href="#" className="block">
                +250781110784
              </a>
              <a href="#" className="block">
                samuel@gmail.com
              </a>
              <a href="#" className="block">
                Kigali, Rwanda - 400104
              </a>
            </div>
            <div className="w-full md:w-auto mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">Follow Us</h3>
              <a href="#" className="block">
                Facebook
              </a>
              <a href="#" className="block">
                Twitter
              </a>
              <a href="#" className="block">
                Instagram
              </a>
              <a href="#" className="block">
                Linkedin
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-sm">&copy; 2024 Event Ms. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default CustomerViewAllBooking;
