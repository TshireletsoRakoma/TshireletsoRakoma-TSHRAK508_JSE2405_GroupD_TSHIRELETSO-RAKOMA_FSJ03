'use client';  // Mark this component as a Client Component

import "./globals.css";
import { useEffect, useState } from 'react'; // Import useEffect for fetching data
import { fetchProducts } from './lib/api';
import ProductList from './Components/ProductList';
import Pagination from './Components/Pagination';
import ErrorBoundary from './Components/ErrorBoundary';
import Header from "./Components/Header";
import SearchBar from './Components/SearchBar'; // Import the SearchBar component
import Sort from './Components/Sort'; // Import the Sort component

/**
 * The main component for the homepage that displays a list of products.
 * 
 * This component fetches a paginated list of products based on the `page` query parameter and search term,
 * and renders the product list, pagination controls, and handles errors.
 * 
 * @param {Object} props - The component props.
 * @param {URLSearchParams} props.searchParams - The URL search parameters.
 * @returns {JSX.Element} The rendered homepage component.
 */
export default function Home({ searchParams }) {
  const params = new URLSearchParams(searchParams);
  const page = Number(params.get('page')) || 1;
  const [searchTerm, setSearchTerm] = useState(params.get('search') || "");
  const [sortOrder, setSortOrder] = useState("asc"); // State to manage sorting order
  const [products, setProducts] = useState([]); // State to store fetched products
  const [error, setError] = useState(null); // State to store error if occurs

  // Function to fetch products with search term and sort order
  const fetchProductData = async () => {
    setError(null); // Reset error before fetching
    try {
      const fetchedProducts = await fetchProducts(page, 20, searchTerm, sortOrder); // Fetch products with search term
      setProducts(fetchedProducts); // Update state with fetched products
    } catch (error) {
      setError(error); // Update error state
    }
  };

  // Use effect to fetch products when page, searchTerm, or sortOrder changes
  useEffect(() => {
    fetchProductData();
  }, [page, searchTerm, sortOrder]); // Re-fetch when page, searchTerm, or sortOrder changes

  return (
    <>
      <Header />
      <main className="relative animated-background p-8 min-h-screen">
        <div className="overlay"></div>
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Products</h2>
        
        {/* Add SearchBar and Sort Component */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Sort sortOrder={sortOrder} setSortOrder={setSortOrder} /> {/* Add Sort component */}
        
        <ErrorBoundary fallback={<p>Error loading products. Please try again later.</p>}>
          {error ? (
            <p className="text-center text-red-500 mt-8">Error: {error.message}</p> // Display error message
          ) : (
            <ProductList products={products} /> // Render product list
          )}
        </ErrorBoundary>
        
        <Pagination currentPage={page} />
      </main>
    </>
  );
}
