"use client"

import Link from 'next/link';

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