

import mongoose from 'mongoose';

const restauranteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  cafeteria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cafeteria',
    required: true
  },
  imagen: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

const Restaurante = mongoose.model('Restaurante', restauranteSchema);
export default Restaurante;