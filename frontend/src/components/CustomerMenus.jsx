import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { logout, reset } from "../redux/features/auth/authSlice";
import {  useEffect } from "react";
import { toast } from "react-toastify";

const CustomerMenus = () => {
  const dispatch = useDispatch();

  // Selecting user state from Redux store
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  // Effect to display error message and reset booking state
  useEffect(() => {
    if (isError) {
      // Display error message using toast
      toast.error(message);
      // Reset the booking state after displaying the error
      dispatch(reset());
    }
  }, [isError, isSuccess, message, dispatch]);

  // Function to handle logout
  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    // No need to return Navigate here, it should be used directly in the component where the logout is called
    Navigate("/login");
  };
  // const handleLogout = useCallback(() => {
  //   dispatch(logout());
  //   dispatch(reset());
  //   Navigate("/login");
  // }, [dispatch]);

  return (
    <>
      <nav className="navbar flex mr-24">

        {(!user && <Link
          to="/"
          className="mr-4 px-2 py-1 rounded transition duration-300 hover:bg-sidebarBg hover:text-white bg-sidebarBg text-white"
        >
          Home
        </Link>
        )}

        {(!user &&
          <Link
            to="/"
            className="mr-4 px-2 py-1 rounded transition duration-300 hover:bg-sidebarBg hover:text-white"
          >
            Event
          </Link>
        )}
        {(!user &&
          <Link
            to="#"
            className="mr-4 px-2 py-1 rounded transition duration-300 hover:bg-sidebarBg hover:text-white"
          >
            About
          </Link>
        )}
        {(!user &&
          <Link
            to="#"
            className="mr-4 px-2 py-1 rounded transition duration-300 hover:bg-sidebarBg hover:text-white"
          >
            Contact us
          </Link>
        )}
        
         {(user && <Link
          to="/homeCustomer"
          className="mr-4 px-2 py-1 rounded transition duration-300 hover:bg-sidebarBg hover:text-white bg-sidebarBg text-white"
        >
          Home
        </Link>
        )}

        {user && (
          <Link
            to="/viewBooking"
            className="mr-4 px-2 py-1 rounded transition duration-300 hover:bg-sidebarBg hover:text-white"
          >
            Manage Booking
          </Link>
        )}

        {user ? (
          <Link
            onClick={handleLogout}
            className="px-2 py-1 rounded transition duration-300 hover:bg-sidebarBg hover:text-white"
          >
            Logout
          </Link>
        ) : (
          <Link
            to="/login"
            className="mr-4 px-2 py-1 rounded transition duration-300 hover:bg-sidebarBg hover:text-white"
          >
            Login
          </Link>
        )}
      </nav>
    </>
  );
};

export default CustomerMenus;
