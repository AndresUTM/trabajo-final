// src/server.js
// Punto de entrada de la aplicacion. Carga variables de entorno,
// conecta a la base de datos y levanta el servidor HTTP.

require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Primero conectamos la base de datos, luego levantamos el servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
