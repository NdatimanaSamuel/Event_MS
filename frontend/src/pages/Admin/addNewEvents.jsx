import { useState } from "react";
import SideBarMenu from "../../components/SideBarMenu";
import { useDispatch, useSelector } from "react-redux";
import { toast ,ToastContainer} from "react-toastify";
import { createEvent, reset } from "../../redux/features/events/eventSlice";
import { Navigate } from "react-router-dom";

const AddNewEvents = () => {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    location: "",
    ticketInitialNumber: "",
    ticketRemainNumber: "",
    organizer: "",
  });

  const { title,date, location,ticketInitialNumber,ticketRemainNumber,organizer} = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    
    if (title === "" ) {
      toast.error("fill out title");
    }
    else if (date === "" ) {
      toast.error("fill out date");
    }
    else if (location === "" ) {
      toast.error("fill out location");
    }
    else if (ticketInitialNumber === "") {
      toast.error("fill out Initial Number");
    }
    else if (ticketRemainNumber === "") {
      toast.error("fill out Remain Number");
    }
    else if (organizer === "") {
      toast.error("fill out Organizer");
      }
       
    else {
      dispatch(createEvent(formData));
      toast.success("Event Added Successfully");
      dispatch(reset());
     
      
       // Reset the form data
    setFormData({
      title: "",
      date: "",
      location: "",
      ticketInitialNumber: "",
      ticketRemainNumber: "",
      organizer: "",
    });
    }
  };
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (user.role !== "admin") {
    // For example, if only customers are allowed to make a booking
    return <Navigate to="/unauthorized" />; // Redirect to an unauthorized page
  }
  return (
    <div>
      <ToastContainer/>
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
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
                  />
                  <i className="fa fa-search"></i>
                </div>
                <div className="flex items-center">
                  <img
                    src={
                      "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg"
                    }
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
              <h2 className="text-2xl font-bold mb-4">Add New Event</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="title" className="block mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500  w-full"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="title" className="block mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500  w-full"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="title" className="block mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500  w-full"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="organizer" className="block mb-1">
                    Organizer
                  </label>
                  <input
                    type="text"
                    id="organizer"
                    name="organizer"
                    value={formData.organizer}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500  w-full"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="ticketNumber" className="block mb-1">
                    Ticket Number
                  </label>
                  <input
                    type="text"
                    id="ticketNumber"
                    name="ticketInitialNumber"
                    value={formData.ticketInitialNumber}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500  w-full"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="remainingTicket" className="block mb-1">
                    Remaining Ticket
                  </label>
                  <input
                    type="text"
                    id="remainingTicket"
                    name="ticketRemainNumber"
                    value={formData.ticketRemainNumber}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500  w-full"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Add Event
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AddNewEvents;
