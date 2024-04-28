import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Navigate } from "react-router-dom";
import SideBarMenu from "../../components/SideBarMenu";
import { adminManageBookingStatus } from "../../redux/features/booking/bookingSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminUpdateBookings = () => {
  const { bookingId } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { booking, isLoading, isError, message } = useSelector(
    (state) => state.booking
  );

  const [updateFormData, setUpdateFormData] = useState({
    status: "",
  });

  useEffect(() => {
    if (booking) {
      setUpdateFormData({
        status: booking.status,
      });
    }
  }, [booking]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData({ ...updateFormData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      adminManageBookingStatus({ bookingId, statusData: updateFormData })
    );
    toast.success("Booking updated successfully");
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <>
      <ToastContainer />
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
                    src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg"
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
            <div className="mx-auto max-w-md">
              <h2 className="text-2xl font-bold mb-4">
                Update Booking Request
              </h2>
              {isLoading ? (
                <p>Loading...</p>
              ) : isError ? (
                <p>{message}</p>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="status" className="block mb-1">
                      Booking Status
                    </label>
                    <select
                      className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 w-full"
                      name="status"
                      value={updateFormData.status}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select status</option>
                      <option value="approved">Approve</option>
                      <option value="cancelled">Cancel</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Update Booking
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AdminUpdateBookings;
