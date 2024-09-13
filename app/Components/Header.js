'use client';

import Link from 'next/link';

/**
 * Header component for site navigation.
 * 
 * @function Header
 * @returns {JSX.Element} The header component rendering navigation links.
 */
export default function Header() {
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
