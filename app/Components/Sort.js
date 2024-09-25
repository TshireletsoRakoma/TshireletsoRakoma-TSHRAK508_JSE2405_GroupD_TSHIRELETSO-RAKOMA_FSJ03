// /src/components/Sort.js

'use client';

import PropTypes from 'prop-types';

/**
 * Sort component for selecting sorting options.
 * 
 * @function Sort
 * @param {Object} props - Component properties
 * @param {string} props.sortOrder - Current sorting order
 * @param {Function} props.setSortOrder - Function to update sorting order
 * @returns {JSX.Element} The sort component rendering sorting options.
 */
const Sort = ({ sortOrder, setSortOrder }) => {
  return (
    <select
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
      className="border rounded p-2 mb-4"
    >
      <option value="asc">Price: Low to High</option>
      <option value="desc">Price: High to Low</option>
    </select>
  );
};

Sort.propTypes = {
  sortOrder: PropTypes.string.isRequired,
  setSortOrder: PropTypes.func.isRequired,
};

export default Sort;
