// Products.js
'use client'
import { useEffect, useState } from 'react';
import { fetchProducts } from './api'; // Adjust the path as necessary
import ProductCard from './ProductCard';

/**
 * Products component fetches and displays a list of products with sorting capabilities.
 * 
 * @function Products
 * @returns {JSX.Element} The component rendering a list of `ProductCard` components.
 */
export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc'); // Default sort order
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const data = await fetchProducts(1, 20, searchTerm, sortOrder);
        setProducts(data.products); // Assuming the response has a 'products' field
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [sortOrder, searchTerm]); // Fetch products when sortOrder or searchTerm changes

  const handleSortChange = (event) => {
    setSortOrder(event.target.value); // Update sort order based on user selection
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <select onChange={handleSortChange} value={sortOrder}>
        <option value="asc">Price: Low to High</option>
        <option value="desc">Price: High to Low</option>
      </select>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
