// src/middlewares/errorHandler.js
// Middlewares generales de la aplicacion: ruta no encontrada y manejo de errores.

// Se ejecuta cuando ninguna ruta coincide con la peticion (404)
const notFound = (req, res, next) => {
  res.status(404).json({
    exito: false,
    mensaje: `Ruta no encontrada: ${req.originalUrl}`,
  });
};

// Middleware final de manejo de errores no controlados
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    exito: false,
    mensaje: err.message || 'Error interno del servidor',
  });
};

module.exports = { notFound, errorHandler };
