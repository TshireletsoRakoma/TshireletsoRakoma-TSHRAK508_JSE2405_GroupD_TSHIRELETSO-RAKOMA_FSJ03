import { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../firebaseClient'; // Update the import path based on your project
import { collection, addDoc, updateDoc, deleteDoc, doc, arrayUnion } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
    console.log('123457876tghnb');
    const body= await req.json();
    const { username, comment, rating, productId } = body;
     console.log(comment)
    // Check if the required fields are provided
    if (!username || !comment || !rating || !productId) {
        return NextResponse.json({ message: 'Missing required fields' });
    }

    try {
        // Reference to the specific product document
        const productRef = doc(db, 'products', `00${productId}`);

        // Create the new review object
        const newReview = {
            username,
            comment,
            rating: parseFloat(rating),
            date: new Date().toISOString(),
        };

        // Update the product document, adding the new review to the reviews array
        await updateDoc(productRef, {
            
            reviews: arrayUnion(newReview), // Use arrayUnion to add the review to the array
        });
          console.log('updated')
        return NextResponse.json({ message: 'Review added', review: newReview });
    } catch (error) {
        console.error('Error adding review:', error);
        return NextResponse.json({ message: 'Error adding review' });
    }
}


