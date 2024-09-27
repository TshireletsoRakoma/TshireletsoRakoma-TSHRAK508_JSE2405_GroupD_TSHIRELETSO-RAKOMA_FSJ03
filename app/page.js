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
import { ProductProvider } from './Components/ProductContext'; // Import ProductProvider

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
  const [allProducts, setAllProducts] = useState([]); // State to store all fetched products
  const [displayedProducts, setDisplayedProducts] = useState([]); // State to store products for current page
  const [error, setError] = useState(null); // State to store error if occurs
  const [selectedCategory, setSelectedCategory] = useState(''); // State for selected category
  const [categories, setCategories] = useState([]); // State for categories

  // Function to fetch products
  const fetchProductData = async () => {
    console.log("Fetching products with:", { page, searchTerm, sortOrder }); // Debug log
    setError(null); // Reset error before fetching
    try {
      const fetchedProducts = await fetchProducts(1, 9999, searchTerm, sortOrder); // Fetch all products (or max number) without pagination
      console.log('Fetched products:', fetchedProducts); // Debug log for fetched products
      setAllProducts(fetchedProducts); // Update state with all fetched products
    } catch (error) {
      console.error("Error fetching products:", error); // Log the error
      setError(error); // Update error state
    }
  };

  // Function to fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('https://next-ecommerce-api.vercel.app/categories'); // Update with your API URL
      const data = await response.json();
      setCategories(data); // Set the fetched categories
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Function to update URL parameters
  const updateURLParameters = () => {
    const url = new URL(window.location);
    url.searchParams.set('search', searchTerm);
    url.searchParams.set('category', selectedCategory);
    url.searchParams.set('sort', sortOrder);
    url.searchParams.set('page', page); // Include page parameter in URL
    window.history.pushState({}, '', url);
  };

  // Use effect to fetch products on component mount
  useEffect(() => {
    fetchProductData(); // Fetch all products initially
  }, []);

  // Use effect to fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Use effect to update URL parameters on filter changes
  useEffect(() => {
    updateURLParameters();
  }, [searchTerm, selectedCategory, sortOrder, page]); // Update URL parameters including page

  // Use effect to set displayed products based on sorting and filtering
  useEffect(() => {
    // Filter products based on selected category
    const filteredProducts = selectedCategory
      ? allProducts.filter(product => product.category === selectedCategory)
      : allProducts;

    // Filter further based on search term
    const searchedProducts = filteredProducts.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sort filtered products based on sortOrder without mutating the original array
    const sortedProducts = [...searchedProducts].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.price - b.price; // Sort by price ascending
      } else {
        return b.price - a.price; // Sort by price descending
      }
    });

    // Paginate the sorted results for the current page
    const startIndex = (page - 1) * 20; // Assuming 20 products per page
    const paginatedProducts = sortedProducts.slice(startIndex, startIndex + 20);

    setDisplayedProducts(paginatedProducts); // Update state with products for current page
  }, [allProducts, selectedCategory, sortOrder, page, searchTerm]); // Update when products, filters, or sort order change

  // Reset functionality to clear filters
  const handleReset = () => {
    setSearchTerm(''); // Clear search term
    setSelectedCategory(''); // Clear selected category
    setSortOrder('asc'); // Reset sort order to default
  };

  return (
    <ProductProvider> {/* Wrap the component with ProductProvider */}
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

          {/* Add Reset Button */}
          <button onClick={handleReset} className="bg-red-500 text-white p-2 rounded mb-4">
            Reset Filters
          </button>

          <ErrorBoundary fallback={<p>Error loading products. Please try again later.</p>}>
            {error ? (
              <p className="text-center text-red-500 mt-8">Error: {error.message}</p> // Display error message
            ) : (
              <ProductList products={displayedProducts} /> // Render products for current page
            )}
          </ErrorBoundary>
          
          <Pagination currentPage={page} />
        </main>
      </>
    </ProductProvider>
  );
}
