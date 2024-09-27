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
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="border rounded p-2 mb-4"
    >
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
};

export default Filter;
