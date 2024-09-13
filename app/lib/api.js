/**
 * Fetch a paginated list of products from the API.
 *
 * @param {number} [page=1] - The page number to fetch.
 * @param {number} [limit=20] - The number of products to return per page.
 * @returns {Promise<Object>} The list of products.
 * @throws {Error} Throws an error if the fetch request fails.
 */
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

/**
 * Fetch a single product by its ID from the API.
 *
 * @param {string|number} id - The ID of the product to fetch.
 * @returns {Promise<Object>} The product data.
 * @throws {Error} Throws an error if the fetch request fails or if the product is not found.
 */
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
