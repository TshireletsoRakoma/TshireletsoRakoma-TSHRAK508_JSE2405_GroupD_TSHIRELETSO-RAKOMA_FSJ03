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