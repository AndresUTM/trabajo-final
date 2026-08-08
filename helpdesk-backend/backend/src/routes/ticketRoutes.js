// src/routes/ticketRoutes.js
// Define las rutas HTTP que expone la API para el recurso "tickets"
// y las enlaza con su respectivo controlador.

const express = require('express');
const router = express.Router();

const {
  getTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
} = require('../controllers/ticketController');

// GET /tickets -> Lista todos los incidentes
router.get('/', getTickets);

// GET /tickets/:id -> Busca un ticket especifico
router.get('/:id', getTicketById);

// POST /tickets -> Registra un nuevo incidente
router.post('/', createTicket);

// PUT /tickets/:id -> Actualiza el estado o detalles de un ticket
router.put('/:id', updateTicket);

// DELETE /tickets/:id -> Elimina un registro
router.delete('/:id', deleteTicket);

module.exports = router;
