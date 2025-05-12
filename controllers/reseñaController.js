import Resena from '../models/Reseña.js';

// Crear reseña
export const crearResena = async (req, res) => {
  try {
    const { comida, texto, calificacion } = req.body;

    const resena = new Resena({
      usuario: req.user.userId,
      comida,
      texto,
      calificacion
    });

    await resena.save();
    res.status(201).json(resena);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la reseña', error });
  }
};

// Obtener reseñas por comida
export const obtenerResenas = async (req, res) => {
  try {
    const { comida } = req.query;
    const query = comida ? { comida } : {};

    const resenas = await Resena.find(query)
      .populate('usuario', 'name')
      .populate('comida', 'nombre');

    res.json(resenas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener reseñas', error });
  }
};

// Actualizar reseña (solo autor)
export const actualizarResena = async (req, res) => {
  try {
    const { texto, calificacion } = req.body;
    const resena = await Resena.findById(req.params.id);

    if (!resena) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }

    if (resena.usuario.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'No autorizado para editar esta reseña' });
    }

    resena.texto = texto || resena.texto;
    resena.calificacion = calificacion || resena.calificacion;

    await resena.save();
    res.json(resena);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la reseña', error });
  }
};

// Eliminar reseña (autor o admin)
export const eliminarResena = async (req, res) => {
  try {
    const resena = await Resena.findById(req.params.id);

    if (!resena) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }

    const isAdmin = req.user && req.user.role === 'administrador';
    const isOwner = resena.usuario.toString() === req.user.userId;

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ message: 'No autorizado para eliminar esta reseña' });
    }

    await resena.remove();
    res.json({ message: 'Reseña eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la reseña', error });
  }
};
