import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./../pages/MainPage";
import SignUp from "../pages/Customer/SignUp";
import Login from "../pages/Customer/Login";
import AdminHome from "../pages/Admin/adminHome";
import AddNewEvents from "../pages/Admin/addNewEvents";
import ViewAllEvents from "../pages/Admin/viewAllEvents";
import CustomerHome from "../pages/Customer/customerHome";
import UpdateEvent from "../pages/Admin/updateEvent";
import MakeBooking from "../pages/Customer/makeBooking";
import CustomerViewAllBooking from "../pages/Customer/customerViewAllBooking";
import NotAuthorized from "../components/NotAuthorized";
import NotFound from "../components/NotFound";
import ViewAllBookings from "../pages/Admin/viewAllBookings";
import AdminUpdateBookings from "../pages/Admin/AdminUpdateBookings";
import ViewAllApprovedBooking from "../pages/Admin/viewAllApprovedBooking";
import ViewAllAllRejectedBookings from "../pages/Admin/viewAllRejectedBookings";
import MakeBookingReports from "../pages/Admin/MakeBookingReports";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Specific routes first */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/makeBooking/:eventId" element={<MakeBooking />} />
        <Route path="/viewBooking" element={<CustomerViewAllBooking />} />
        <Route path="/unauthorized" element={<NotAuthorized />} />
        <Route path="*" element={<NotFound />} />

        {/* UpdateEvent route */}
        <Route path="/update/:eventId" element={<UpdateEvent />} />
        <Route
          path="/update-booking/:bookingId"
          element={<AdminUpdateBookings />}
        />

        {/* General routes last */}
        <Route path="/homeAdmin" element={<AdminHome />} />
        <Route path="/addEvent" element={<AddNewEvents />} />
        <Route path="/viewAllEvents" element={<ViewAllEvents />} />
        <Route path="/homeCustomer" element={<CustomerHome />} />
        <Route path="/manageBookings" element={<ViewAllBookings />} />
        <Route path="/view-allApproved" element={<ViewAllApprovedBooking />} />
        <Route
          path="/view-allrejectedbooking"
          element={<ViewAllAllRejectedBookings />}
        />
        <Route path="/make-BookingReports" element={<MakeBookingReports/>}/>

        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
