import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from './app/firebaseClient'; // Ensure this is properly configured

/**
 * Function to add product data to Firestore.
 *
 * @param {Object} product - The product data to be added.
 * @returns {Promise<void>} A promise that resolves when the product is added.
 */
export const addProductToFirestore = async (product) => {
  try {
    const docRef = await addDoc(collection(db, 'products'), product); // Add the product document to Firestore
    console.log('Product added with ID: ', docRef.id); // Log the ID of the added product
  } catch (e) {
    console.error('Error adding product: ', e); // Log any errors
  }
};

/**
 * Function to update product data in Firestore.
 *
 * @param {string} productId - The ID of the product to be updated.
 * @param {Object} updatedData - The new data to update the product with.
 * @returns {Promise<void>} A promise that resolves when the product is updated.
 */
export const updateProductInFirestore = async (productId, updatedData) => {
  try {
    const productRef = doc(db, 'products', productId); // Reference to the product document
    await updateDoc(productRef, updatedData); // Update the product document
    console.log('Product updated with ID: ', productId); // Log the ID of the updated product
  } catch (e) {
    console.error('Error updating product: ', e); // Log any errors
  }
};

/**
 * Function to delete a product from Firestore.
 *
 * @param {string} productId - The ID of the product to be deleted.
 * @returns {Promise<void>} A promise that resolves when the product is deleted.
 */
export const deleteProductFromFirestore = async (productId) => {
  try {
    const productRef = doc(db, 'products', productId); // Reference to the product document
    await deleteDoc(productRef); // Delete the product document
    console.log('Product deleted with ID: ', productId); // Log the ID of the deleted product
  } catch (e) {
    console.error('Error deleting product: ', e); // Log any errors
  }
};

/**
 * Function to fetch all products from Firestore.
 *
 * @returns {Promise<Array>} A promise that resolves to an array of product objects.
 */
export const fetchProductsFromFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products')); // Fetch all product documents
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(), // Include all product data
    }));
    console.log('Products fetched:', products); // Log the fetched products
    return products; // Return the array of products
  } catch (e) {
    console.error('Error fetching products: ', e); // Log any errors
    return []; // Return an empty array in case of error
  }
};
