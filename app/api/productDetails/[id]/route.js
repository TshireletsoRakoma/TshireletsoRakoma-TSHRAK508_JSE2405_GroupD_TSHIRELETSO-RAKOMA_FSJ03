import { getFirestore, collection, getDocs } from "firebase/firestore";
import app from "../../../firebaseConfig";
import { NextResponse } from "next/server";

const db = getFirestore(app);

export async function GET(req, { params }) {
  try {
    // Fetching all documents from the 'products' collection
    const querySnapshot = await getDocs(collection(db, 'products'));

    // Preparing the product data for each document
    const products = querySnapshot.docs.map((doc) => {
      const product = { id: doc.id, ...doc.data() };
      return product;
    });

    // Returning the products as a JSON response
    return NextResponse.json(products);
  } catch (e) {
    console.log("Failed to load products", e);
    return NextResponse.json({ message: "Failed to load products" }, { status: 500 });
  }
}