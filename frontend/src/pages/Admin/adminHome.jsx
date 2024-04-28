import { useState } from "react";

import SideBarMenu from "../../components/SideBarMenu";

const AdminHome = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
              <div className="bg-sidebarBg p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800">130</h2>
                <p className="text-sm text-gray-600">All Events</p>
              </div>
              <div className="bg-sidebarBg p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800">10</h2>
                <p className="text-sm text-gray-600">All Pending booking</p>
              </div>
              <div className="bg-sidebarBg p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800">155</h2>
                <p className="text-sm text-gray-600">All Cancelled Booking</p>
              </div>
              <div className="bg-sidebarBg p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800">100k</h2>
                <p className="text-sm text-gray-600">All Approved Booking</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AdminHome;
