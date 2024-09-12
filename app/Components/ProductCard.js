// components/ProductCard.js
import Link from 'next/link'; // Import Link from next/link
import ImageGallery from './ImageGallery';

export default function ProductCard({ product }) {
  return (
    <div className="product-card">
      <ImageGallery images={product.images} />
      <h2 className="product-title">{product.title}</h2>
      <p className="product-price">${product.price}</p>
      <p className="product-category">Category: {product.category}</p>
      <Link href={`/products/${product.id}`} className="text-blue-500 hover:underline">
        View Details
      </Link>
    </div>
  );
}
