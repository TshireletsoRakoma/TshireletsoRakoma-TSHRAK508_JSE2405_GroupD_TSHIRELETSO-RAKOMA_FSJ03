// lib/api.js

// Fetches a paginated list of products
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

// Fetches details of a single product by its ID
export async function fetchProductById(id) {
  try {
    const response = await fetch(`https://next-ecommerce-api.vercel.app/products/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch product with ID: ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching product with ID: ${id}`, error);
    throw error;
  }
}
