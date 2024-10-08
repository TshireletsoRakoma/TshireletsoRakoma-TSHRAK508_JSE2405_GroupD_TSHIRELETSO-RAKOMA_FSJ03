import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from './app/firebaseClient'; // Ensure this is properly configured

// Function to add product data to Firestore
export const addProductToFirestore = async (product) => {
  try {
    const docRef = await addDoc(collection(db, 'products'), product);
    console.log('Product added with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding product: ', e);
  }
};

// Function to update product data in Firestore
export const updateProductInFirestore = async (productId, updatedData) => {
  try {
    const productRef = doc(db, 'products', productId);
    await updateDoc(productRef, updatedData);
    console.log('Product updated with ID: ', productId);
  } catch (e) {
    console.error('Error updating product: ', e);
  }
};

// Function to delete a product from Firestore
export const deleteProductFromFirestore = async (productId) => {
  try {
    const productRef = doc(db, 'products', productId);
    await deleteDoc(productRef);
    console.log('Product deleted with ID: ', productId);
  } catch (e) {
    console.error('Error deleting product: ', e);
  }
};

// Function to fetch all products from Firestore
export const fetchProductsFromFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const products = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log('Products fetched:', products);
    return products;
  } catch (e) {
    console.error('Error fetching products: ', e);
    return [];
  }
};
