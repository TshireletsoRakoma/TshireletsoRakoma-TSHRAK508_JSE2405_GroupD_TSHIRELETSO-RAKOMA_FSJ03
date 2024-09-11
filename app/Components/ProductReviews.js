export default function ProductReviews({ reviews }) {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold">{review.name}</h3>
                <p className="text-gray-600">Rating: {review.rating}/5</p>
                <p className="text-gray-600">Date: {new Date(review.createdAt).toLocaleDateString()}</p>
                <p>{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    );
  }