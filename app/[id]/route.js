// pages/api/product/[id].js
import { db } from '../firebaseClient';
import { doc, getDoc } from 'firebase/firestore';

// export async function GET(req, res) {
//   const { id } = req.query;

//   try {
//     const productRef = doc(db, 'products', id);
//     const productSnap = await getDoc(productRef);

//     if (productSnap.exists()) {
//       res.status(200).json({ id: productSnap.id, ...productSnap.data() });
//     } else {
//       res.status(404).json({ error: 'Product not found' });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to fetch product.' });
//   }
// }
