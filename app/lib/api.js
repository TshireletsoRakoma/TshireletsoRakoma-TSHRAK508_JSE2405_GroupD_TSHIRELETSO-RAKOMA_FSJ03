/**
 * Fetch all products from the API.
 *
 * @returns {Promise<Object[]>} The list of products.
 * @throws {Error} Throws an error if the fetch request fails.
 */
export async function fetchProducts() {
  try {
    const response = await fetch('https://next-ecommerce-api.vercel.app/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products: ' + response.statusText);
    }
    const data = await response.json();
    
    // Check if the response is an array
    if (!Array.isArray(data)) {
      throw new Error('Expected an array of products');
    }

    return data;
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
      throw new Error(`Failed to fetch product: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Fetched product data:', data);

    if (!data || Object.keys(data).length === 0) {
      throw new Error(`Product with ID: ${id} not found`);
    }

    return data;
  } catch (error) {
    console.error(`Error fetching product by ID: ${id}`, error);
    throw error;
  }
}
