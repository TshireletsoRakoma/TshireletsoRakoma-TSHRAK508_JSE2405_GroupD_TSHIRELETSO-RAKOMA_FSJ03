// middleware/authMiddleware.js
import { getAuth } from 'firebase-admin/auth';

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];
  if (!token) return res.status(403).send('Unauthorized');

  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    req.user = decodedToken; // Save the user details in the request object
    next();
  } catch (error) {
    res.status(403).send('Unauthorized');
  }
};
