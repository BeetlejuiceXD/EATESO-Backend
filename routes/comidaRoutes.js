

import express from 'express';
import {
  crearComida,
  obtenerComidas,
  obtenerComidaPorId,
  actualizarComida,
  eliminarComida
} from '../controllers/comidaController.js';
import { protect, admin } from '../middlewares/authMiddleware.js';

const router = express.Router();

/**
 * @swagger
 * /api/comidas:
 *   get:
 *     summary: Obtener comidas (por restaurante si se especifica)
 *     tags: [Comidas]
 *     parameters:
 *       - name: restaurante
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de comidas
 */
router.get('/', obtenerComidas);

/**
 * @swagger
 * /api/comidas:
 *   post:
 *     summary: Crear nueva comida
 *     tags: [Comidas]
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
 *               descripcion:
 *                 type: string
 *               imagen:
 *                 type: string
 *               categoria:
 *                 type: string
 *               restaurante:
 *                 type: string
 *               precio:
 *                 type: number
 *     responses:
 *       201:
 *         description: Comida creada
 */
router.post('/', protect, admin, crearComida);

/**
 * @swagger
 * /api/comidas/{id}:
 *   get:
 *     summary: Obtener comida por ID
 *     tags: [Comidas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comida encontrada
 */
router.get('/:id', obtenerComidaPorId);

/**
 * @swagger
 * /api/comidas/{id}:
 *   put:
 *     summary: Actualizar una comida
 *     tags: [Comidas]
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
 *               descripcion:
 *                 type: string
 *               imagen:
 *                 type: string
 *               categoria:
 *                 type: string
 *               precio:
 *                 type: number
 *     responses:
 *       200:
 *         description: Comida actualizada
 */
router.put('/:id', protect, admin, actualizarComida);

/**
 * @swagger
 * /api/comidas/{id}:
 *   delete:
 *     summary: Eliminar una comida
 *     tags: [Comidas]
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
 *         description: Comida eliminada
 */
router.delete('/:id', protect, admin, eliminarComida);

export default router;