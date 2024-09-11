// components/ProductCard.js
import Link from 'next/link';
import ImageGallery from './ImageGallery';

export default function ProductCard({ product }) {
  return (
    <div className="border p-4 rounded-lg shadow-md">
      <ImageGallery images={product.images} />
      <h2 className="text-xl font-bold">{product.title}</h2>
      <p className="text-gray-600">${product.price}</p>
      <p className="text-gray-600">Category: {product.category}</p>
      <Link href={`/products/${product.id}`} className="text-blue-500 hover:underline">
        View Details
      </Link>
    </div>
  );
}