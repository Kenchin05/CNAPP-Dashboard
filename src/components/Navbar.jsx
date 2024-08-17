import React, { useState } from "react"; // Import React and useState
import { BiSolidBellRing } from "react-icons/bi"; // Import bell icon from react-icons
import { FaRegUserCircle } from "react-icons/fa"; // Import user icon from react-icons

const Navbar = ({ searchQuery, setSearchQuery }) => {
  // State to manage dropdown visibility
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Close dropdown when clicking outside
  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
      {/* Breadcrumb navigation */}
      <div className="flex items-center space-x-2">
        <span className="text-gray-500">Home</span>
        <span className="text-gray-500">{`>`}</span>
        <span className=" text-blue-900 font-bold">Dashboard V2</span>
      </div>

      {/* Search input field */}
      <div className="ml-auto mx-96">
        <input
          type="text"
          value={searchQuery} // Controlled input value
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query on change
          placeholder="Search anything..."
          className="w-full bg-blue-100 mr-40 px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-300"
        />
      </div>

      {/* Notification bell icon and user dropdown */}
      <div className="flex items-center space-x-8 ml-auto">
        <BiSolidBellRing className="text-blue-200 text-2xl cursor-pointer" />

        <div className="h-6 border-l border-gray-300"></div>

        {/* User Icon with Name and Dropdown */}
        <div className="relative">
          <div
            onClick={toggleDropdown}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <FaRegUserCircle className="text-blue-200 text-2xl" />
            <span className="text-gray-600">Jon</span>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
              <ul className="py-1">
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
