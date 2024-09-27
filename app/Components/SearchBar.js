import React, { useState } from 'react';

/**
 * SearchBar component for inputting and submitting a search term.
 *
 * @param {Object} props - The component props.
 * @param {string} props.searchTerm - The current search term entered by the user.
 * @param {Function} props.setSearchTerm - The function to update the search term.
 * 
 * @returns {JSX.Element} A search form with an input field and a submit button.
 */
const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const [isOpen, setIsOpen] = useState(false); // State to manage visibility of the search bar

  const handleChange = (e) => {
    setSearchTerm(e.target.value); // Update search term
  };

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission
    // Add search functionality if needed
  };

  const toggleSearchBar = () => {
    setIsOpen(prevState => !prevState); // Toggle the visibility of the search bar
  };

  return (
    <div className="relative max-w-xl mx-auto">
      {/* Button to toggle search bar */}
      <button 
        onClick={toggleSearchBar} 
        className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-200 absolute right-0 z-10"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-5 h-5"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3a8 8 0 100 16 8 8 0 000-16zM21 21l-4.35-4.35" />
        </svg>
      </button>

      {/* Search Bar Form */}
      <div 
        className={`transition-transform duration-300 ease-in-out transform ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'} origin-top`}
        aria-hidden={!isOpen}
      >
        <form className="flex items-center bg-gray-200 rounded-lg shadow-md p-2 mt-2">
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search..."
            className="flex-grow px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button 
            type="submit" 
            className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-200"
            onClick={handleSearch}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="w-5 h-5"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3a8 8 0 100 16 8 8 0 000-16zM21 21l-4.35-4.35" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
