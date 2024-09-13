// app/products/[id].js
'use client'
import { useParams, useRouter } from 'next/navigation'; // Import useRouter
import { useEffect, useState } from 'react';
import { fetchProductById } from '../../lib/api';

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter(); // Initialize the router
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchProductById(id)
        .then((data) => {
          console.log('Product data received:', data);
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error in component:', err);
          setError(err.message || 'Failed to load product.');
          setLoading(false);
        });
    }
  }, [id]);

  const handleGoBack = () => {
    router.back(); // Navigate to the previous page
  };

  if (loading) return <p>Loading product with ID: {id}...</p>;
  if (error) return (
    <div>
      <p>Error loading product with ID: {id}</p>
      <p>Error details: {error}</p>
    </div>
  );
  if (!product) return <p>Product with ID: {id} not found.</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto"> {/* Center the content and limit the width */}
      <button onClick={handleGoBack} className="bg-blue-500 text-white py-2 px-4 rounded mb-4">
        Go Back
      </button>
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <div className="w-full h-96 flex items-center justify-center mb-4 overflow-hidden bg-gray-200 rounded-lg"> {/* Container for image */}
        {product.images && product.images.length > 0 ? (
          <img src={product.images[0]} alt={product.title} className="max-h-full max-w-full object-contain" /> 
        ) : (
          <p>No image available</p>
        )}
      </div>
      <p className="text-lg font-medium mb-2">Price: ${product.price}</p>
      <p className="text-lg mb-2">Rating: {product.rating} / 5</p>
      <p className="text-base">{product.description}</p> 
    </div>
  );
}
