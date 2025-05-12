

import mongoose from 'mongoose';

const cafeteriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  ubicacion: {
    type: String,
    required: false,
    trim: true
  },
  imagen: {
    type: String,
    required: false
  }
}, {
  timestamps: true
});

const Cafeteria = mongoose.model('Cafeteria', cafeteriaSchema);
export default Cafeteria;