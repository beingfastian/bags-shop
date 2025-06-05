import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface DecodedToken {
  role: string;
  [key: string]: any;
}

const Auth = (requiredRole: string | null = null, auth: boolean = true) => {
  return (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];

    if (auth && (!authHeader || !authHeader.startsWith('Bearer '))) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader?.split(' ')[1];

    if (auth && !token) {
      return res
        .status(401)
        .json({ message: 'Unauthorized: No valid token provided' });
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'default_secret'
      ) as DecodedToken;
      req.payload = decoded;

      if (requiredRole && decoded.role !== requiredRole) {
        return res
          .status(403)
          .json({ message: 'Forbidden: Insufficient permissions' });
      }

      next();
    } catch (error) {
      console.error('JWT verification error:', error);
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  };
};

export default Auth;
