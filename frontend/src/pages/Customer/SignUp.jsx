import { useEffect, useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {  register, reset } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import CustomerMenus from '../../components/CustomerMenus';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone:"",
    password: "",
  });

  const { name, email, phone, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success("Account created successfully!"); // Display success message
      dispatch(reset());
      navigate("/login"); // Redirect user to login page
    }
  }, [isError, isSuccess, message, navigate,dispatch]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name,
      email,
      phone,
      password,
    };
    dispatch(register(userData));
  };
  
 
  return (
    <>
      <header className="bg-white p-4 flex justify-between items-center fixed top-0 w-full z-10 shadow-md">
        <a href="#" className="logo flex items-center">
          <FaHome className="mr-2 text-4xl text-sidebarBg" />
          <h1 className="text-xl font-semibold">Telex Events</h1>
        </a>
        <div className="flex items-center">
     <CustomerMenus/>
        </div>
      </header>

      <div className="mt-20"></div>

      <section className="home py-16">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">Create Account Here</h1>
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Names</label>
              <input type="text" id="name" value={name}  onChange={handleChange} name="name" className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-sidebarBg" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input type="email" id="email" value={email}  onChange={handleChange} name="email" className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-sidebarBg" />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-gray-700">Phone</label>
              <input type="text" id="phone" value={phone}  onChange={handleChange} name="phone" className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-sidebarBg" />
            </div>     
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input type="password" id="password" value={password}  onChange={handleChange} name="password" className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-sidebarBg" />
            </div>
            <button type="submit" className="bg-sidebarBg text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition duration-300 w-full">Submit</button>
          </form>
          <p className="text-center mt-4">
            Already have an account? <Link to="/login" className="text-sidebarBg font-semibold hover:underline">Login Here</Link>
          </p>
        </div>
      </section>

      <footer className="bg-white text-colorText py-8 border-t-2 border-gray-300 shadow-md">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-auto mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">Locations</h3>
              <a href="#" className="block">Kigali</a>
              <a href="#" className="block">Kicukiro</a>
            </div>
            <div className="w-full md:w-auto mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <a href="#" className="block">Home</a>
              <a href="#" className="block">Events</a>
              <a href="#" className="block">About</a>
              <a href="#" className="block">Review</a>
            </div>
            <div className="w-full md:w-auto mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">Contact Info</h3>
              <a href="#" className="block">+250781110784</a>
              <a href="#" className="block">samuel@gmail.com</a>
              <a href="#" className="block">Kigali, Rwanda - 400104</a>
            </div>
            <div className="w-full md:w-auto mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">Follow Us</h3>
              <a href="#" className="block">Facebook</a>
              <a href="#" className="block">Twitter</a>
              <a href="#" className="block">Instagram</a>
              <a href="#" className="block">Linkedin</a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-sm">&copy; 2024 Event Ms. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

export default SignUp;
