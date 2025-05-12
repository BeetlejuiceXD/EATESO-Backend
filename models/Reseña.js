

import mongoose from 'mongoose';

const resenaSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comida: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comida',
    required: true
  },
  texto: {
    type: String,
    trim: true
  },
  calificacion: {
    type: Number,
    required: true,
    min: 0.5,
    max: 5
  }
}, {
  timestamps: true
});

const Resena = mongoose.model('Resena', resenaSchema);
export default Resena;