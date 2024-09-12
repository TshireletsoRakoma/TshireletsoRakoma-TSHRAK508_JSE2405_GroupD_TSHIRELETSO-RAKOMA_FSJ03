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

// Assuming that we will fetch all products and filter locally
export async function fetchProductById(id) {
  try {
    const products = await fetchProducts(); // Fetch all products
    const product = products.find(p => p.id === id); // Find product by ID
    if (!product) {
      throw new Error(`Product with ID: ${id} not found`);
    }
    return product;
  } catch (error) {
    console.error(`Error fetching product with ID: ${id}`, error);
    throw error;
  }
}
