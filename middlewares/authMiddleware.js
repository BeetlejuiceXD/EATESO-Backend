import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith('Bearer ')) {
    try {
      token = token.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = { userId: decoded.userId };

      const user = await User.findById(decoded.userId);
      if (!user) {
        return res.status(401).json({ message: 'Usuario no encontrado' });
      }

      req.user.role = user.role;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token inválido', error: error.message });
    }
  } else {
    return res.status(401).json({ message: 'No autorizado, token no enviado' });
  }
};

export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'administrador') {
    next();
  } else {
    res.status(403).json({ message: 'Acceso solo para administradores' });
  }
};