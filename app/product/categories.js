// pages/api/categories.js
import { db } from '../firebaseClient';
import { collection, getDocs } from 'firebase/firestore';

export default async function handler(req, res) {
  try {
    const categoriesCollection = collection(db, 'categories');
    const querySnapshot = await getDocs(categoriesCollection);
    const categories = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories.' });
  }
}
