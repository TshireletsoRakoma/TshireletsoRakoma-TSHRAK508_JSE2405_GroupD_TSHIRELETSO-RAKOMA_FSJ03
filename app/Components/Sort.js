// /src/components/Sort.js
import React from 'react';

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

export default Sort;
