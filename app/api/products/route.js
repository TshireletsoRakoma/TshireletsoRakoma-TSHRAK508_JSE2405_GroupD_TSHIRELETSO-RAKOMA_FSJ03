// api/products/route.js
 // Ensure you import your Firestore client correctly
import { collection, getDocs,getFirestore } from 'firebase/firestore';
import app from '../../firebaseConfig'
import { NextResponse } from 'next/server';

/**
 * API handler to fetch all products from Firestore.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */

const db = getFirestore(app); // Initialize Firestore client
export async function GET(req, res) {
  try {
    const productsCollection = collection(db, 'products');
    const querySnapshot = await getDocs(productsCollection);
    const products = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map to get an array of product objects
    // res.status(200).json(products); // Send the products array as a response
    return NextResponse.json(products); // Return JSON response with products array
  } catch (error) {
    console.error("Error fetching products:", error);
    // res.status(500).json({ error: 'Failed to fetch products.' });
    return NextResponse.json({ error: 'Failed to fetch products.' }, {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    }); // Return JSON response with error message and status code 500
  }
}
