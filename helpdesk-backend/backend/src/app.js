// src/app.js
// Configuracion principal de la aplicacion Express: middlewares y rutas.

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const ticketRoutes = require('./routes/ticketRoutes');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();

// ---------- Middlewares globales ----------
app.use(cors()); // Habilita peticiones desde otros origenes (frontend)
app.use(express.json()); // Parseo de body en formato JSON
app.use(morgan('dev')); // Log de peticiones HTTP en consola (util para pruebas)

// ---------- Ruta de salud / bienvenida ----------
app.get('/', (req, res) => {
  res.status(200).json({
    exito: true,
    mensaje: 'API del Sistema de Gestion de Incidentes (Help Desk) funcionando correctamente',
  });
});

// ---------- Rutas de la API ----------
app.use('/tickets', ticketRoutes);

// ---------- Manejo de errores ----------
app.use(notFound);
app.use(errorHandler);

module.exports = app;
