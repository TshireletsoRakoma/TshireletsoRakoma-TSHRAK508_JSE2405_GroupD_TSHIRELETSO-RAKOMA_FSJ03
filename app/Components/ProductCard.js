'use client'
import Link from 'next/link';
import ImageGallery from './ImageGallery';

/**
 * ProductCard component displays a single product with an image gallery, title, price, and category.
 * 
 * @function ProductCard
 * @param {Object} product - The product data to display.
 * @param {string} product.id - Unique identifier for the product.
 * @param {string} product.title - Title of the product.
 * @param {string} product.price - Price of the product.
 * @param {string[]} product.images - Array of image URLs for the product.
 * @param {string} product.category - Category of the product.
 * @returns {JSX.Element} The component rendering a single product card.
 */
export default function ProductCard({ product }) {

  /**
   * Handle click event for the 'View Details' button.
   * 
   * @function clicked
   */
  function clicked(){
    console.log('clicked');
  }

  return (
    <div className="border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-gray-100">
      <ImageGallery images={product.images} />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h2>
        <p className="text-lg font-medium text-gray-700 mb-2">${product.price}</p>
        <p className="text-sm text-gray-500 mb-4">Category: {product.category}</p>
        <Link href={`/products/${product.id}`}>
          <button onClick={clicked} className="inline-block px-4 py-2 bg-blue-500 text-white text-center rounded-lg hover:bg-blue-600 transition-colors duration-300">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}
