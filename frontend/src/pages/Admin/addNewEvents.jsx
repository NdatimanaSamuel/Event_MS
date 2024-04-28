import { useState } from "react";
import SideBarMenu from "../../components/SideBarMenu";

const AddNewEvents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    discount: "",
    organizer: "",
    ticketNumber: "",
    remainingTicket: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    // Reset form fields after submission
    setFormData({
      title: "",
      discount: "",
      organizer: "",
      ticketNumber: "",
      remainingTicket: "",
    });
  };

  return (
    <div>
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
                    <h3 className="font-semibold">Manage Events</h3>
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
                  <label htmlFor="discount" className="block mb-1">
                    Discount
                  </label>
                  <input
                    type="text"
                    id="discount"
                    name="discount"
                    value={formData.discount}
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
                    name="ticketNumber"
                    value={formData.ticketNumber}
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
                    name="remainingTicket"
                    value={formData.remainingTicket}
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
