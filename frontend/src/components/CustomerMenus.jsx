import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { logout } from "../redux/features/auth/authSlice";

const CustomerMenus = () => {

  const dispatch = useDispatch();

  const { user } = useSelector(
    (state) => state.auth
  );

  const handleLogout = () => {
      dispatch(logout());
      // Optional: You can redirect the user to the home page or any other page after logout.
      Navigate("/");
  };
  
  return (
      <>
       <nav className="navbar flex mr-24">
          <Link to="/"  className="mr-4 px-2 py-1 rounded transition duration-300 hover:bg-sidebarBg hover:text-white bg-sidebarBg text-white">Home</Link>
            <Link to="#" className="mr-4 px-2 py-1 rounded transition duration-300 hover:bg-sidebarBg hover:text-white">Event</Link>
            <Link to="#" className="mr-4 px-2 py-1 rounded transition duration-300 hover:bg-sidebarBg hover:text-white">About</Link>
            <Link to="#" className="mr-4 px-2 py-1 rounded transition duration-300 hover:bg-sidebarBg hover:text-white">Contact us</Link>
            
            {user ? (
              <Link onClick={handleLogout} className="px-2 py-1 rounded transition duration-300 hover:bg-sidebarBg hover:text-white">Logout</Link>
            ) : (
              <Link to="/login" className="px-2 py-1 rounded transition duration-300 hover:bg-sidebarBg hover:text-white">Login</Link>
            )}
          </nav>
      </>
  )
}

export default CustomerMenus