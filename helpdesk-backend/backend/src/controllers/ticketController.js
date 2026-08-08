// src/controllers/ticketController.js
// Contiene la logica de negocio para cada endpoint relacionado con Tickets.
// Cada funcion corresponde a una operacion CRUD (Crear, Leer, Actualizar, Eliminar).

const Ticket = require('../models/Ticket');
const mongoose = require('mongoose');

/**
 * GET /tickets
 * Lista todos los incidentes registrados.
 * Soporta filtros opcionales por query string: ?estado=Abierto&categoria=Red
 */
const getTickets = async (req, res) => {
  try {
    const filtros = {};
    const { estado, categoria, prioridad } = req.query;

    if (estado) filtros.estado = estado;
    if (categoria) filtros.categoria = categoria;
    if (prioridad) filtros.prioridad = prioridad;

    const tickets = await Ticket.find(filtros).sort({ createdAt: -1 });

    return res.status(200).json({
      exito: true,
      total: tickets.length,
      datos: tickets,
    });
  } catch (error) {
    return res.status(500).json({
      exito: false,
      mensaje: 'Error al obtener los tickets',
      error: error.message,
    });
  }
};

/**
 * GET /tickets/:id
 * Busca y devuelve un ticket especifico segun su id.
 */
const getTicketById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ exito: false, mensaje: 'El id proporcionado no es valido' });
    }

    const ticket = await Ticket.findById(id);

    if (!ticket) {
      return res.status(404).json({ exito: false, mensaje: 'Ticket no encontrado' });
    }

    return res.status(200).json({ exito: true, datos: ticket });
  } catch (error) {
    return res.status(500).json({
      exito: false,
      mensaje: 'Error al obtener el ticket',
      error: error.message,
    });
  }
};

/**
 * POST /tickets
 * Registra un nuevo incidente en la base de datos.
 */
const createTicket = async (req, res) => {
  try {
    const { titulo, descripcion, categoria, prioridad, estado } = req.body;

    const nuevoTicket = await Ticket.create({
      titulo,
      descripcion,
      categoria,
      prioridad,
      estado,
    });

    return res.status(201).json({
      exito: true,
      mensaje: 'Ticket creado correctamente',
      datos: nuevoTicket,
    });
  } catch (error) {
    // Errores de validacion de Mongoose (campos requeridos, enum, etc.)
    if (error.name === 'ValidationError') {
      const mensajes = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ exito: false, mensaje: 'Datos invalidos', errores: mensajes });
    }

    return res.status(500).json({
      exito: false,
      mensaje: 'Error al crear el ticket',
      error: error.message,
    });
  }
};

/**
 * PUT /tickets/:id
 * Actualiza el estado o los detalles de un ticket existente.
 */
const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ exito: false, mensaje: 'El id proporcionado no es valido' });
    }

    const ticketActualizado = await Ticket.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true } // Devuelve el doc actualizado y valida el schema
    );

    if (!ticketActualizado) {
      return res.status(404).json({ exito: false, mensaje: 'Ticket no encontrado' });
    }

    return res.status(200).json({
      exito: true,
      mensaje: 'Ticket actualizado correctamente',
      datos: ticketActualizado,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const mensajes = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ exito: false, mensaje: 'Datos invalidos', errores: mensajes });
    }

    return res.status(500).json({
      exito: false,
      mensaje: 'Error al actualizar el ticket',
      error: error.message,
    });
  }
};

/**
 * DELETE /tickets/:id
 * Elimina un registro (ticket) de la base de datos.
 */
const deleteTicket = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ exito: false, mensaje: 'El id proporcionado no es valido' });
    }

    const ticketEliminado = await Ticket.findByIdAndDelete(id);

    if (!ticketEliminado) {
      return res.status(404).json({ exito: false, mensaje: 'Ticket no encontrado' });
    }

    return res.status(200).json({
      exito: true,
      mensaje: 'Ticket eliminado correctamente',
      datos: ticketEliminado,
    });
  } catch (error) {
    return res.status(500).json({
      exito: false,
      mensaje: 'Error al eliminar el ticket',
      error: error.message,
    });
  }
};

module.exports = {
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
};
