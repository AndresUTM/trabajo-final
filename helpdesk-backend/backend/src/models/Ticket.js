// src/models/Ticket.js
// Define el esquema (schema) de la coleccion "tickets" en MongoDB.
// Representa un incidente reportado en el sistema de Help Desk.

const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: [true, 'El titulo es obligatorio'],
      trim: true,
      minlength: [5, 'El titulo debe tener al menos 5 caracteres'],
      maxlength: [120, 'El titulo no puede superar los 120 caracteres'],
    },
    descripcion: {
      type: String,
      required: [true, 'La descripcion es obligatoria'],
      trim: true,
      minlength: [10, 'La descripcion debe tener al menos 10 caracteres'],
    },
    categoria: {
      type: String,
      required: [true, 'La categoria es obligatoria'],
      enum: {
        values: ['Red', 'Hardware', 'Software'],
        message: 'La categoria debe ser: Red, Hardware o Software',
      },
    },
    prioridad: {
      type: String,
      required: [true, 'La prioridad es obligatoria'],
      enum: {
        values: ['Alta', 'Media', 'Baja'],
        message: 'La prioridad debe ser: Alta, Media o Baja',
      },
    },
    estado: {
      type: String,
      enum: {
        values: ['Abierto', 'En Progreso', 'Cerrado'],
        message: 'El estado debe ser: Abierto, En Progreso o Cerrado',
      },
      default: 'Abierto',
    },
  },
  {
    timestamps: true, // Agrega automaticamente createdAt y updatedAt
  }
);

module.exports = mongoose.model('Ticket', TicketSchema);
