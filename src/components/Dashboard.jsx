import React, { useState } from "react";
import { FaSyncAlt, FaEllipsisV, FaClock, FaChevronDown } from "react-icons/fa";
import useStore from "../store/store";
import AddWidgetModal from "./AddWidgetModal";
import Navbar from "./Navbar"; // Import Navbar component

const Dashboard = () => {
  const { categories, removeWidget } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Function to filter widgets based on the search query
  const filterWidgets = (widgets) => {
    if (!searchQuery) return widgets;
    return widgets.filter(
      (widget) =>
        widget.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        widget.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div>
      {/* Ensure Navbar is only rendered once */}
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="p-8 bg-blue-50">
        {/* Top bar with title and buttons */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">CNAPP Dashboard</h1>
          <div className="flex items-center space-x-2">
            <button
              onClick={openModal}
              className="flex items-center bg-white border border-gray-300 rounded px-4 py-2 shadow-sm"
            >
              + Add Widget
            </button>
            <button className="flex items-center bg-white border border-gray-300 rounded p-2 shadow-sm">
              <FaSyncAlt />
            </button>
            <button className="flex items-center bg-white border border-gray-300 rounded p-2 shadow-sm">
              <FaEllipsisV />
            </button>
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center bg-white border border-blue-900 text-blue-900 font-bold rounded px-4 py-2 shadow-sm"
              >
                <FaClock className="mr-2" />
                | Last 2 days
                <FaChevronDown className="ml-2" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
                  <ul className="py-1">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Last 24 hours
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Last 7 days
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      Last 30 days
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {Object.entries(categories).map(([key, category]) => {
          // Filter and ensure there are always 3 slots in each category
          const widgetsWithPlaceholders = filterWidgets([...category.widgets]);

          while (widgetsWithPlaceholders.length < 3) {
            widgetsWithPlaceholders.push({
              id: `placeholder-${widgetsWithPlaceholders.length}`,
              title: "",
              text: "",
              isPlaceholder: true,
            });
          }

          return (
            <div key={key} className="mb-6">
              <h2 className="text-xl font-bold mb-2">{category.title}</h2>
              <div className="grid grid-cols-3 h-60 gap-4">
                {widgetsWithPlaceholders.map((widget) =>
                  widget.isPlaceholder ? (
                    <button
                      key={widget.id}
                      onClick={openModal}
                      className="rounded-2xl border-2 p-4 bg-white shadow-md text-center"
                    >
<div className="border-2 mx-auto py-2 px-4 inline-flex items-center justify-center text-md rounded-md text-gray-400 font-semibold cursor-pointer hover:bg-gray-100 whitespace-nowrap">
    <span className="mr-2">+</span> <span>Add Widget</span>
</div>


                    </button>
                  ) : (
                    <div key={widget.id} className="border bg-white rounded-xl shadow-md p-4 relative">
                      <h3 className="text-lg font-semibold">{widget.title}</h3>
                      <p>{widget.text}</p>
                      <button onClick={() => removeWidget(key, widget.id)} className="absolute top-2 right-2 text-red-500">
                        &times;
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          );
        })}

        {/* Modal for adding a widget */}
        {isModalOpen && <AddWidgetModal onClose={closeModal} />}
      </div>
    </div>
  );
};

export default Dashboard;
