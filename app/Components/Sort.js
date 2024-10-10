import React from 'react';

/**
 * Sort component that allows users to select sorting order.
 *
 * @param {Object} props - The component props.
 * @param {string} props.sortOrder - The current sorting order (e.g., "asc" or "desc").
 * @param {Function} props.setSortOrder - Function to update the sorting order when changed.
 * 
 * @returns {JSX.Element} The rendered sort component with a label and a dropdown menu.
 */
const Sort = ({ sortOrder, setSortOrder }) => {
  /**
   * Handles changes in the sort order selection.
   * 
   * @param {React.ChangeEvent<HTMLSelectElement>} event - The change event from the select input.
   */
  const handleSortChange = (event) => {
    setSortOrder(event.target.value); // Update the sort order
  };

  return (
    <div className="mb-4 flex items-center">
      <label htmlFor="sortOrder" className="mr-2 font-semibold text-gray-700">Sort By:</label>
      <select
        id="sortOrder"
        value={sortOrder}
        onChange={handleSortChange}
        className="border border-gray-300 rounded-lg p-2 transition duration-200 ease-in-out focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
         <option value="">Default</option>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default Sort;
