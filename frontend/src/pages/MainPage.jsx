import { FaHome } from "react-icons/fa";
import CustomerMenus from "../components/CustomerMenus";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../redux/features/events/eventSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";


function MainPage() {
  const dispatch = useDispatch();
  const { events, isLoading, isError, message } = useSelector(
    (state) => state.event
  );
  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch])
  
  const isLoggedIn = false;
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

      {/* Slide Section */}
      
      <section className="py-16 mt-10">
     
        <div className="container mx-auto flex items-center">
          <div className="w-1/2">
            <h2 className="text-3xl font-semibold mb-4">
              Discover the Latest Events
            </h2>
            <p className="text-gray-600 mb-4">
              Welcome to Telex Events! To book tickets for your favorite events,
              simply browse through our selection of available events and click
              on the Book Ticket Now button. However, to proceed with
              booking,you will need to create an account or log in if you
              already have one.
            </p>
            <a
              href="#"
              className="inline-block bg-sidebarBg text-white px-6 py-3 rounded-md hover:bg-opacity-75 transition duration-300"
            >
              Learn More
            </a>
          </div>
          <div className="w-1/2">
            <img
              src={
                "https://pnclogosofficial.s3.us-west-2.amazonaws.com/2020/10/09131437/event-management-logos-20.jpg"
              }
              alt="Event Image"
              className="w-4/5 h-56 rounded-md shadow-md ml-5"
            />
          </div>
          </div>
              
      </section>

      <div className="mt-20"></div>

    {/* Available Events Section */}
      <section className="home py-16">
      {isLoading ? (
              <p>Loading...</p>
            ) : isError ? (
              <p>Error: {message}</p>
            ) : (
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">
            Available Events
          </h1>
          {/* Event Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div
                key={event._id}
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
                  <p className="mt-2 text-gray-700 font-bold">Organized By: {event.organizer}</p>
                  {isLoggedIn ? (
                    <Link
                      
                      className="block mt-2 text-center bg-sidebarBg text-gray-500 font-semibold px-4 py-2 rounded-md hover:bg-sidebarBg transition duration-300"
                    >
                      Book Ticket Now
                    </Link>
                  ) : (
                    <Link
                       to="/login"
                      className="block mt-2 text-center bg-sidebarBg text-gray-500 font-semibold px-4 py-2 rounded-md hover:bg-sidebarBg transition duration-300"
                    >
                      Login to Make Booking
                    </Link>
                  )}
                </div>
              </div>
            ))}
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
}

export default MainPage;
