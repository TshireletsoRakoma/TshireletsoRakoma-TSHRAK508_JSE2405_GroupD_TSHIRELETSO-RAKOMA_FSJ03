'use client';

import Link from 'next/link';
import { useState } from 'react';
import SearchBar from './SearchBar'; // Import the SearchBar component
import Sort from './Sort'; // Import the Sort component

/**
 * Header component for site navigation.
 * 
 * @function Header
 * @returns {JSX.Element} The header component rendering navigation links.
 */
export default function Header() {
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term
  const [sortOrder, setSortOrder] = useState('asc'); // State for sort order

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Site Logo or Title */}
        <h1 className="text-2xl font-bold">
          <Link href="/" className="hover:text-gray-200">
            MyProductStore
          </Link>
        </h1>

        {/* Search Bar */}
        <div className="flex-1 mx-4"> {/* Added a wrapper for layout */}
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        {/* Sort Options */}
        <div className="mx-4">
          <Sort sortOrder={sortOrder} setSortOrder={setSortOrder} />
        </div>

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
          {/* Add more navigation links as needed */}
        </nav>
        
        {/* User Authentication / Login / Logout */}
        <div>
          {/* Example of conditional rendering for user auth */}
          <Link href="/login" className="hover:text-gray-200">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
