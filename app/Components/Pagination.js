'use client'

import Link from 'next/link';

/**
 * Pagination component renders navigation links to paginate through pages.
 * 
 * @function Pagination
 * @param {Object} props - The component props.
 * @param {number} props.currentPage - The current page number.
 * @returns {JSX.Element} The component rendering pagination controls.
 */
export default function Pagination({ currentPage }) {
  return (
    <div className="flex justify-center space-x-4 mt-4">
      {currentPage > 1 && (
        <Link href={`/?page=${currentPage - 1}`} className="px-4 py-2 bg-blue-500 text-white rounded">
          Previous
        </Link>
      )}
      <Link href={`/?page=${currentPage + 1}`} className="px-4 py-2 bg-blue-500 text-white rounded">
        Next
      </Link>
    </div>
  );
}
