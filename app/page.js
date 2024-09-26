'use client'; // Mark this component as a Client Component

import "./globals.css";
import { useEffect, useState } from 'react'; // Import useEffect for fetching data
import { fetchProducts } from './lib/api';
import ProductList from './Components/ProductList';
import Pagination from './Components/Pagination';
import ErrorBoundary from './Components/ErrorBoundary';
import Header from "./Components/Header";
import SearchBar from './Components/SearchBar'; // Import the SearchBar component
import Sort from './Components/Sort'; // Import the Sort component
import Filter from './Components/Filter'; // Import the Filter component

/**
 * The main component for the homepage that displays a list of products.
 * 
 * This component fetches a paginated list of products based on the `page` query parameter,
 * search term, and sort order, rendering the product list, pagination controls, and handling errors.
 * 
 * @param {Object} props - The component props.
 * @param {URLSearchParams} props.searchParams - The URL search parameters.
 * @returns {JSX.Element} The rendered homepage component.
 */
export default function Home({ searchParams }) {
  const params = new URLSearchParams(searchParams);
  const page = Number(params.get('page')) || 1;
  const [searchTerm, setSearchTerm] = useState(params.get('search') || "");
  const [sortOrder, setSortOrder] = useState('asc'); // State to store sort order
  const [products, setProducts] = useState([]); // State to store fetched products
  const [error, setError] = useState(null); // State to store error if occurs
  const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category
  const [categories, setCategories] = useState([]); // State for categories

  // Function to fetch products
  const fetchProductData = async () => {
    console.log("Fetching products with:", { page, searchTerm, sortOrder }); // Debug log
    setError(null); // Reset error before fetching
    try {
      const fetchedProducts = await fetchProducts(page, 20, searchTerm, sortOrder); // Fetch products with search term and sort order
      console.log('Fetched products:', fetchedProducts); // Debug log for fetched products
      setProducts(fetchedProducts); // Update state with fetched products
    } catch (error) {
      console.error("Error fetching products:", error); // Log the error
      setError(error); // Update error state
    }
  };

  // Function to fetch categories (assumed you have a function for this)
  const fetchCategories = async () => {
    try {
      const response = await fetch('https://next-ecommerce-api.vercel.app/categories'); // Update with your API URL
      const data = await response.json();
      setCategories(data); // Set the fetched categories
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Use effect to fetch products when page, searchTerm or sortOrder changes
  useEffect(() => {
    fetchProductData();
  }, [page, searchTerm, sortOrder]); // Re-fetch when page, searchTerm, or sortOrder changes

  // Use effect to fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  return (
    <>
      <Header />
      <main className="relative animated-background p-8 min-h-screen">
        <div className="overlay"></div>
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Products</h2>
        
        {/* Add SearchBar */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        {/* Add Sort Component */}
        <Sort sortOrder={sortOrder} setSortOrder={setSortOrder} />
        
        {/* Add Filter Component */}
        <Filter selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={categories} />

        <ErrorBoundary fallback={<p>Error loading products. Please try again later.</p>}>
          {error ? (
            <p className="text-center text-red-500 mt-8">Error: {error.message}</p> // Display error message
          ) : (
            <ProductList products={filteredProducts} /> // Render filtered product list
          )}
        </ErrorBoundary>
        
        <Pagination currentPage={page} />
      </main>
    </>
  );
}
