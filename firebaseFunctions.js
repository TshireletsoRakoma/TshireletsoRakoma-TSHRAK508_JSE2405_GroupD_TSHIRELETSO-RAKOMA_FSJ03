import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase'; // Import your Firestore database instance

/**
 * Function to add a product to Firestore.
 *
 * @param {Object} product - The product data to be added. This should contain all relevant product fields.
 * @returns {Promise<void>} A promise that resolves when the product is added successfully.
 */
export const addProductToFirestore = async (product) => {
  try {
    // Add the product document to the 'products' collection in Firestore
    const docRef = await addDoc(collection(db, 'products'), product);
    console.log('Product added with ID: ', docRef.id); // Log the ID of the added product
  } catch (error) {
    console.error('Error adding product: ', error); // Log any errors encountered during the process
  }
};
