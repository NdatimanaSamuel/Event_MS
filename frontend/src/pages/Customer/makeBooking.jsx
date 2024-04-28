import { FaHome } from "react-icons/fa";
import { Link, Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { bookTicket, reset } from "../../redux/features/booking/bookingSlice";
import CustomerMenus from "../../components/CustomerMenus";

const MakeBooking = () => {
  

  const { eventId } = useParams(); // Get the eventId from the URL
  const { user } = useSelector((state) => state.auth);
  const userId = user ? user._id : null; // Accessing the userId from the user object

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    numberOfTickets: "",
    userId: userId,
    eventId: eventId,
  });
  const { numberOfTickets } = formData;

  // State to manage errors
  const { bookings,isError, isSuccess, message } = useSelector(
    (state) => state.booking
  );

  useEffect(() => {
    // Display error message if there's an error
    if (isError) {
      toast.error(message);
      // Reset the booking state after displaying the error
      dispatch(reset());
    }
  }, [bookings,isError, isSuccess, message, dispatch]);



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    if (numberOfTickets === "") {
      toast.error("Fill out Ticket Field");
    }
    else if (numberOfTickets <= 0) {
      toast.error("Fill valid Ticket number");
     }
    else {
      dispatch(bookTicket(formData))
      
      .then((response) => {
        // Check if account is successfully created
        if (response.payload && response.payload.message === "Booking created successfully") {
          toast.success("Booking Sent Successfully");
          dispatch(reset());
         
        } else {
          // Handle other cases where registration fails
          toast.error(response.payload.message || "Failed to book a tickets");
        }
      })
      .catch((error) => {
        toast.error(error.message || "Failed to book a tickets");
      });
     

     
    }
  };
  
  if (!userId) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "client") {
    // For example, if only customers are allowed to make a booking
    return <Navigate to="/unauthorized" />; // Redirect to an unauthorized page
  }
  
  return (
    <>
      <ToastContainer />
      <header className="bg-white p-4 flex justify-between items-center fixed top-0 w-full z-10 shadow-md">
        <Link to="#" className="logo flex items-center">
          <FaHome className="mr-2 text-4xl text-sidebarBg" />
          <h1 className="text-xl font-semibold">Telex Events</h1>
        </Link>
        <div className="flex items-center">
          <CustomerMenus />
        </div>
      </header>

      <section className="home py-16 mt-10">
        <div className="container mx-auto">
          <h4 className="text-2xl font-bold text-center mb-8">
            Fill Form Make a Booking
          </h4>
          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Number of Ticket
              </label>
              <input
                type="text"
                id="text"
                name="numberOfTickets"
                value={formData.numberOfTickets}
                onChange={handleChange}
                className="border border-gray-300 px-4 py-2 rounded-md w-full focus:outline-none focus:border-sidebarBg"
              />
            </div>

            <button
              type="submit"
              className="bg-sidebarBg text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition duration-300 w-full"
            >
              save booking
            </button>
          </form>
        </div>
      </section>
      <footer className="bg-white text-colorText py-8 border-t-2 border-gray-300 shadow-md">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-auto mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">Locations</h3>
              <a href="#" className="block">
                Kigali
              </a>
              <a href="#" className="block">
                Kicukiro
              </a>
            </div>
            <div className="w-full md:w-auto mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <a href="#" className="block">
                Home
              </a>
              <a href="#" className="block">
                Events
              </a>
              <a href="#" className="block">
                About
              </a>
              <a href="#" className="block">
                Review
              </a>
            </div>
            <div className="w-full md:w-auto mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">Contact Info</h3>
              <a href="#" className="block">
                +250781110784
              </a>
              <a href="#" className="block">
                samuel@gmail.com
              </a>
              <a href="#" className="block">
                Kigali, Rwanda - 400104
              </a>
            </div>
            <div className="w-full md:w-auto mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">Follow Us</h3>
              <a href="#" className="block">
                Facebook
              </a>
              <a href="#" className="block">
                Twitter
              </a>
              <a href="#" className="block">
                Instagram
              </a>
              <a href="#" className="block">
                Linkedin
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-sm">&copy; 2024 Event Ms. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default MakeBooking;
