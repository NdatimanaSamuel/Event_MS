import { useEffect } from "react";

import SideBarMenu from "../../components/SideBarMenu";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../redux/features/events/eventSlice";
import { Navigate } from "react-router-dom";
import { adminViewAllBooking } from "../../redux/features/booking/bookingSlice";
const AdminHome = () => {
  const dispatch = useDispatch();

  const { events } = useSelector((state) => state.event);
  useEffect(() => {
    // Dispatch an action to get events data when the component mounts
    dispatch(getEvents());
  }, [dispatch]);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && user.role === "admin") {
      dispatch(adminViewAllBooking());
    }
  }, [dispatch, user]);

  const { bookings } = useSelector((state) => state.booking);
  const rejectedBookings = bookings.filter(booking => booking.status === "cancelled");
  const pendingBookings = bookings.filter(booking => booking.status === "pending");
  const confirmedBookings = bookings.filter(booking => booking.status === "approved");

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    // For example, if only customers are allowed to make a booking
    return <Navigate to="/unauthorized" />; // Redirect to an unauthorized page
  }
  return (
    <>
      <div className="flex">
        <aside className="bg-sidebarBg shadow-lg h-screen fixed left-0 w-64">
          <SideBarMenu />
        </aside>

        <section id="main-content" className="ml-64 flex-grow">
          <header className="bg-white shadow-lg">
            <div className="flex justify-between items-center py-4 px-6">
              <h2 className="text-xl font-bold toggle-btn">
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

          <div className="container mx-auto mt-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
              <div className="bg-sidebarBg p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {events.length}
                </h2>
                <p className="text-sm text-gray-600">All Events</p>
              </div>
              <div className="bg-red-500 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-white">{pendingBookings.length}</h2>
                <p className="text-sm text-white">All Pending booking</p>
              </div>
              <div className="bg-yellow-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-white">{ rejectedBookings.length}</h2>
                <p className="text-sm text-white">All Cancelled Booking</p>
              </div>
              <div className="bg-green-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-white">{confirmedBookings.length }</h2>
                <p className="text-sm text-white">All Approved Booking</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AdminHome;
