import { fetchProductById } from '../../../lib/api';
import ErrorBoundary from '../../../components/ErrorBoundary';
import ImageGallery from '../../../components/ImageGallery';
import ProductReviews from '../../../components/ProductReviews';

export default async function ProductPage({ params }) {
  try {
    const product = await fetchProductById(params.id);

    return (
      <ErrorBoundary fallback={<p>Error loading product. Please try again later.</p>}>
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <ImageGallery images={product.images} />
          <p className="text-xl mb-2">${product.price}</p>
          <p className="mb-4">Category: {product.category}</p>
          <p className="mb-4">{product.description}</p>
          <p className="mb-4">
            Tags: {product.tags.join(', ')}
          </p>
          <p className="mb-4">
            Rating: {product.rating} ({product.numReviews} reviews)
          </p>
          <p className="mb-4">
            Availability: {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </p>
          <ProductReviews reviews={product.reviews} />
        </div>
      </ErrorBoundary>
    );
  } catch (error) {
    return <p>Error: {error.message}</p>;
  }
}