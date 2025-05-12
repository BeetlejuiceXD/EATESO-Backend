import Wishlist from '../models/Wishlist.js';

// Obtener la wishlist del usuario autenticado
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ usuario: req.user.userId }).populate('comida');
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la wishlist', error });
  }
};

// Agregar una comida a la wishlist
export const addToWishlist = async (req, res) => {
  const { comidaId } = req.body;

  try {
    const exists = await Wishlist.findOne({
      usuario: req.user.userId,
      comida: comidaId
    });

    if (exists) {
      return res.status(400).json({ message: 'Ya está en tu wishlist' });
    }

    const wishlistItem = new Wishlist({
      usuario: req.user.userId,
      comida: comidaId
    });

    await wishlistItem.save();
    res.status(201).json({ message: 'Agregado a tu wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar a la wishlist', error });
  }
};

// Eliminar una comida de la wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    const deleted = await Wishlist.findOneAndDelete({
      _id: req.params.id,
      usuario: req.user.userId
    });

    if (!deleted) {
      return res.status(404).json({ message: 'No encontrado o no autorizado' });
    }

    res.json({ message: 'Eliminado de tu wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar de la wishlist', error });
  }
};