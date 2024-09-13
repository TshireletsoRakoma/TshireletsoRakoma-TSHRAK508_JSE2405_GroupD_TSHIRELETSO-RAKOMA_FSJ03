// app/products/[id].js
'use client'
import { useRouter,useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchProductById } from '../../lib/api'; // Make sure this path is correct

export default function ProductDetails() {
  // const router = useRouter();

   const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(id)
    if (id) {
      fetchProductById(id)
        .then((data) => {
          console.log('fetching')
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError('Failed to load product.');
          setLoading(false);
        });
    }
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
      <img src={product.images[0]} alt={product.title} className="w-full h-64 object-cover rounded-lg mb-4" />
      <p className="text-lg font-medium mb-2">Price: ${product.price}</p>
      <p className="text-lg mb-2">Rating: {product.rating} / 5</p>
      <p className="text-base">{product.description}</p> 
    </div>
  );
}
