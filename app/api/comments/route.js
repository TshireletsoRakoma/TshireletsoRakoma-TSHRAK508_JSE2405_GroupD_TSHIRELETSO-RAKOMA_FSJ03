import { db } from './firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';

export async function fetchProductById(id) {
  try {
    // Fetch the product
    const productRef = doc(db, 'products', id);
    const productSnap = await getDoc(productRef);

    if (!productSnap.exists()) {
      throw new Error('Product not found');
    }

    const productData = productSnap.data();

    // Fetch the reviews for this product
    const reviewsRef = collection(db, 'reviews');
    const q = query(reviewsRef, where('productId', '==', id));
    const reviewsSnap = await getDocs(q);

    const reviews = reviewsSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Return the product with its reviews
    return {
      [id]: {
        ...productData,
        reviews
      }
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
}