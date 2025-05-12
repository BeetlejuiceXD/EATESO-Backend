import Like from '../models/Like.js';

// Obtener likes del usuario autenticado
export const getUserLikes = async (req, res) => {
  try {
    const likes = await Like.find({ usuario: req.user.userId }).populate('comida');
    res.json(likes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener likes', error });
  }
};

// Dar like a una comida
export const addLike = async (req, res) => {
  const { comidaId } = req.body;

  try {
    const exists = await Like.findOne({
      usuario: req.user.userId,
      comida: comidaId
    });

    if (exists) {
      return res.status(400).json({ message: 'Ya diste like a esta comida' });
    }

    const like = new Like({
      usuario: req.user.userId,
      comida: comidaId
    });

    await like.save();
    res.status(201).json({ message: 'Like agregado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al dar like', error });
  }
};

// Quitar like
export const removeLike = async (req, res) => {
  try {
    const deleted = await Like.findOneAndDelete({
      _id: req.params.id,
      usuario: req.user.userId
    });

    if (!deleted) {
      return res.status(404).json({ message: 'Like no encontrado o no autorizado' });
    }

    res.json({ message: 'Like eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar like', error });
  }
};
