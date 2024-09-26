/**
 * Fetch a paginated list of products from the API with optional search query.
 *
 * @param {number} [page=1] - The page number to fetch.
 * @param {number} [limit=20] - The number of products to return per page.
 * @param {string} [searchTerm=""] - The search term to filter the products.
 * @returns {Promise<Object>} The list of products.
 * @throws {Error} Throws an error if the fetch request fails.
 */
export async function fetchProducts(page = 1, limit = 20, searchTerm = "") {
  const skip = (page - 1) * limit;
  
  // Base URL for fetching products
  let url = `https://next-ecommerce-api.vercel.app/products`;

  // If a search term is provided, fetch all products that match the search term
  if (searchTerm) {
    // Some APIs might use `q` or other terms instead of `search`
    url += `?search=${encodeURIComponent(searchTerm)}`;
  } else {
    url += `?limit=${limit}&skip=${skip}`;
  }

  console.log('Fetching from URL:', url); // Log the URL being fetched for debugging

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();  // Read error response
      throw new Error(`Failed to fetch products: ${response.status} - ${errorText}`);
    }
    const data = await response.json();
    if (data.length === 0) {  // Handle no products found
      throw new Error('No products found');
    }
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}
