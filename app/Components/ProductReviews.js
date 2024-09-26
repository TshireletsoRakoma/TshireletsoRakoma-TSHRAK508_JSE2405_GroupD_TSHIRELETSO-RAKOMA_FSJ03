/**
 * ProductReviews component displays a list of product reviews.
 * 
 * @function ProductReviews
 * @param {Object[]} reviews - Array of review objects.
 * @param {string} reviews[].id - Unique identifier for the review.
 * @param {string} reviews[].name - Name of the reviewer.
 * @param {number} reviews[].rating - Rating given by the reviewer (out of 5).
 * @param {string} reviews[].createdAt - Date when the review was created (ISO string).
 * @param {string} reviews[].comment - Review comment text.
 * @returns {JSX.Element} The component rendering the list of reviews or a message if no reviews are available.
 */
export default function ProductReviews({ reviews }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>
      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-bold">{review.name}</h3> {/* Reviewer Name */}
              <p className="text-gray-600">Rating: {review.rating}/5</p>
              <p className="text-gray-600">Date: {new Date(review.createdAt).toLocaleDateString()}</p>
              <p className="mt-2">{review.comment}</p> {/* Review Comment */}
            </div>
          ))}
        </div>
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
}
