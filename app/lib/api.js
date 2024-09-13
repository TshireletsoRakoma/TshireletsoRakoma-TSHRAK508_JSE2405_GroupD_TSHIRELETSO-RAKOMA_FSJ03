// lib/api.js

// Fetch a paginated list of products
export async function fetchProducts(page = 1, limit = 20) {
  const skip = (page - 1) * limit;
  try {
    const response = await fetch(
      `https://next-ecommerce-api.vercel.app/products?limit=${limit}&skip=${skip}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

// Fetch a single product by ID
export async function fetchProductById(id) {
  console.log(`Fetching product with ID: ${id}`);
  try {
    const response = await fetch(`https://next-ecommerce-api.vercel.app/products/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Fetched product data:', data);

    if (!data) {
      throw new Error(`Product with ID: ${id} not found`);
    }

    return data;
  } catch (error) {
    console.error(`Error fetching product by ID: ${id}`, error);
    throw error;
  }
}
