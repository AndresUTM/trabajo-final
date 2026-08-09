// src/components/TicketForm.jsx
// Componente de Registro de Incidentes. Reproduce fielmente la estructura
// de reportar.html (form-group, form-check-group con radios de prioridad,
// quick-actions) y agrega: estado controlado, validación, sanitización y
// el POST real a la API REST.

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTicket } from '../api/ticketService.js';

const ESTADO_INICIAL = {
  titulo: '',
  categoria: '',
  prioridad: '',
  descripcion: '',
};

function validar(datos) {
  const errores = {};
  if (!datos.titulo || datos.titulo.trim().length < 5) {
    errores.titulo = 'El título debe tener al menos 5 caracteres.';
  }
  if (!datos.categoria) {
    errores.categoria = 'Selecciona una categoría.';
  }
  if (!datos.prioridad) {
    errores.prioridad = 'Selecciona una prioridad.';
  }
  if (!datos.descripcion || datos.descripcion.trim().length < 10) {
    errores.descripcion = 'La descripción debe tener al menos 10 caracteres.';
  }
  return errores;
}

function TicketForm() {
  const [form, setForm] = useState(ESTADO_INICIAL);
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const navigate = useNavigate();

  function actualizarCampo(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
    if (errores[campo]) setErrores((prev) => ({ ...prev, [campo]: undefined }));
  }

  async function manejarEnvio(evento) {
    evento.preventDefault();
    setMensaje(null);

    const erroresValidacion = validar(form);
    if (Object.keys(erroresValidacion).length > 0) {
      setErrores(erroresValidacion);
      return;
    }

    setEnviando(true);
    try {
      await createTicket(form);
      setMensaje({ tipo: 'success', texto: '✅ Ticket guardado correctamente.' });
      setForm(ESTADO_INICIAL);
      setTimeout(() => navigate('/tickets'), 900);
    } catch (err) {
      setMensaje({ tipo: 'error', texto: `❌ ${err.message || 'Ocurrió un error al registrar el ticket.'}` });
    } finally {
      setEnviando(false);
    }
  }

  return (
    <>
      <header>
        <h2>Formulario de Registro de Incidentes</h2>
        <p>Complete todos los campos obligatorios para generar un nuevo ticket de soporte.</p>
      </header>

      <article className="card">
        <h3>Nuevo Incidente</h3>

        {mensaje && <div className={`alert alert--${mensaje.tipo}`}>{mensaje.texto}</div>}

        <form onSubmit={manejarEnvio} noValidate>
          <div className="form-group">
            <label htmlFor="titulo">Título del incidente <span aria-label="obligatorio">*</span>:</label>
            <input
              className={`form-control${errores.titulo ? ' is-invalid' : ''}`}
              type="text"
              id="titulo"
              maxLength={120}
              placeholder="Ej: Caída de red en laboratorio 3"
              value={form.titulo}
              onChange={(e) => actualizarCampo('titulo', e.target.value)}
            />
            {errores.titulo && <span className="field-error">{errores.titulo}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="categoria">Categoría del incidente:</label>
            <select
              className={`form-control${errores.categoria ? ' is-invalid' : ''}`}
              id="categoria"
              value={form.categoria}
              onChange={(e) => actualizarCampo('categoria', e.target.value)}
            >
              <option value="">Seleccione una categoría</option>
              <option value="Red">Red</option>
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
            </select>
            {errores.categoria && <span className="field-error">{errores.categoria}</span>}
          </div>

          <div className="form-group">
            <span>Prioridad del incidente:</span>
            <div className="form-check-group">
              <div className="form-check">
                <input
                  type="radio"
                  id="alta"
                  name="prioridad"
                  checked={form.prioridad === 'Alta'}
                  onChange={() => actualizarCampo('prioridad', 'Alta')}
                />
                <label htmlFor="alta"><span className="badge badge--alta">Alta</span></label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="media"
                  name="prioridad"
                  checked={form.prioridad === 'Media'}
                  onChange={() => actualizarCampo('prioridad', 'Media')}
                />
                <label htmlFor="media"><span className="badge badge--media">Media</span></label>
              </div>
              <div className="form-check">
                <input
                  type="radio"
                  id="baja"
                  name="prioridad"
                  checked={form.prioridad === 'Baja'}
                  onChange={() => actualizarCampo('prioridad', 'Baja')}
                />
                <label htmlFor="baja"><span className="badge badge--baja">Baja</span></label>
              </div>
            </div>
            {errores.prioridad && <span className="field-error">{errores.prioridad}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="descripcion">Descripción detallada del problema:</label>
            <textarea
              className={`form-control${errores.descripcion ? ' is-invalid' : ''}`}
              id="descripcion"
              rows={5}
              maxLength={500}
              placeholder="Describa claramente el incidente, pasos para reproducirlo y cualquier información relevante..."
              value={form.descripcion}
              onChange={(e) => actualizarCampo('descripcion', e.target.value)}
            />
            <span className="form-hint">{form.descripcion.length}/500</span>
            {errores.descripcion && <span className="field-error">{errores.descripcion}</span>}
          </div>

          <div className="quick-actions">
            <button className="btn btn--primary" type="submit" disabled={enviando}>
              {enviando ? 'Enviando…' : '📨 Enviar Reporte'}
            </button>
            <button
              className="btn btn--secondary"
              type="button"
              onClick={() => { setForm(ESTADO_INICIAL); setErrores({}); setMensaje(null); }}
            >
              🗑️ Limpiar formulario
            </button>
          </div>
        </form>
      </article>

      <aside className="alert alert--warning">
        <h4>⚠️ Recomendaciones para reportar</h4>
        <p>Sea lo más específico posible en la descripción. Indique el equipo afectado, mensajes de error y hora del incidente.</p>
      </aside>
    </>
  );
}

export default TicketForm;
