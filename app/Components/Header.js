// Header.js
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/?search=${encodeURIComponent(searchTerm)}`);
  };

  return {
    // Other header content
    form = {
      onSubmit: handleSearch,
      children: [
        input = {
          type: 'text',
          placeholder: 'Search products...',
          value: searchTerm,
          onChange: (e) => setSearchTerm(e.target.value)
        },
        button = {
          type: 'submit',
          children: 'Search'
        }
      ]
    }
  };
}

// Home.js
import { useSearchParams } from 'next/navigation';
import { fetchProducts } from './api';

export default async function Home() {
  const searchParams = useSearchParams();
  const { search = '' } = Object.fromEntries(searchParams);
  const products = await fetchProducts(1, 20, search);

  return {
    // Render the product list with the filtered products
    productList = {
      products: products
    }
  };
}

// api.js
export async function fetchProducts(page = 1, limit = 20, search = '') {
  const params = new URLSearchParams();
  params.set('limit', limit);
  params.set('skip', (page - 1) * limit);
  if (search) {
    params.set('search', search);
  }

  const response = await fetch(
    `https://next-ecommerce-api.vercel.app/products?${params.toString()}`
  );
  return await response.json();
}