// src/server.js
// Punto de entrada de la aplicación.
// Carga variables de entorno, conecta a la base de datos
// y levanta el servidor HTTP.

require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 5000;

// Primero conectamos la base de datos,
// luego levantamos el servidor.
connectDB()
  .then(() => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  });
