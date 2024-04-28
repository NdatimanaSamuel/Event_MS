import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SideBarMenu from "../../components/SideBarMenu";
import { Navigate } from "react-router-dom";
import { adminViewAllBooking } from "../../redux/features/booking/bookingSlice";

const MakeBookingReports = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [status, setStatus] = useState("");
  const [filteredBookings, setFilteredBookings] = useState([]);
  const { bookings, isLoading, isError, message } = useSelector(
    (state) => state.booking
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(3); // Change this value to display more records per page

  useEffect(() => {
    if (user && user.role === "admin") {
      dispatch(adminViewAllBooking());
    }
  }, [dispatch, user]);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/unauthorized" />;
  }

  const handleSearch = () => {
    const filtered = bookings.filter((booking) => {
      const bookingDate = new Date(booking.createdAt);
      return (
        (!startDate || bookingDate >= new Date(startDate)) &&
        (!endDate || bookingDate <= new Date(endDate)) &&
        (!status || booking.status === status)
      );
    });
    setFilteredBookings(filtered);
  };

  // Get current bookings for pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredBookings.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const totalPages = Math.ceil(filteredBookings.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="flex">
        <aside className="bg-sidebarBg shadow-lg h-screen fixed left-0 w-64">
          <SideBarMenu />
        </aside>
        <section id="main-content" className="ml-64 flex-grow p-6">
          <header className="bg-white shadow-lg mb-6">
            <div className="flex justify-between items-center py-4 px-6">
              <h2 className="text-xl font-bold">
                <i className="fa fa-bars"></i> Dashboard
              </h2>
              <div className="flex items-center">
                <div className="mr-6">
                  <input
                    type="text"
                    placeholder="Search Here..."
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                  />
                  <i className="fa fa-search"></i>
                </div>
                <div className="flex items-center">
                  <img
                    src={
                      "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg"
                    }
                    alt="User"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p>Admin</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-4">Make Booking Reports</h2>
            <div className="bg-white shadow-lg p-6 rounded-lg mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <input
                  type="date"
                  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
                <input
                  type="date"
                  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
                <select
                  className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="approved">Approved</option>
                  <option value="pending">Pending</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button
                  onClick={handleSearch}
                  className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-700"
                >
                  Search
                </button>
              </div>

              {isLoading ? (
                <p>Loading...</p>
              ) : isError ? (
                <p>{message}</p>
              ) : currentRecords.length === 0 ? (
                <p>No bookings found. Please search to display bookings.</p>
              ) : (
                <>
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Names
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Event Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Total Booked Ticket
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Event Place
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Event Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredBookings.map((booking) => (
                        <tr key={booking._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {booking.userId?.name || "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {booking.eventId?.title || "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {booking.totalTicket}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {booking.eventId?.location || "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {booking.eventId?.date
                              ? new Date(
                                  booking.eventId.date
                                ).toLocaleDateString()
                              : "N/A"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {booking.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="mt-4 flex justify-center">
                    <nav>
                      <ul className="flex list-none">
                        {Array.from({ length: totalPages }, (_, index) => (
                          <li
                            key={index}
                            className={`px-3 py-1 border ${
                              index + 1 === currentPage
                                ? "bg-blue-500 text-white"
                                : "bg-white text-blue-500"
                            } cursor-pointer`}
                            onClick={() => paginate(index + 1)}
                          >
                            {index + 1}
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MakeBookingReports;
