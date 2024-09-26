import React from 'react';

/**
 * Sort component that allows users to select sorting order.
 *
 * @param {Object} props - The component props.
 * @param {string} props.sortOrder - The current sorting order.
 * @param {Function} props.setSortOrder - Function to update the sorting order.
 * @returns {JSX.Element} The rendered sort component.
 */
const Sort = ({ sortOrder, setSortOrder }) => {
  const handleSortChange = (event) => {
    setSortOrder(event.target.value); // Update the sort order
  };

  return (
    <div className="mb-4">
      <label htmlFor="sortOrder" className="mr-2">Sort By:</label>
      <select id="sortOrder" value={sortOrder} onChange={handleSortChange}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
};

export default Sort;
