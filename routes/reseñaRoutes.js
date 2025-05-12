import express from 'express';
import {
  crearResena,
  obtenerResenas,
  actualizarResena,
  eliminarResena
} from '../controllers/reseñaController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/resenas:
 *   get:
 *     summary: Obtener reseñas (opcional por comida)
 *     tags: [Reseñas]
 *     parameters:
 *       - name: comida
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de reseñas
 */
router.get('/', obtenerResenas);

/**
 * @swagger
 * /api/resenas:
 *   post:
 *     summary: Crear nueva reseña
 *     tags: [Reseñas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comida:
 *                 type: string
 *               texto:
 *                 type: string
 *               calificacion:
 *                 type: number
 *     responses:
 *       201:
 *         description: Reseña creada
 */
router.post('/', protect, crearResena);

/**
 * @swagger
 * /api/resenas/{id}:
 *   put:
 *     summary: Actualizar una reseña
 *     tags: [Reseñas]
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
 *               texto:
 *                 type: string
 *               calificacion:
 *                 type: number
 *     responses:
 *       200:
 *         description: Reseña actualizada
 */
router.put('/:id', protect, actualizarResena);

/**
 * @swagger
 * /api/resenas/{id}:
 *   delete:
 *     summary: Eliminar una reseña
 *     tags: [Reseñas]
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
 *         description: Reseña eliminada correctamente
 */
router.delete('/:id', protect, eliminarResena);

export default router;
