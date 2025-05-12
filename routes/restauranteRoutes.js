import express from 'express';
import {
  crearRestaurante,
  obtenerRestaurantes,
  actualizarRestaurante,
  eliminarRestaurante
} from '../controllers/restauranteController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/restaurantes:
 *   get:
 *     summary: Obtener todos los restaurantes (opcional por cafetería)
 *     tags: [Restaurantes]
 *     parameters:
 *       - name: cafeteria
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de restaurantes
 */
router.get('/', obtenerRestaurantes);

/**
 * @swagger
 * /api/restaurantes:
 *   post:
 *     summary: Crear un nuevo restaurante
 *     tags: [Restaurantes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               cafeteria:
 *                 type: string
 *               imagen:
 *                 type: string
 *     responses:
 *       201:
 *         description: Restaurante creado
 */
router.post('/', protect, admin, crearRestaurante);

/**
 * @swagger
 * /api/restaurantes/{id}:
 *   put:
 *     summary: Actualizar un restaurante
 *     tags: [Restaurantes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               imagen:
 *                 type: string
 *     responses:
 *       200:
 *         description: Restaurante actualizado
 */
router.put('/:id', protect, admin, actualizarRestaurante);

/**
 * @swagger
 * /api/restaurantes/{id}:
 *   delete:
 *     summary: Eliminar un restaurante
 *     tags: [Restaurantes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restaurante eliminado correctamente
 */
router.delete('/:id', protect, admin, eliminarRestaurante);

export default router;
