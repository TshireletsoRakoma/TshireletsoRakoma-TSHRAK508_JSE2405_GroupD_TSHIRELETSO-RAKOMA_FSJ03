// components/ProductList.js
import ProductCard from './ProductCard';
import '../globals.css'; // Adjust the path to correctly point to the globals.css file

export default function ProductList({ products }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
