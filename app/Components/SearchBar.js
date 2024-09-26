import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  const handleChange = (e) => {
    setSearchTerm(e.target.value); // Update search term
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Optionally, you can trigger fetching here if not handled automatically
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
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Search</button>
    </form>
  );
};

export default SearchBar;
