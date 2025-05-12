import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

import userRoutes from './routes/userRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import likeRoutes from './routes/likeRoutes.js';
import cafeteriaRoutes from './routes/cafeteriaRoutes.js';
import restauranteRoutes from './routes/restauranteRoutes.js';
import comidaRoutes from './routes/comidaRoutes.js';
import resenaRoutes from './routes/reseñaRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch((err) => console.error('❌ Error de conexión a MongoDB:', err));

// Swagger config
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EATESO',
      version: '1.0.0',
      description: 'Documentación de EATESO',
    },
    servers: [
      {
        url: 'http://localhost:4000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/cafeterias', cafeteriaRoutes); // ← activa cuando tengas la ruta
app.use('/api/restaurantes', restauranteRoutes);
app.use('/api/comidas', comidaRoutes);
app.use('/api/resenas', resenaRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.send('API de Reseñas Cafeterías ITESO corriendo...');
});

// Iniciar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});