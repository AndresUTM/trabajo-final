// src/components/TicketList.jsx
// Componente de Listado de Tickets. Reproduce la tabla hd-table y el
// resumen por categoría de tickets.html, ahora con datos reales: filtros
// (GET /tickets?...), cambio de estado (PUT) y eliminación (DELETE).

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTickets, updateTicket, deleteTicket } from '../api/ticketService.js';
import { BadgePrioridad, StatusDot } from './Badge.jsx';

const ESTADOS = ['Abierto', 'En Progreso', 'Cerrado'];
const CATEGORIAS = ['Red', 'Hardware', 'Software'];

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const [filtros, setFiltros] = useState({ estado: '', categoria: '', prioridad: '' });
  const [idEnProceso, setIdEnProceso] = useState(null);

  useEffect(() => {
    cargarTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros]);

  async function cargarTickets() {
    setCargando(true);
    setError('');
    try {
      const respuesta = await getTickets(filtros);
      setTickets(respuesta.datos || []);
    } catch (err) {
      setError(err.message || 'No se pudo conectar con la API');
    } finally {
      setCargando(false);
    }
  }

  function actualizarFiltro(campo, valor) {
    setFiltros((prev) => ({ ...prev, [campo]: valor }));
  }

  async function cambiarEstado(id, nuevoEstado) {
    setIdEnProceso(id);
    try {
      await updateTicket(id, { estado: nuevoEstado });
      setTickets((prev) => prev.map((t) => (t._id === id ? { ...t, estado: nuevoEstado } : t)));
    } catch (err) {
      setError(err.message || 'No se pudo actualizar el ticket');
    } finally {
      setIdEnProceso(null);
    }
  }

  async function eliminarTicket(id) {
    if (!window.confirm('¿Eliminar este ticket? Esta acción no se puede deshacer.')) return;
    setIdEnProceso(id);
    try {
      await deleteTicket(id);
      setTickets((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setError(err.message || 'No se pudo eliminar el ticket');
    } finally {
      setIdEnProceso(null);
    }
  }

  const resumenPorCategoria = CATEGORIAS.map((cat) => ({
    categoria: cat,
    total: tickets.filter((t) => t.categoria === cat).length,
    alta: tickets.filter((t) => t.categoria === cat && t.prioridad === 'Alta').length,
    media: tickets.filter((t) => t.categoria === cat && t.prioridad === 'Media').length,
    baja: tickets.filter((t) => t.categoria === cat && t.prioridad === 'Baja').length,
  }));

  return (
    <>
      <header>
        <h2>Tickets Registrados</h2>
        <p>A continuación se muestra el listado actual de incidentes reportados en el sistema.</p>
      </header>

      <div className="quick-actions" style={{ marginBottom: 'var(--spacing-lg)' }}>
        <Link className="btn btn--primary" to="/nuevo-ticket">➕ Reportar nuevo incidente</Link>
        <button className="btn btn--secondary" onClick={cargarTickets}>🔄 Actualizar</button>
      </div>

      <div className="filters-bar">
        <select className="form-control" value={filtros.estado} onChange={(e) => actualizarFiltro('estado', e.target.value)}>
          <option value="">Todos los estados</option>
          {ESTADOS.map((e) => <option key={e} value={e}>{e}</option>)}
        </select>
        <select className="form-control" value={filtros.categoria} onChange={(e) => actualizarFiltro('categoria', e.target.value)}>
          <option value="">Todas las categorías</option>
          {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="form-control" value={filtros.prioridad} onChange={(e) => actualizarFiltro('prioridad', e.target.value)}>
          <option value="">Todas las prioridades</option>
          <option value="Alta">Alta</option>
          <option value="Media">Media</option>
          <option value="Baja">Baja</option>
        </select>
      </div>

      {error && <div className="alert alert--error">❌ {error}</div>}

      <article className="card">
        <h3>Incidentes Activos</h3>

        {cargando ? (
          <p className="loading-state">Cargando tickets…</p>
        ) : tickets.length === 0 ? (
          <div className="empty-state">
            <h3>No hay tickets que coincidan</h3>
            <p>Ajusta los filtros o registra un nuevo incidente.</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="hd-table">
              <caption>Listado de tickets de soporte técnico</caption>
              <thead>
                <tr>
                  <th>ID Ticket</th>
                  <th>Título</th>
                  <th>Categoría</th>
                  <th>Prioridad</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((t) => (
                  <tr key={t._id}>
                    <td><span className="mono">#{t._id.slice(-6)}</span></td>
                    <td>{t.titulo}</td>
                    <td>{t.categoria}</td>
                    <td><BadgePrioridad valor={t.prioridad} /></td>
                    <td><StatusDot estado={t.estado} /> {t.estado}</td>
                    <td>
                      <div className="ticket-actions">
                        <select
                          className="form-control"
                          value={t.estado}
                          disabled={idEnProceso === t._id}
                          onChange={(e) => cambiarEstado(t._id, e.target.value)}
                        >
                          {ESTADOS.map((e) => <option key={e} value={e}>{e}</option>)}
                        </select>
                        <button
                          type="button"
                          className="btn--danger-text"
                          disabled={idEnProceso === t._id}
                          onClick={() => eliminarTicket(t._id)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={6}>Total de tickets mostrados: {tickets.length}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </article>

      {tickets.length > 0 && (
        <article className="card">
          <h3>Resumen por Categoría</h3>
          <div className="grid">
            {resumenPorCategoria.map((r) => (
              <div className={`card card--ticket${r.total > 0 ? ' card--alta' : ''}`} style={{ marginBottom: 0 }} key={r.categoria}>
                <div className="card__header">
                  <h4>{r.categoria}</h4>
                  <span className="badge badge--media">{r.total} ticket{r.total !== 1 ? 's' : ''}</span>
                </div>
                <p className="card__meta">{r.alta} Alta, {r.media} Media, {r.baja} Baja</p>
              </div>
            ))}
          </div>
        </article>
      )}
    </>
  );
}

export default TicketList;
