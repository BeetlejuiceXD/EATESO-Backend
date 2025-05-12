import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import sendVerificationEmail from '../utils/sendEmail.js';

// Función auxiliar para generar token JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// Registro de usuario
export const registerUser = async (req, res) => {
  const { name, emailPrefix, password } = req.body;

  if (!name || !emailPrefix || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  const existingUser = await User.findOne({ emailPrefix });
  if (existingUser) {
    return res.status(400).json({ message: 'El usuario ya está registrado' });
  }

  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

  const user = new User({
    name,
    emailPrefix,
    password,
    verificationCode
  });

  await user.save();

  // Enviar correo
  try {
    await sendVerificationEmail(`${emailPrefix}@iteso.mx`, verificationCode);
    return res.status(201).json({ message: 'Usuario registrado. Código enviado al correo institucional.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al enviar correo', error });
  }
};

// Verificar código enviado al correo
export const verifyUser = async (req, res) => {
  const { emailPrefix, code } = req.body;

  const user = await User.findOne({ emailPrefix });

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  if (user.verificationCode === code) {
    user.emailVerified = true;
    user.verificationCode = undefined;
    await user.save();
    return res.json({ message: 'Correo verificado exitosamente' });
  } else {
    return res.status(400).json({ message: 'Código de verificación incorrecto' });
  }
};

// Login
export const loginUser = async (req, res) => {
  const { emailPrefix, password } = req.body;

  const user = await User.findOne({ emailPrefix });

  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  if (!user.emailVerified) {
    return res.status(403).json({ message: 'Verifica tu correo antes de iniciar sesión' });
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Credenciales inválidas' });
  }

  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id)
  });
};

// Obtener perfil del usuario autenticado
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.userId);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      wishlist: user.wishlist,
    });
  } else {
    res.status(404).json({ message: 'Usuario no encontrado' });
  }
};

// Reenviar código de verificación
export const resendVerificationCode = async (req, res) => {
  const { emailPrefix } = req.body;

  const user = await User.findOne({ emailPrefix });

  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado' });
  }

  if (user.emailVerified) {
    return res.status(400).json({ message: 'El correo ya está verificado' });
  }

  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  user.verificationCode = verificationCode;
  await user.save();

  try {
    await sendVerificationEmail(`${emailPrefix}@iteso.mx`, verificationCode);
    return res.json({ message: 'Código de verificación reenviado al correo institucional' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al reenviar correo', error });
  }
}