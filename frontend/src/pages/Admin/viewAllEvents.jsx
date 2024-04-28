import { useState } from "react";
import SideBarMenu from "../../components/SideBarMenu";

const ViewAllEvents = () => {
  const [searchQuery, setSearchQuery] = useState("");

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

          <div className="container mx-auto mt-10 ml-10">
            <h2 className="text-2xl font-bold mb-4">View Events</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Discount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Organizer
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Ticket Number
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Remaining Ticket
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Event 1</td>
                  <td className="px-6 py-4 whitespace-nowrap">10%</td>
                  <td className="px-6 py-4 whitespace-nowrap">Organizer 1</td>
                  <td className="px-6 py-4 whitespace-nowrap">100</td>
                  <td className="px-6 py-4 whitespace-nowrap">50</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Event 2</td>
                  <td className="px-6 py-4 whitespace-nowrap">20%</td>
                  <td className="px-6 py-4 whitespace-nowrap">Organizer 2</td>
                  <td className="px-6 py-4 whitespace-nowrap">150</td>
                  <td className="px-6 py-4 whitespace-nowrap">100</td>
                </tr>
                {/* Add more sample event rows here if needed */}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ViewAllEvents;
