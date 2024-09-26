// app/page.js
'use client';  // Mark this component as a Client Component

import "./globals.css";
import { useEffect, useState } from 'react'; // Import useEffect for fetching data
import { fetchProducts } from './lib/api';
import ProductList from './Components/ProductList';
import Pagination from './Components/Pagination';
import ErrorBoundary from './Components/ErrorBoundary';
import Header from "./Components/Header";
import SearchBar from './Components/SearchBar'; // Import the SearchBar component

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
  const [products, setProducts] = useState([]); // State to store fetched products
  const [error, setError] = useState(null); // State to store error if occurs

  // Function to fetch products
  const fetchProductData = async () => {
    setError(null); // Reset error before fetching
    try {
      const fetchedProducts = await fetchProducts(page, 20, searchTerm); // Fetch products with search term
      setProducts(fetchedProducts); // Update state with fetched products
    } catch (error) {
      setError(error); // Update error state
    }
  };

  // Use effect to fetch products when page or searchTerm changes
  useEffect(() => {
    fetchProductData();
  }, [page, searchTerm]); // Re-fetch when page or searchTerm changes

  return (
    <>
      <Header />
      <main className="relative animated-background p-8 min-h-screen">
        <div className="overlay"></div>
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Products</h2>
        
        {/* Add SearchBar */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
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
