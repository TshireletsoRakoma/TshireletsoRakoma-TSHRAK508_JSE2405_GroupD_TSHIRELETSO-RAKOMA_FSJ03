import { useEffect } from 'react';

/**
 * SearchBar component for searching products.
 * 
 * @function SearchBar
 * @param {string} searchTerm - The current search term.
 * @param {Function} setSearchTerm - Function to update the search term.
 * @returns {JSX.Element} The rendered search bar component.
 */
const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (searchTerm) {
      params.set('search', searchTerm);
    } else {
      params.delete('search');
    }
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  }, [searchTerm]);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={handleChange}
      placeholder="Search products..."
      className="bg-white text-black rounded p-2"
    />
  );
};

export default SearchBar;
