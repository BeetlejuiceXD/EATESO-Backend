import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  emailPrefix: {
    type: String,
    required: true,
    trim: true,
    match: [/^[a-zA-Z0-9._%+-]+$/, 'El prefijo del correo es inválido']
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['estudiante', 'administrador'],
    default: 'estudiante'
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  verificationCode: {
    type: String
  },
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comida'
    }
  ]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual field for full email
userSchema.virtual('email').get(function () {
  return `${this.emailPrefix}@iteso.mx`;
});

// Método para comparar contraseñas
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware para encriptar antes de guardar
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);
export default User;