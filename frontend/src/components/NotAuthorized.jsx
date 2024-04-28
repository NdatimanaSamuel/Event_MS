import { useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { logout, reset } from "../redux/features/auth/authSlice";


const NotAuthorized = () => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());
        // No need to return Navigate here, it should be used directly in the component where the logout is called
        Navigate("/login");
      };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Not Authorized</h1>
      <p className="text-gray-600 mb-8">You are not authorized to access this page.</p>
      <Link to='/'  onClick={handleLogout} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
        Go to Home
       </Link>
          
    </div>
  );
};

export default NotAuthorized;
