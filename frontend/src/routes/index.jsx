import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./../pages/MainPage";
import SignUp from "../pages/Customer/SignUp";
import Login from "../pages/Customer/Login";
import AdminHome from "../pages/Admin/adminHome";
import AddNewEvents from "../pages/Admin/addNewEvents";
import ViewAllEvents from "../pages/Admin/viewAllEvents";
import CustomerHome from "../pages/Customer/customerHome";



const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/home" element={< CustomerHome/>}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/homeAdmin" element={<AdminHome />}></Route>
        <Route path="/addEvent" element={<AddNewEvents />}></Route>
        <Route path="/viewAllEvents" element={< ViewAllEvents />}></Route>
        

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
