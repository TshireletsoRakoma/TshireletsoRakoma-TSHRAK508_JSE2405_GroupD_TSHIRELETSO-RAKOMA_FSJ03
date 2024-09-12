// components/ProductCard.js
import Link from 'next/link';
import ImageGallery from './ImageGallery';

export default function ProductCard({ product }) {
  return (
    <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <ImageGallery images={product.images} />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h2>
        <p className="text-lg font-medium text-gray-700 mb-2">${product.price}</p>
        <p className="text-sm text-gray-500 mb-4">Category: {product.category}</p>
        <Link href={`/products/${product.id}`}>
          <button className="inline-block px-4 py-2 bg-blue-500 text-white text-center rounded-lg hover:bg-blue-600 transition-colors duration-300">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}
