

import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comida: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comida',
    required: true
  }
}, {
  timestamps: true
});

const Like = mongoose.model('Like', likeSchema);
export default Like;