import { useDispatch, useSelector } from "react-redux";
import SideBarMenu from "../../components/SideBarMenu";
import { useEffect, useState } from "react";
import { adminViewAllBooking } from "../../redux/features/booking/bookingSlice";
import { Navigate } from "react-router-dom";

const ViewAllApprovedBooking = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
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

  const approvedBookings = bookings.filter(
    (booking) => booking.status === "approved"
  );
  // Sort bookings by event date in descending order
  const sortedBookings = approvedBookings.slice().sort((a, b) => {
    const dateA = new Date(a.eventId?.date);
    const dateB = new Date(b.eventId?.date);
    return dateB - dateA; // For descending order
  });

  // Get current bookings for pagination
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = sortedBookings.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const totalPages = Math.ceil(sortedBookings.length / recordsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="flex">
        <aside className="bg-sidebarBg shadow-lg h-screen fixed left-0 w-64">
          <SideBarMenu />
        </aside>
        <section id="main-content" className="ml-64 flex-grow">
          <header className="bg-white shadow-lg">
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
          <div className="container mx-auto mt-10 ml-10">
            <h2 className="text-2xl font-bold mb-4">
              View All Approved Bookings
            </h2>
            {isLoading ? (
              <p>Loading...</p>
            ) : isError ? (
              <p>{message}</p>
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
                  {currentRecords.map((booking) => (
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
                          ? new Date(booking.eventId.date).toLocaleDateString()
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
                      <li key={index} className={`px-3 py-1 border ${index + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'} cursor-pointer`} onClick={() => paginate(index + 1)}>
                        {index + 1}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
                  </>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default ViewAllApprovedBooking;
