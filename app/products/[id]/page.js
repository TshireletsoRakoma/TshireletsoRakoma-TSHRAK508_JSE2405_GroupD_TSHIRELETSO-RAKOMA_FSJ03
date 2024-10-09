'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchProductById } from '../../lib/api';
import ImageGallery from '../../Components/ImageGallery';
import Header from '../../Components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faStar as faStarEmpty } from '@fortawesome/free-solid-svg-icons';
import Head from 'next/head';
import WithAuth from '@/app/context/withAuth';


// New Loader component
const Loader = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

 function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchProductById(id)
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message || 'Failed to load product.');
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    if (product) {
      document.title = product.title;
      document.querySelector("meta[name='description']").setAttribute("content", product.description);
    }
  }, [product]);

  const handleGoBack = () => {
    router.back();
  };

  // Updated loading state
  if (loading) return <Loader />;

  if (error) return (
    <div className="text-center text-red-500">
      <p>Error loading product with ID: {id}</p>
      <p>Error details: {error}</p>
    </div>
  );

  if (!product) return <p className="text-center text-gray-500">Product with ID: {id} not found.</p>;

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, index) => (
          <FontAwesomeIcon key={index} icon={faStar} className="text-yellow-400" />
        ))}
        {hasHalfStar && <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-400" />}
        {[...Array(emptyStars)].map((_, index) => (
          <FontAwesomeIcon key={index} icon={faStarEmpty} className="text-gray-300" />
        ))}
      </div>
    );
  };

  // Function to sort reviews
  const sortedReviews = () => {
    return product.reviews.slice().sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });
  };

  // Function to calculate total ratings
  const calculateRatingsSummary = () => {
    const totalRatings = product.reviews.length;
    const ratingCounts = Array(6).fill(0); // Array to hold counts for each star (1-5)
    let totalStars = 0;

    product.reviews.forEach((review) => {
      const rating = Math.round(review.rating);
      if (rating >= 1 && rating <= 5) {
        ratingCounts[rating]++;
        totalStars += rating;
      }
    });

    const averageRating = totalStars > 0 ? (totalStars / totalRatings).toFixed(1) : 0;

    return { ratingCounts, totalRatings, averageRating };
  };

  const { ratingCounts, totalRatings, averageRating } = calculateRatingsSummary();

  // Function to render the updated rating summary
  const renderRatingSummary = () => (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg mb-6">
      <div className="flex items-center mb-4">
        <span className="text-4xl font-bold mr-2">{averageRating}</span>
        <div>
          {renderStars(parseFloat(averageRating))}
          <p className="text-sm">{totalRatings} Reviews</p>
        </div>
      </div>
      {[5, 4, 3, 2, 1].map((star) => (
        <div key={star} className="flex items-center mb-2">
          <span className="w-8">{star} ★</span>
          <div className="flex-grow mx-2 bg-gray-700 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-yellow-400 h-full" 
              style={{ width: `${(ratingCounts[star] / totalRatings) * 100}%` }}
            ></div>
          </div>
          <span className="w-8 text-right">{ratingCounts[star]}</span>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Head>
        <title>{product.title}</title>
        <meta name="description" content={product.description} />
      </Head>
      
      <div className="pt-20 p-8 max-w-6xl mx-auto bg-gradient-to-r from-blue-100 to-green-100 shadow-lg rounded-lg mb-8">
        <button
          onClick={handleGoBack}
          className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-2 px-4 rounded-lg mb-6 shadow-md hover:opacity-80 transition-opacity duration-300"
        >
          Go Back
        </button>
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">{product.title}</h1>
        <ImageGallery images={product.images} />
        
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border-t-8 border-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
          <p className="text-lg font-semibold text-blue-800 mb-2">Category: <span className="font-normal text-gray-600">{product.category}</span></p>
          <p className="text-lg font-semibold text-blue-800 mb-2">Tags: <span className="font-normal text-gray-600">{product.tags.join(', ')}</span></p>
          <p className="text-2xl font-bold text-green-600 mb-4">Price: ${product.price}</p>
          <p className="text-lg mb-2">Rating: {renderStars(product.rating)}</p>
          <p className="text-lg mb-4">Stock: <span className="font-semibold text-red-500">{product.stock}</span> available</p>
          <p className="text-base mb-6 text-gray-700">{product.description}</p>
        </div>

        {/* Updated Ratings Summary Section */}
        {renderRatingSummary()}

        {/* Sorting options for reviews */}
        <div className="mb-4">
          <label htmlFor="sortBy" className="font-semibold text-gray-800">Sort Reviews By:</label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="ml-2 border border-gray-300 rounded-md p-2"
          >
            <option value="date">Date</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        {/* Display product reviews */}
        <div className="bg-white p-6 rounded-lg shadow-lg border-t-8 border-gradient-to-r from-teal-400 via-blue-500 to-indigo-600">
          <h2 className="text-2xl font-extrabold text-gray-800 mb-4">Reviews</h2>
          {product.reviews && product.reviews.length > 0 ? (
            <ul className="space-y-4">
              {sortedReviews().map((review, index) => (
                <li key={index} className="border-b pb-2">
                  <p className="text-lg font-semibold">{review.username}</p>
                  <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                  <p className="text-lg mb-2">{renderStars(review.rating)}</p>
                  <p className="text-gray-700">{review.comment}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No reviews yet. Be the first to leave a review!</p>
          )}
        </div>
      </div>
    </>
  );
}

export default WithAuth(ProductDetails);
