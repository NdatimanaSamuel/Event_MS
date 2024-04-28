import { ToastContainer, toast } from "react-toastify"
import SideBarMenu from "../../components/SideBarMenu"
import { Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEventById, updateEvent } from "../../redux/features/events/eventSlice";

const UpdateEvent = () => {
  const { eventId } = useParams(); // Get the eventId from the URL
  const dispatch = useDispatch();
  const event = useSelector(state => state.event.events); // Assuming your slice name is 'event'

  const [updateFormData, setUpdateFormData] = useState({
    title: "",
    date: "",
    location: "",
    ticketInitialNumber: "",
    ticketRemainNumber: "",
    organizer: "",
  });

  useEffect(() => {
    dispatch(getEventById(eventId)); // Fetch event data by ID when component mounts
  }, [dispatch, eventId]);

  useEffect(() => {
    // Populate form fields with event data when event state changes
    if (event) {
      setUpdateFormData({
        title: event.title,
        date: event.date,
        location: event.location,
        ticketInitialNumber: event.ticketInitialNumber,
        ticketRemainNumber: event.ticketRemainNumber,
        organizer: event.organizer,
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData({ ...updateFormData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle update form submission here
    dispatch(updateEvent({ eventId, eventData: updateFormData }));
    toast.success("Event Updated Successfully");

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
              <h2 className="text-2xl font-bold mb-4">Update Exist Event</h2>
              <form onSubmit={handleSubmit}>
                {/* Update form fields with event data */}
                <div className="mb-4">
                  <label htmlFor="title" className="block mb-1">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={updateFormData.title}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 w-full"
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
                    value={updateFormData.date}
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
                    value={updateFormData.location}
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
                    value={updateFormData.organizer}
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
                    value={updateFormData.ticketInitialNumber}
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
                    value={updateFormData.ticketRemainNumber}
                    onChange={handleChange}
                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500  w-full"
                  />
                </div>
                {/* Add other form fields similarly */}
                
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Update Event
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default UpdateEvent;
