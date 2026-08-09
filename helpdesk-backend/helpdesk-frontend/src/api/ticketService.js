// src/api/ticketService.js
// Capa de acceso a datos: centraliza todas las peticiones HTTP asincronas
// hacia la API REST del backend (Actividad #8). Usar siempre este modulo
// desde los componentes, nunca hacer fetch() directamente en la UI.

import { sanitizeObject } from '../utils/sanitize';

// La URL del backend se lee de una variable de entorno (Vite la expone
// mediante import.meta.env). Ver .env.example para configurarla.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Envoltorio comun para manejar la respuesta y los errores de fetch.
 * Lanza un Error con el mensaje que devuelve la API para que los
 * componentes puedan mostrarlo directamente al usuario.
 */
async function manejarRespuesta(respuesta) {
  const cuerpo = await respuesta.json().catch(() => ({}));

  if (!respuesta.ok) {
    const mensaje = cuerpo?.mensaje || `Error ${respuesta.status} al comunicarse con la API`;
    throw new Error(mensaje);
  }

  return cuerpo;
}

/**
 * Lista los tickets, con filtros opcionales (estado, categoria, prioridad).
 * GET /tickets?estado=Abierto
 */
export async function getTickets(filtros = {}) {
  const params = new URLSearchParams();
  Object.entries(filtros).forEach(([clave, valor]) => {
    if (valor) params.append(clave, valor);
  });

  const query = params.toString() ? `?${params.toString()}` : '';
  const respuesta = await fetch(`${API_URL}/tickets${query}`);
  return manejarRespuesta(respuesta);
}

/** GET /tickets/:id */
export async function getTicketById(id) {
  const respuesta = await fetch(`${API_URL}/tickets/${id}`);
  return manejarRespuesta(respuesta);
}

/** POST /tickets - crea un nuevo incidente (datos sanitizados antes de enviar) */
export async function createTicket(datos) {
  const respuesta = await fetch(`${API_URL}/tickets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sanitizeObject(datos)),
  });
  return manejarRespuesta(respuesta);
}

/** PUT /tickets/:id - actualiza estado o detalles de un incidente */
export async function updateTicket(id, datos) {
  const respuesta = await fetch(`${API_URL}/tickets/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sanitizeObject(datos)),
  });
  return manejarRespuesta(respuesta);
}

/** DELETE /tickets/:id */
export async function deleteTicket(id) {
  const respuesta = await fetch(`${API_URL}/tickets/${id}`, {
    method: 'DELETE',
  });
  return manejarRespuesta(respuesta);
}
