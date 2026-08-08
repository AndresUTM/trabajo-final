// src/config/db.js
// Modulo encargado de establecer la conexion con la base de datos MongoDB
// utilizando Mongoose como ODM (Object Document Mapper).

const mongoose = require('mongoose');

/**
 * Conecta la aplicacion a la base de datos MongoDB.
 * La cadena de conexion se obtiene de la variable de entorno MONGO_URI.
 * Si la conexion falla, se detiene el proceso para evitar que el servidor
 * quede levantado sin persistencia de datos.
 */
const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/helpdesk_db';

    const conn = await mongoose.connect(uri);

    console.log(`MongoDB conectado correctamente -> Host: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error al conectar a MongoDB: ${error.message}`);
    process.exit(1); // Finaliza el proceso con fallo
  }
};

module.exports = connectDB;
