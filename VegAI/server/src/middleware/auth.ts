import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Définir l'interface pour étendre Request
export interface AuthRequest extends Request {
  userId: string;
}

// Créer un type pour le handler qui utilise AuthRequest
type AuthRequestHandler = (req: AuthRequest, res: Response, next: NextFunction) => Promise<any>;

// Créer une fonction pour wrapper le handler avec le bon type
const wrapHandler = (handler: AuthRequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    return handler(req as AuthRequest, res, next);
  };
};

export const auth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Token reçu:', token);
    
    if (!token) {
      return res.status(401).json({ message: 'Authentification requise' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
    console.log('Token décodé:', decoded);
    
    (req as AuthRequest).userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Erreur auth:', error);
    res.status(401).json({ message: 'Token invalide' });
  }
};

export { wrapHandler }; 