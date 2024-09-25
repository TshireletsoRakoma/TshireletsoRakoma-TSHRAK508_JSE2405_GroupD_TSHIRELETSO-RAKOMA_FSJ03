'use client';

import "./globals.css";
import { useEffect, useState } from 'react';
import { fetchProducts } from './lib/api';
import ProductList from './Components/ProductList';
import Pagination from './Components/Pagination';
import ErrorBoundary from './Components/ErrorBoundary';
import Header from "./Components/Header"; // Import the Header component
import Sort from './Components/Sort'; // Import the Sort component
import SearchBar from './Components/SearchBar'; // Import the SearchBar component

export default function Home({ searchParams }) {
  const params = new URLSearchParams(searchParams);
  const page = Number(params.get('page')) || 1;
  
  const [allProducts, setAllProducts] = useState([]); // State for all products
  const [displayedProducts, setDisplayedProducts] = useState([]); // State for products displayed on the current page
  const [searchTerm, setSearchTerm] = useState(params.get('search') || ''); // Default search term
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order
  const [loading, setLoading] = useState(true); // Loading state
  const productsPerPage = 20; // Number of products per page

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts(); // Fetch all products (modify your fetchProducts function if necessary)
        setAllProducts(fetchedProducts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Update displayed products based on search term and sorting
  useEffect(() => {
    const sortedProducts = [...allProducts].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price; // Ascending
      } else {
        return b.price - a.price; // Descending
      }
    });

    const filteredProducts = sortedProducts.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setDisplayedProducts(filteredProducts.slice(startIndex, endIndex));
  }, [allProducts, searchTerm, sortOrder, page]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading products...</p>;
  }

  return (
    <>
      <Header sortOrder={sortOrder} setSortOrder={setSortOrder} /> {/* Pass props */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> {/* Include SearchBar */}
      <Sort sortOrder={sortOrder} setSortOrder={setSortOrder} /> {/* Include the Sort component */}
      <main className="relative animated-background p-8 min-h-screen">
        <div className="overlay"></div>
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Products</h2>
        <ErrorBoundary fallback={<p>Error loading products. Please try again later.</p>}>
          <ProductList products={displayedProducts} /> {/* Pass displayed products */}
        </ErrorBoundary>
        <Pagination currentPage={page} totalPages={Math.ceil(allProducts.length / productsPerPage)} /> {/* Pass total pages */}
      </main>
    </>
  );
}
