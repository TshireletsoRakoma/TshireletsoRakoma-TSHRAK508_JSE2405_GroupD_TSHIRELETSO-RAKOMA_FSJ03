// components/ProductList.js
import ProductCard from './ProductCard';
import './styles.css'; // Ensure this path is correct

export default function ProductList({ products }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
