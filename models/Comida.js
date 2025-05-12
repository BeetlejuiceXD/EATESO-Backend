

import mongoose from 'mongoose';

const comidaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    required: false,
    trim: true
  },
  imagen: {
    type: String,
    required: false
  },
  categoria: {
    type: String,
    enum: ['comida', 'bebida'],
    required: true
  },
  restaurante: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurante',
    required: true
  },
  precio: {
    type: Number,
    required: false
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  ratingPromedio: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

const Comida = mongoose.model('Comida', comidaSchema);
export default Comida;