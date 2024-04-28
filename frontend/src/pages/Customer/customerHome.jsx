import { FaHome } from "react-icons/fa";
import CustomerMenus from "../../components/CustomerMenus";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getEvents } from "../../redux/features/events/eventSlice";

const CustomerHome = () => {
  const dispatch = useDispatch();
  const { events, isLoading, isError, message } = useSelector(
    (state) => state.event
  );
  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  const { user } = useSelector((state) => state.auth);
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "client") {
    // For example, if only customers are allowed to make a booking
    return <Navigate to="/unauthorized" />; // Redirect to an unauthorized page
  }
  
  return (
    <>
      <header className="bg-white p-4 flex justify-between items-center fixed top-0 w-full z-10 shadow-md">
        <a href="#" className="logo flex items-center">
          <FaHome className="mr-2 text-4xl text-sidebarBg" />
          <h1 className="text-xl font-semibold">Telex Events</h1>
        </a>
        <div className="flex items-center">
          <CustomerMenus />
        </div>
      </header>

      <section className="home py-16 mt-20">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p>Error: {message}</p>
        ) : (
          <div className="container mx-auto">
            <h1 className="text-4xl font-bold text-center mb-8">
              Available Events
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event) => (
                <div
                  key={event._id} // Use a unique identifier as the key
                  className="bg-gray-100 rounded-lg overflow-hidden shadow-md"
                >
                  <img
                    src="https://i.pinimg.com/originals/8e/07/80/8e078013204d0cc9876e9edbb1fd3f85.jpg"
                    alt="Inyange Dairy"
                    className="w-full h-56 object-cover object-center"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold">{event.title}</h2>
                    <p className="text-gray-600">Place: {event.location}</p>
                    <p className="text-gray-600">Date: {event.date}</p>
                    <p className="mt-2 text-gray-700 font-bold">
                      Organized By: {event.organizer}
                    </p>
                   
                      <Link
                        to={`/makeBooking/${event._id}`}
                        className="block mt-2 text-center bg-sidebarBg text-gray-500 font-semibold px-4 py-2 rounded-md hover:bg-sidebarBg transition duration-300"
                      >
                        Book Ticket Now
                      </Link>
                 
                      
                    
                  </div>
                </div>
              ))}

              {/* Add more event cards as needed */}
            </div>
          </div>
        )}
      </section>

      <footer className="bg-white text-colorText py-8  border-t-2 border-gray-300 shadow-md ">
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

export default CustomerHome;
