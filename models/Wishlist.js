import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema({
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

const Wishlist = mongoose.model('Wishlist', wishlistSchema);
export default Wishlist;