// src/utils/sanitize.js
// Utilidades para desinfectar (sanitizar) las entradas del usuario antes de
// enviarlas a la API o renderizarlas, previniendo vulnerabilidades XSS
// (Cross-Site Scripting).
//
// Nota: React ya escapa por defecto cualquier valor insertado en el JSX
// (nunca usamos dangerouslySetInnerHTML en este proyecto), pero como buena
// practica de seguridad tambien limpiamos el texto que el usuario escribe
// ANTES de enviarlo a la API, para no persistir en la base de datos
// contenido potencialmente malicioso (ej. <script>, onerror=, etc.).

/**
 * Elimina etiquetas HTML/JS y caracteres peligrosos de una cadena de texto.
 * @param {string} value - Texto ingresado por el usuario.
 * @returns {string} Texto limpio, sin marcado HTML.
 */
export function sanitizeInput(value) {
  if (typeof value !== 'string') return value;

  return value
    // Elimina cualquier etiqueta HTML: <script>, <img>, <div>, etc.
    .replace(/<[^>]*>?/gm, '')
    // Elimina el prefijo "javascript:" usado en ataques via atributos href/src
    .replace(/javascript:/gi, '')
    // Elimina manejadores de eventos inline: onerror=, onclick=, etc.
    .replace(/on\w+\s*=/gi, '')
    .trim();
}

/**
 * Aplica sanitizeInput a todos los campos de tipo string de un objeto.
 * Util para limpiar el body completo de un formulario antes de enviarlo.
 * @param {Object} obj - Objeto con los datos del formulario.
 * @returns {Object} Copia del objeto con los strings sanitizados.
 */
export function sanitizeObject(obj) {
  const clean = {};
  for (const key in obj) {
    clean[key] = sanitizeInput(obj[key]);
  }
  return clean;
}
