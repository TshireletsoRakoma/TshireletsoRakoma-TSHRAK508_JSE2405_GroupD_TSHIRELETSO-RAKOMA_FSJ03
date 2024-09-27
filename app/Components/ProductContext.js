// src/context/ProductContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchProducts } from '../lib/api'; // Import your API fetching function

// Create a context for products
const ProductContext = createContext();

// Custom hook to use the ProductContext
export const useProductContext = () => {
  return useContext(ProductContext);
};

// Provider component to wrap around your app
export const ProductProvider = ({ children }) => {
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [selectedCategory, setSelectedCategory] = useState(''); // Selected category
  const [allProducts, setAllProducts] = useState([]); // All fetched products
  const [displayedProducts, setDisplayedProducts] = useState([]); // Products to display
  const [error, setError] = useState(null); // Error state
  const [page, setPage] = useState(1); // Current page

  // Fetch products based on search term and sort order
  const fetchProductData = async () => {
    setError(null); // Reset error state
    try {
      const fetchedProducts = await fetchProducts(1, 9999, searchTerm, sortOrder); // Fetch products
      setAllProducts(fetchedProducts); // Update all products state
    } catch (error) {
      setError(error); // Set error if fetching fails
    }
  };

  // Effect to fetch products when search term or sort order changes
  useEffect(() => {
    fetchProductData(); // Fetch products when search term or sort order changes
  }, [searchTerm, sortOrder]);

  // Effect to filter and sort products whenever they change
  useEffect(() => {
    const filteredProducts = selectedCategory
      ? allProducts.filter(product => product.category === selectedCategory) // Filter by selected category
      : allProducts;

    // Sort the filtered products based on the selected sort order
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price; // Ascending or descending sort
    });

    // Update displayed products based on pagination
    const startIndex = (page - 1) * 20; // Assuming 20 products per page
    const paginatedProducts = sortedProducts.slice(startIndex, startIndex + 20);
    setDisplayedProducts(paginatedProducts); // Update displayed products state
  }, [allProducts, selectedCategory, sortOrder, page]); // Dependencies

  return (
    <ProductContext.Provider value={{
      sortOrder, setSortOrder,
      searchTerm, setSearchTerm,
      selectedCategory, setSelectedCategory,
      allProducts, setAllProducts,
      displayedProducts, error, page, setPage
    }}>
      {children}
    </ProductContext.Provider>
  );
};
