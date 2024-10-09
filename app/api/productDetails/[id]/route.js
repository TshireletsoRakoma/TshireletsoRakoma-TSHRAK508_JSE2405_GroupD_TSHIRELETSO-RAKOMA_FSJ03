// api/products/route.js
import { collection, getDocs, getDoc, doc, getFirestore } from 'firebase/firestore';
import app from '../../../firebaseConfig';
import { NextResponse } from 'next/server';

// Initialize Firestore client
const db = getFirestore(app);

/**
 * API handler to fetch all products from Firestore.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<NextResponse>} The response containing the products or an error message.
 */

/**
 * API handler to fetch a single product by its ID.
 *
 * @param {Object} req - The request object.
 * @param {Object} params - The route parameters, including the product ID.
 * @returns {Promise<NextResponse>} The response containing the product data or an error message.
 */
export async function GET(req, { params }) {
  const { id } = params; // Extract the product ID from the route parameters
  console.log(id); // Log the ID for debugging
  try {
    const productRef = doc(db, 'products', `00${id}`); // Reference to the specific product document
    console.log('Fetching product...'); // Log for debugging
    const productSnap = await getDoc(productRef); // Fetch the product document
    console.log('Product fetched'); // Log for debugging
    if (!productSnap.exists()) {
      console.log('Product does not exist'); // Log if product does not exist
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 }); // Return 404 if product not found
    }
    const product = { id: productSnap.id, ...productSnap.data() }; // Construct product object
    console.log(product); // Log the product data for debugging
    return NextResponse.json(product); // Return the product data
  } catch (error) {
    console.error("Error fetching product:", error); // Log any errors that occur
    return NextResponse.json(
      { error: 'Failed to fetch product.' }, 
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ); // Return 500 if there is an error
  }
}
