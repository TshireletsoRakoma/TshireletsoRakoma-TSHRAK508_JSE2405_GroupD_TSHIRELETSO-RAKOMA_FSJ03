// app/products/[id].js
import { fetchProductById } from '../../lib/api'; // Adjust the path if needed
import ImageGallery from '../../components/ImageGallery'; // Assuming you already have this component for product images
import ProductReviews from '../../components/ProductReviews'; // Assuming you have this for reviews

export default async function ProductPage({ params }) {
  const { id } = params; // Get the product ID from the route params

  // Fetch product data by ID
  const product = await fetchProductById(id);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
      <ImageGallery images={product.images} />
      <p className="text-xl mb-2">${product.price}</p>
      <p className="mb-4">Category: {product.category}</p>
      <p className="mb-4">{product.description}</p>
      <p className="mb-4">Tags: {product.tags.join(', ')}</p>
      <p className="mb-4">Rating: {product.rating} ({product.numReviews} reviews)</p>
      <p className="mb-4">Availability: {product.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>

      {/* Reviews component */}
      <ProductReviews reviews={product.reviews} />
    </div>
  );
}
