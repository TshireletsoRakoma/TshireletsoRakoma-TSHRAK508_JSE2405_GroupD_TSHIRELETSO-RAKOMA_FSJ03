import "./globals.css";
import { Suspense } from 'react';
import { fetchProducts } from './lib/api';
import ProductList from './Components/ProductList';
import Pagination from './Components/Pagination';
import ErrorBoundary from './Components/ErrorBoundary';
import Header from "./Components/Header"; // Import the Header component

/**
 * The main component for the homepage that displays a list of products.
 * 
 * This component fetches a paginated list of products based on the `page` query parameter,
 * and renders the product list, pagination controls, and handles errors.
 * 
 * @param {Object} props - The component props.
 * @param {URLSearchParams} props.searchParams - The URL search parameters.
 * @returns {JSX.Element} The rendered homepage component.
 */
export default async function Home({ searchParams }) {
  const params = new URLSearchParams(searchParams);
  const page = Number(params.get('page')) || 1;

  try {
    const products = await fetchProducts(page);

    return (
      <>
        <Header /> {/* Include the Header component */}
        <main className="relative animated-background p-8 min-h-screen">
          <div className="overlay"></div>
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Products</h2>
          <ErrorBoundary fallback={<p>Error loading products. Please try again later.</p>}>
            <Suspense fallback={<p className="text-center text-gray-500">Loading products...</p>}>
              <ProductList products={products} />
            </Suspense>
          </ErrorBoundary>
          <Pagination currentPage={page} />
        </main>
      </>
    );
  } catch (error) {
    return (
      <>
        <Header /> {/* Include the Header component */}
        <main className="relative animated-background p-8 min-h-screen">
          <div className="overlay"></div>
          <p className="text-center text-red-500 mt-8">Error: {error.message}</p>
        </main>
      </>
    );
  }
}
