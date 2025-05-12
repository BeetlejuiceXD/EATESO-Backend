import express from 'express';
import { addLike, removeLike, getUserLikes } from '../controllers/likeController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/likes:
 *   get:
 *     summary: Obtener los likes del usuario autenticado
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de likes
 */
router.get('/', protect, getUserLikes);

/**
 * @swagger
 * /api/likes:
 *   post:
 *     summary: Dar like a una comida
 *     tags: [Likes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comidaId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Like agregado
 */
router.post('/', protect, addLike);

/**
 * @swagger
 * /api/likes/{id}:
 *   delete:
 *     summary: Quitar like
 *     tags: [Likes]
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
 *         description: Like eliminado
 */
router.delete('/:id', protect, removeLike);

export default router;
