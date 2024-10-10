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

// Loader component
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

  // State for review form
  const [username, setUsername] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchProductById(id)
        .then((data) => {
          setProduct(data[id-1]);
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

  const sortedReviews = () => {
    console.log(product)
    return product.reviews.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0;
    });
  };

  const calculateRatingsSummary = () => {
    const totalRatings = product.reviews.length;
    const ratingCounts = Array(6).fill(0);
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

  const renderRatingSummary = () => {
    const { ratingCounts, totalRatings, averageRating } = calculateRatingsSummary();
    return (
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
  };

  const handleReviewSubmit = async (e) => {

    console.log(username, comment,rating)
    e.preventDefault();

    if (!rating) {
      alert('Please select a rating before submitting your review.');
      return;
    }

    const newReview = {
      username,
      rating: parseFloat(rating),
      comment,
      productId: id,
    };

    try {
      if (editIndex !== null) {
        // Edit existing review
        const response = await fetch(`/api/reviews`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            reviewId: product.reviews[editIndex].id,
            updatedComment: comment,
            updatedRating: rating,
          }),
        });
        if (!response.ok) throw new Error('Failed to update review');
      } else {
        // Add new review
        const response = await fetch('/api/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newReview),
        });
        if (!response.ok) throw new Error('Failed to add review');
      }

      // Refetch the product to get updated reviews
      const updatedProduct = await fetchProductById(id);
      setProduct(updatedProduct[id]);

      // Clear form and set success message
      setUsername('');
      setRating(0);
      setComment('');
      setEditIndex(null);
      setSuccessMessage(editIndex !== null ? 'Review updated successfully!' : 'Review submitted successfully!');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      const response = await fetch(`/api/reviews?reviewId=${reviewId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete review');

      // Refetch the product to get updated reviews
      const updatedProduct = await fetchProductById(id);
      setProduct(updatedProduct[id]);
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete review. Please try again.');
    }
  };

  const handleEditReview = (index) => {
    const reviewToEdit = product.reviews[index];
    setUsername(reviewToEdit.username);
    setRating(reviewToEdit.rating);
    setComment(reviewToEdit.comment);
    setEditIndex(index);
  };

  if (loading) return <Loader />;

  if (error) return (
    <div className="text-center text-red-500">
      <p>Error loading product with ID: {id}</p>
      <p>Error details: {error}</p>
    </div>
  );

  if (!product) return <p className="text-center text-gray-500">Product with ID: {id} not found.</p>;

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
        
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6 border-t-8 border-gradient-to-r from-blue-400 to-green-400">
          <h2 className="text-2xl font-bold mb-4">Description</h2>
          <p className="text-gray-700">{product.description}</p>
        </div>

        {renderRatingSummary()}

        {successMessage && <p className="text-green-600">{successMessage}</p>}
        <form onSubmit={handleReviewSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>
          <input
            type="text"
            placeholder="Your Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 p-2 w-full mb-4"
            required
          />
          <div className="mb-4">
            <label className="font-bold">Rating:</label>
            <div className="flex">
              {[5, 4, 3, 2, 1].map((value) => (
                <label key={value} className="flex items-center mr-2">
                  <input
                    type="radio"
                    value={value}
                    checked={rating === value}
                    onChange={() => setRating(value)}
                    className="mr-1"
                  />
                  {renderStars(value)}
                </label>
              ))}
            </div>
          </div>
          <textarea
            placeholder="Your Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border border-gray-300 p-2 w-full mb-4"
            required
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white py-2 px-4 rounded-lg hover:opacity-80 transition-opacity duration-300"
          >
            {editIndex !== null ? 'Update Review' : 'Submit Review'}
          </button>
        </form>

        {product.reviews.length > 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            {sortedReviews().map((review, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 mb-4">
                <h3 className="font-bold">{review.username}</h3>
                {renderStars(review.rating)}
                <p className="text-gray-700">{review.comment}</p>
                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => handleEditReview(index)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    </>
  );
}

export default WithAuth(ProductDetails);
