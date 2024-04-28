import { FiMonitor, FiHome, FiFile, FiLogOut } from "react-icons/fi";
import { Link, Navigate } from "react-router-dom";
import { logout } from "../redux/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";

const SideBarMenu = () => {
 
  const { user } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    // Optional: You can redirect the user to the home page or any other page after logout.
    Navigate("/login");
};

  
  return (
    <>
      <div className="py-6 px-4 bg-sidebarBg ">
        <h4 className="text-2xl font-bold flex items-center">
          <FiMonitor className="mr-2" /> <span>Manage Events</span>
        </h4>
      </div>
      <div className="mt-10">
        <ul>
          <li className="px-4 py-2 hover:bg-gray-200">
            <Link to="/homeAdmin" className="flex items-center">
              <FiHome className="mr-2" /> Dashboard
            </Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-200">
            <Link to="/addEvent" className="flex items-center">
              <FiFile className="mr-2" /> Add New Event
            </Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-200">
            <Link to="/viewAllEvents" className="flex items-center">
              <FiFile className="mr-2" /> View Events
            </Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-200">
            <Link to="/manageBookings" className="flex items-center">
              <FiFile className="mr-2" /> Manage Booking
            </Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-200">
            <Link to="/view-allApproved" className="flex items-center">
              <FiFile className="mr-2" /> View Approved Booking
            </Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-200">
            <Link to="/view-allrejectedbooking" className="flex items-center">
              <FiFile className="mr-2" /> View Cancelled Booking
            </Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-200">
            <Link to="/make-BookingReports" className="flex items-center">
              <FiFile className="mr-2" /> Make Booking Reports 
            </Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-200">
            

            {user ? (
             <Link onClick={handleLogout} className="flex items-center">
             <FiLogOut className="mr-2" /> Logout
           </Link>
            ) : (
              <Link to="/" ></Link>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideBarMenu;
