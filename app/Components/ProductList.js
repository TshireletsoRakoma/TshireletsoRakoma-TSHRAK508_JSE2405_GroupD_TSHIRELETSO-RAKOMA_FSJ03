import ProductCard from './ProductCard';

/**
 * ProductList component renders a grid of product cards.
 * 
 * @function ProductList
 * @param {Object[]} products - Array of product objects to display.
 * @param {string} products[].id - Unique identifier for the product.
 * @param {string} products[].title - Title of the product.
 * @param {string} products[].price - Price of the product.
 * @param {string[]} products[].images - Array of image URLs for the product.
 * @param {number} products[].rating - Rating of the product (out of 5).
 * @param {string} products[].category - Category of the product.
 * @param {string[]} products[].tags - Array of tags associated with the product.
 * @param {number} products[].stock - Number of items available in stock.
 * @param {string} products[].description - Description of the product.
 * @returns {JSX.Element} The component rendering a grid of `ProductCard` components.
 */
export default function ProductList({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
