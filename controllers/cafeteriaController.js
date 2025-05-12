import Cafeteria from '../models/Cafeteria.js';

// Crear nueva cafetería (solo admin)
export const crearCafeteria = async (req, res) => {
  try {
    const { nombre, ubicacion, imagen } = req.body;

    const cafeteria = new Cafeteria({ nombre, ubicacion, imagen });
    await cafeteria.save();

    res.status(201).json(cafeteria);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la cafetería', error });
  }
};

// Obtener todas las cafeterías
export const obtenerCafeterias = async (req, res) => {
  try {
    const cafeterias = await Cafeteria.find();
    res.json(cafeterias);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las cafeterías', error });
  }
};

// Actualizar cafetería (solo admin)
export const actualizarCafeteria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, ubicacion, imagen } = req.body;

    const cafeteria = await Cafeteria.findByIdAndUpdate(
      id,
      { nombre, ubicacion, imagen },
      { new: true }
    );

    if (!cafeteria) {
      return res.status(404).json({ message: 'Cafetería no encontrada' });
    }

    res.json(cafeteria);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la cafetería', error });
  }
};

// Eliminar cafetería (solo admin)
export const eliminarCafeteria = async (req, res) => {
  try {
    const { id } = req.params;
    const cafeteria = await Cafeteria.findByIdAndDelete(id);

    if (!cafeteria) {
      return res.status(404).json({ message: 'Cafetería no encontrada' });
    }

    res.json({ message: 'Cafetería eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la cafetería', error });
  }
};
