// app/products/[id]/page.js
'use client'
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchProductById } from '../../lib/api';
import ImageGallery from '../../Components/ImageGallery'; // Import ImageGallery

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
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
    router.back();
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
    <div className="p-4 max-w-4xl mx-auto">
      <button onClick={handleGoBack} className="bg-blue-500 text-white py-2 px-4 rounded mb-4">
        Go Back
      </button>
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <ImageGallery images={product.images} /> {/* Use ImageGallery component */}
      
      {/* Category */}
      <p className="text-lg font-medium mb-2">Category: {product.category}</p>
      
      {/* Tags */}
      <p className="text-lg font-medium mb-2">Tags: {product.tags.join(', ')}</p>
      
      {/* Price */}
      <p className="text-lg font-medium mb-2">Price: ${product.price}</p>
      
      {/* Rating */}
      <p className="text-lg mb-2">Rating: {product.rating} / 5</p>
      
      {/* Stock and Availability */}
      <p className="text-lg mb-2">Stock: {product.stock} available</p>
      
      {/* Description */}
      <p className="text-base mb-4">{product.description}</p>

      {/* Reviews */}
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
