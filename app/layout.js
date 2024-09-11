// import { Suspense } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { fetchProducts } from '../lib/api';
// import ProductList from '../components/ProductList';
// import Pagination from '../components/Pagination';
// import ErrorBoundary from '../components/ErrorBoundary';

// export default async function Home() {
//   const searchParams = useSearchParams();
//   const page = Number(searchParams.get('page')) || 1;

//   try {
//     const products = await fetchProducts(page);

//     return (
//       <main>
//         <h1>Our Products</h1>
//         <ErrorBoundary fallback={<p>Error loading products. Please try again later.</p>}>
//           <Suspense fallback={<p>Loading products...</p>}>
//             <ProductList products={products} />
//           </Suspense>
//         </ErrorBoundary>
//         <Pagination currentPage={page} />
//       </main>
//     );
//   } catch (error) {
//     return <p>Error: {error.message}</p>;
//   }
// }


