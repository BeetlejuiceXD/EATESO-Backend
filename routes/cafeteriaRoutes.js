import express from 'express';
import {
  crearCafeteria,
  obtenerCafeterias,
  actualizarCafeteria,
  eliminarCafeteria
} from '../controllers/cafeteriaController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/cafeterias:
 *   get:
 *     summary: Obtener todas las cafeterías
 *     tags: [Cafeterias]
 *     responses:
 *       200:
 *         description: Lista de cafeterías
 */
router.get('/', obtenerCafeterias);

/**
 * @swagger
 * /api/cafeterias:
 *   post:
 *     summary: Crear una nueva cafetería
 *     tags: [Cafeterias]
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
 *               ubicacion:
 *                 type: string
 *               imagen:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cafetería creada
 */
router.post('/', protect, admin, crearCafeteria);

/**
 * @swagger
 * /api/cafeterias/{id}:
 *   put:
 *     summary: Actualizar una cafetería
 *     tags: [Cafeterias]
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
 *               ubicacion:
 *                 type: string
 *               imagen:
 *                 type: string
 *     responses:
 *       200:
 *         description: Cafetería actualizada
 */
router.put('/:id', protect, admin, actualizarCafeteria);

/**
 * @swagger
 * /api/cafeterias/{id}:
 *   delete:
 *     summary: Eliminar una cafetería
 *     tags: [Cafeterias]
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
 *         description: Cafetería eliminada correctamente
 */
router.delete('/:id', protect, admin, eliminarCafeteria);

export default router;
