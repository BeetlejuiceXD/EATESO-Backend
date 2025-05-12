import express from 'express';
import { getWishlist, addToWishlist, removeFromWishlist } from '../controllers/wishlistController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/wishlist:
 *   get:
 *     summary: Obtener la wishlist del usuario autenticado
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de comidas en wishlist
 */
router.get('/', protect, getWishlist);

/**
 * @swagger
 * /api/wishlist:
 *   post:
 *     summary: Agregar una comida a la wishlist
 *     tags: [Wishlist]
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
 *         description: Comida agregada a wishlist
 */
router.post('/', protect, addToWishlist);

/**
 * @swagger
 * /api/wishlist/{id}:
 *   delete:
 *     summary: Eliminar una comida de la wishlist
 *     tags: [Wishlist]
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
 *         description: Comida eliminada de wishlist
 */
router.delete('/:id', protect, removeFromWishlist);

export default router;