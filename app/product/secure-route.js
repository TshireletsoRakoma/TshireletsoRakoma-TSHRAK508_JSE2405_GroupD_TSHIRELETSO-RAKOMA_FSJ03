// products/secure-route.js
import { verifyToken } from '../middleware/authMiddleware';

export default async function handler(req, res) {
  verifyToken(req, res, async () => {
    // Your secure logic here
    res.status(200).json({ message: 'This is a secure route' });
  });
}
