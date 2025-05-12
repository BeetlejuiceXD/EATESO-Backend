

import Comida from '../models/Comida.js';

// Crear nueva comida (solo admin)
export const crearComida = async (req, res) => {
  try {
    const { nombre, descripcion, imagen, categoria, restaurante, precio } = req.body;

    const comida = new Comida({ nombre, descripcion, imagen, categoria, restaurante, precio });
    await comida.save();

    res.status(201).json(comida);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la comida', error });
  }
};

// Obtener comidas por restaurante
export const obtenerComidas = async (req, res) => {
  try {
    const { restaurante } = req.query;
    const query = restaurante ? { restaurante } : {};

    const comidas = await Comida.find(query);
    res.json(comidas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las comidas', error });
  }
};

// Obtener comida por ID
export const obtenerComidaPorId = async (req, res) => {
  try {
    const comida = await Comida.findById(req.params.id);
    if (!comida) return res.status(404).json({ message: 'Comida no encontrada' });
    res.json(comida);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la comida', error });
  }
};

// Actualizar comida (solo admin)
export const actualizarComida = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, imagen, categoria, precio } = req.body;

    const comida = await Comida.findByIdAndUpdate(
      id,
      { nombre, descripcion, imagen, categoria, precio },
      { new: true }
    );

    if (!comida) return res.status(404).json({ message: 'Comida no encontrada' });
    res.json(comida);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar la comida', error });
  }
};

// Eliminar comida (solo admin)
export const eliminarComida = async (req, res) => {
  try {
    const comida = await Comida.findByIdAndDelete(req.params.id);
    if (!comida) return res.status(404).json({ message: 'Comida no encontrada' });
    res.json({ message: 'Comida eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la comida', error });
  }
};