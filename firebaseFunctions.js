import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase'; // import your db instance

// Function to add a product to Firestore
export const addProductToFirestore = async (product) => {
  try {
    const docRef = await addDoc(collection(db, 'products'), product);
    console.log('Product added with ID: ', docRef.id);
  } catch (error) {
    console.error('Error adding product: ', error);
  }
};
