import React from 'react';

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
  /**
   * Handles changes to the search input.
   * 
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event triggered by input.
   */
  const handleChange = (e) => {
    setSearchTerm(e.target.value); // Update search term
  };

  /**
   * Handles form submission.
   * 
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   */
  const handleSearch = (e) => {
    e.preventDefault();
    // Optionally, trigger search fetch here if necessary
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search for products..."
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
