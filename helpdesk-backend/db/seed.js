// db/seed.js
// Script auxiliar para insertar tickets de ejemplo en la base de datos.
// Ejecutar desde la carpeta backend con: npm run seed

require('dotenv').config({ path: '../backend/.env' });
const mongoose = require('mongoose');
const path = require('path');

// Reutilizamos el modelo definido en el backend
const Ticket = require(path.join(__dirname, '../backend/src/models/Ticket'));

const ticketsEjemplo = [
  {
    titulo: 'No enciende el computador de recepcion',
    descripcion: 'El equipo de recepcion no enciende desde esta manana, posible falla de fuente de poder.',
    categoria: 'Hardware',
    prioridad: 'Alta',
    estado: 'Abierto',
  },
  {
    titulo: 'Sin acceso a internet en laboratorio 2',
    descripcion: 'Los equipos del laboratorio 2 no logran conectarse a la red inalambrica institucional.',
    categoria: 'Red',
    prioridad: 'Alta',
    estado: 'En Progreso',
  },
  {
    titulo: 'Error al abrir el sistema academico',
    descripcion: 'Al iniciar el sistema academico se muestra una pantalla en blanco con error 500.',
    categoria: 'Software',
    prioridad: 'Media',
    estado: 'Abierto',
  },
  {
    titulo: 'Impresora no imprime documentos',
    descripcion: 'La impresora del departamento de sistemas no responde a los trabajos de impresion enviados.',
    categoria: 'Hardware',
    prioridad: 'Baja',
    estado: 'Cerrado',
  },
];

const importarDatos = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/helpdesk_db';
    await mongoose.connect(uri);

    await Ticket.deleteMany(); // Limpia la coleccion antes de insertar
    await Ticket.insertMany(ticketsEjemplo);

    console.log('Datos de ejemplo insertados correctamente.');
    process.exit();
  } catch (error) {
    console.error(`Error al importar datos: ${error.message}`);
    process.exit(1);
  }
};

importarDatos();
