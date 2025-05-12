import Restaurante from '../models/Restaurante.js';

// Crear nuevo restaurante (solo admin)
export const crearRestaurante = async (req, res) => {
  try {
    const { nombre, cafeteria, imagen } = req.body;

    const restaurante = new Restaurante({ nombre, cafeteria, imagen });
    await restaurante.save();

    res.status(201).json(restaurante);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el restaurante', error });
  }
};

// Obtener restaurantes por cafetería
export const obtenerRestaurantes = async (req, res) => {
  try {
    const { cafeteria } = req.query;
    const query = cafeteria ? { cafeteria } : {};

    const restaurantes = await Restaurante.find(query);
    res.json(restaurantes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener restaurantes', error });
  }
};

// Actualizar restaurante (solo admin)
export const actualizarRestaurante = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, imagen } = req.body;

    const restaurante = await Restaurante.findByIdAndUpdate(
      id,
      { nombre, imagen },
      { new: true }
    );

    if (!restaurante) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }

    res.json(restaurante);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el restaurante', error });
  }
};

// Eliminar restaurante (solo admin)
export const eliminarRestaurante = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurante = await Restaurante.findByIdAndDelete(id);

    if (!restaurante) {
      return res.status(404).json({ message: 'Restaurante no encontrado' });
    }

    res.json({ message: 'Restaurante eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el restaurante', error });
  }
};
