// app/products/[id]/page.js
'use client'
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchProductById } from '../../lib/api';
import ImageGallery from '../../Components/ImageGallery'; // Import ImageGallery
import Header from '../../Components/Header'; 

/**
 * ProductDetails component fetches and displays detailed information about a product.
 * 
 * @function ProductDetails
 * @returns {JSX.Element} The component rendering the product details.
 */
export default function ProductDetails() {
  const { id } = useParams(); // Get the product ID from URL parameters
  const router = useRouter(); // Initialize the router for navigation
  const [product, setProduct] = useState(null); // State to store product data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage errors

  /**
   * Fetch product details when the component mounts or the ID changes.
   * 
   * @function useEffect
   */
  useEffect(() => {
    if (id) {
      setLoading(true); // Set loading to true before fetching data
      fetchProductById(id)
        .then((data) => {
          console.log('Product data received:', data);
          setProduct(data); // Set the fetched product data
          setLoading(false); // Set loading to false after data is fetched
        })
        .catch((err) => {
          console.error('Error in component:', err);
          setError(err.message || 'Failed to load product.'); // Set error message if fetching fails
          setLoading(false); // Set loading to false if there's an error
        });
    }
  }, [id]);

  /**
   * Handle navigation to the previous page.
   * 
   * @function handleGoBack
   */
  const handleGoBack = () => {
    router.back(); // Navigate to the previous page
  };

  // Render loading state
  if (loading) return <p>Loading product with ID: {id}...</p>;

  // Render error state
  if (error) return (
    <div>
      <p>Error loading product with ID: {id}</p>
      <p>Error details: {error}</p>
    </div>
  );

  // Render product not found state
  if (!product) return <p>Product with ID: {id} not found.</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <button onClick={handleGoBack} className="bg-blue-500 text-white py-2 px-4 rounded mb-4">
        Go Back
      </button>
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <ImageGallery images={product.images} /> {/* Display the product images */}
      
      {/* Display product category */}
      <p className="text-lg font-medium mb-2">Category: {product.category}</p>
      
      {/* Display product tags */}
      <p className="text-lg font-medium mb-2">Tags: {product.tags.join(', ')}</p>
      
      {/* Display product price */}
      <p className="text-lg font-medium mb-2">Price: ${product.price}</p>
      
      {/* Display product rating */}
      <p className="text-lg mb-2">Rating: {product.rating} / 5</p>
      
      {/* Display product stock and availability */}
      <p className="text-lg mb-2">Stock: {product.stock} available</p>
      
      {/* Display product description */}
      <p className="text-base mb-4">{product.description}</p>

      {/* Display product reviews */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Reviews</h2>
        {product.reviews && product.reviews.length > 0 ? (
          <ul className="space-y-4">
            {product.reviews.map((review, index) => (
              <li key={index} className="border-b pb-4">
                <p className="font-semibold">{review.name}</p>
                <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                <p className="mt-1">Rating: {review.rating} / 5</p>
                <p className="mt-1">{review.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reviews available</p>
        )}
      </div>
    </div>
  );
}
