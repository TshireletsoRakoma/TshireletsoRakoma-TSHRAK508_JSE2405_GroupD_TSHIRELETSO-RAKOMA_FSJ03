// app/products/[id].js
import { useRouter } from 'next/router';
import { fetchProductById } from '../../lib/api'; // Assuming you have an API method to fetch product by ID

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      fetchProductById(id)
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError('Failed to load product.');
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating}</p>
    </div>
  );
}
