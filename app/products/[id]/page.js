'use client'
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchProductById } from '../../lib/api';
import ImageGallery from '../../Components/ImageGallery'; // Import ImageGallery
import Header from '../../Components/Header'; // Import Header
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faStar as faStarEmpty } from '@fortawesome/free-solid-svg-icons';

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
  if (loading) return <p className="text-center text-gray-500">Loading product with ID: {id}...</p>;

  // Render error state
  if (error) return (
    <div className="text-center text-red-500">
      <p>Error loading product with ID: {id}</p>
      <p>Error details: {error}</p>
    </div>
  );

  // Render product not found state
  if (!product) return <p className="text-center text-gray-500">Product with ID: {id} not found.</p>;

  // Function to render stars based on rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, index) => (
          <FontAwesomeIcon key={index} icon={faStar} className="text-yellow-500" />
        ))}
        {hasHalfStar && <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-500" />}
        {[...Array(emptyStars)].map((_, index) => (
          <FontAwesomeIcon key={index} icon={faStarEmpty} className="text-gray-300" />
        ))}
      </div>
    );
  };

  return (
    <>
      <Header /> {/* Include the Header component */}
      <div className="pt-20 p-8 max-w-6xl mx-auto bg-gradient-to-r from-blue-100 to-green-100 shadow-lg rounded-lg mb-8">
        <button
          onClick={handleGoBack}
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-2 px-4 rounded-lg mb-6 shadow-md hover:opacity-80 transition-opacity duration-300"
        >
          Go Back
        </button>
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">{product.title}</h1>
        <ImageGallery images={product.images} /> {/* Display the product images */}
        
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border-t-8 border-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
          {/* Display product category */}
          <p className="text-lg font-semibold text-blue-800 mb-2">Category: <span className="font-normal text-gray-600">{product.category}</span></p>
          
          {/* Display product tags */}
          <p className="text-lg font-semibold text-blue-800 mb-2">Tags: <span className="font-normal text-gray-600">{product.tags.join(', ')}</span></p>
          
          {/* Display product price */}
          <p className="text-2xl font-bold text-green-600 mb-4">Price: ${product.price}</p>
          
          {/* Display product rating */}
          <p className="text-lg mb-2">Rating: {renderStars(product.rating)}</p>
          
          {/* Display product stock and availability */}
          <p className="text-lg mb-4">Stock: <span className="font-semibold text-red-500">{product.stock}</span> available</p>
          
          {/* Display product description */}
          <p className="text-base mb-6 text-gray-700">{product.description}</p>
        </div>

        {/* Display product reviews */}
        <div className="bg-white p-6 rounded-lg shadow-lg border-t-8 border-gradient-to-r from-teal-400 via-blue-500 to-indigo-600">
          <h2 className="text-2xl font-extrabold text-gray-800 mb-4">Reviews</h2>
          {product.reviews && product.reviews.length > 0 ? (
            <ul className="space-y-4">
              {product.reviews.map((review, index) => (
                <li key={index} className="border-b border-gray-300 pb-4">
                  <p className="font-semibold text-gray-800">{review.name}</p>
                  <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                  <p className="mt-1">Rating: {renderStars(review.rating)}</p>
                  <p className="mt-1 text-gray-700">{review.comment}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No reviews available</p>
          )}
        </div>
      </div>
    </>
  );
}
