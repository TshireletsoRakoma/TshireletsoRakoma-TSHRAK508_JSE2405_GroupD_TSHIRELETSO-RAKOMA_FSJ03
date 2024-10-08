// productService.js
import { db } from './firebaseConfig'; // Import Firestore database
import { collection, getDocs, query, doc, getDoc } from 'firebase/firestore';

/**
 * Fetch a paginated list of products from Firestore with optional search query and sorting order.
 *
 * @param {number} [page=1] - The page number to fetch.
 * @param {number} [limit=20] - The number of products to return per page.
 * @param {string} [searchTerm=""] - The search term to filter the products.
 * @returns {Promise<Object[]>} The list of products.
 * @throws {Error} Throws an error if the fetch request fails.
 */
export async function fetchProducts(page = 1, limit = 20, searchTerm = "") {
  const skip = (page - 1) * limit;

  try {
    const productsRef = collection(db, 'products'); // Reference to the products collection
    const productQuery = query(productsRef);
    const productSnapshot = await getDocs(productQuery);

    // Process the fetched data
    const products = productSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Optionally filter based on searchTerm
    const filteredProducts = searchTerm 
      ? products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
      : products;

    return filteredProducts.slice(skip, skip + limit); // Implement pagination
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

/**
 * Fetch a single product by its ID from Firestore.
 *
 * @param {string} id - The ID of the product to fetch.
 * @returns {Promise<Object>} The product data.
 * @throws {Error} Throws an error if the fetch request fails or if the product is not found.
 */
export async function fetchProductById(id) {
  try {
    const productRef = doc(db, 'products', id); // Reference to the specific product document
    const productSnapshot = await getDoc(productRef);

    if (!productSnapshot.exists()) {
      throw new Error(`Product with ID: ${id} not found`);
    }

    return { id: productSnapshot.id, ...productSnapshot.data() };
  } catch (error) {
    console.error(`Error fetching product by ID: ${id}`, error);
    throw error;
  }
}
