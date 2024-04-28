import { FaHome } from "react-icons/fa";
import CustomerMenus from "../../components/CustomerMenus";

const CustomerHome = () => {
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
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">
            Available Events
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <img
                src="https://i.pinimg.com/originals/8e/07/80/8e078013204d0cc9876e9edbb1fd3f85.jpg"
                alt="Inyange Dairy"
                className="w-full h-56 object-cover object-center"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">Inyange Dairy</h2>
                <p className="text-gray-600">Musanze</p>
                <p className="text-gray-600">April 30, 2024</p>
                <p className="mt-2 text-gray-700">
                  Inyange industries is engaged in the business of producing &
                  selling a wide variety of fruit products, including fruit
                  juice concentrates, fruit juice drinks & dairy related
                  products.
                </p>
                <a
                  href="#"
                  className="block mt-2 text-center bg-sidebarBg text-gray-500 font-semibold px-4 py-2 rounded-md hover:bg-sidebarBg transition duration-300"
                >
                  Book Ticket Now
                </a>
              </div>
            </div>

            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
              <img
                src="https://i.pinimg.com/originals/8e/07/80/8e078013204d0cc9876e9edbb1fd3f85.jpg"
                alt="Mukamira Dairy"
                className="w-full h-56 object-cover object-center"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">Mukamira Dairy</h2>
                <p className="text-gray-600">Gicumbi</p>
                <p className="text-gray-600">May 5, 2024</p>
                <p className="mt-2 text-gray-700">
                  The Mukamira Plant has started operating since 2017. Its
                  operations include processing and selling pasteurized milk,
                  gouda cheese, yogurt, UHT-whole milk, UHT Flavored.
                </p>
                <a
                  href="#"
                  className="block mt-2 text-center bg-sidebarBg text-gray-500 font-semibold px-4 py-2 rounded-md hover:bg-sidebarBg transition duration-300"
                >
                  Book Ticket Now
                </a>
              </div>
            </div>
            {/* Add more event cards as needed */}
          </div>
        </div>
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
