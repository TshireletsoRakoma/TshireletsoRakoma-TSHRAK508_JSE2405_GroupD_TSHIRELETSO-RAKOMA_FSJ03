import React from 'react';

/**
 * Filter component for selecting a category from a dropdown.
 *
 * @param {Object} props - The component props.
 * @param {string} props.selectedCategory - The currently selected category.
 * @param {Function} props.setSelectedCategory - The function to update the selected category.
 * @param {Array<string>} props.categories - The list of available categories.
 * 
 * @returns {JSX.Element} A dropdown select element for category filtering.
 */
const Filter = ({ selectedCategory, setSelectedCategory, categories }) => {
  return (
    <div className="mb-4 flex items-center">
      <label htmlFor="filter" className="mr-2 font-semibold text-gray-700">Filter By Category:</label>
      <select
        id="filter"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border border-gray-300 rounded-lg p-2 transition duration-200 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
