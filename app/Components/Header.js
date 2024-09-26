'use client';

import Link from 'next/link';
import { useState } from 'react';
// Import the SearchBar component

/**
 * Header component for site navigation and filtering.
 *
 * @function Header
 * @param {Object} props - The component props.
 * @param {string} props.sortOrder - The current sort order.
 * @param {Function} props.setSortOrder - Function to update sort order.
 * @param {Function} props.setSearchTerm - Function to update search term.
 * @returns {JSX.Element} The header component rendering navigation and filters.
 */
export default function Header({ sortOrder, setSortOrder, setSearchTerm }) {
  const [searchValue, setSearchValue] = useState(''); // Local state for search input

  // Handle search term update
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    setSearchTerm(e.target.value); // Update parent component's search term state
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Site Logo or Title */}
        <h1 className="text-2xl font-bold">
          <Link href="/" className="hover:text-gray-200">
            MyProductStore
          </Link>
        </h1>

       

      

        {/* Navigation Links */}
        <nav className="space-x-4">
          <Link href="/" className="hover:text-gray-200">
            Home
          </Link>
          <Link href="/products" className="hover:text-gray-200">
            Products
          </Link>
          <Link href="/wishlist" className="hover:text-gray-200">
            Wishlist
          </Link>
          <Link href="/cart" className="hover:text-gray-200">
            Cart
          </Link>
        </nav>

        {/* Login/Logout */}
        <div>
          <Link href="/login" className="hover:text-gray-200">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
