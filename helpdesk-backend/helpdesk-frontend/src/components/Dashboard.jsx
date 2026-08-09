// src/components/Dashboard.jsx
// Componente Dashboard. Reutiliza .dashboard-grid y .stat-card del Design
// System (idénticos a los de index.html), pero ahora con datos reales
// obtenidos de la API mediante GET /tickets, en lugar de valores fijos.

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTickets } from '../api/ticketService.js';
import { BadgePrioridad } from './Badge.jsx';

function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    cargarTickets();
  }, []);

  async function cargarTickets() {
    setCargando(true);
    setError('');
    try {
      const respuesta = await getTickets();
      setTickets(respuesta.datos || []);
    } catch (err) {
      setError(err.message || 'No se pudo conectar con la API');
    } finally {
      setCargando(false);
    }
  }

  const total = tickets.length;
  const abiertos = tickets.filter((t) => t.estado === 'Abierto').length;
  const enProgreso = tickets.filter((t) => t.estado === 'En Progreso').length;
  const cerrados = tickets.filter((t) => t.estado === 'Cerrado').length;

  const categorias = ['Red', 'Hardware', 'Software'];
  const conteoPorCategoria = categorias.map((cat) => ({
    categoria: cat,
    cantidad: tickets.filter((t) => t.categoria === cat).length,
  }));
  const maxCategoria = Math.max(1, ...conteoPorCategoria.map((c) => c.cantidad));

  const recientes = [...tickets]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <>
      <header>
        <h2>Bienvenido al Sistema de Gestión de Incidentes</h2>
        <p>Plataforma centralizada para el registro, seguimiento y resolución de incidentes tecnológicos.</p>
      </header>

      {error && (
        <div className="alert alert--error">
          ❌ No se pudo cargar la información: {error}. Verifica que la API esté en ejecución.
        </div>
      )}

      {cargando ? (
        <p className="loading-state">Cargando indicadores…</p>
      ) : (
        <>
          <div className="dashboard-grid">
            <article className="card stat-card">
              <p className="stat-card__number">{total}</p>
              <p className="card__meta">Total de tickets</p>
            </article>
            <article className="card stat-card">
              <p className="stat-card__number">{abiertos}</p>
              <p className="card__meta">Abiertos <span className="badge badge--alta">Alta</span></p>
            </article>
            <article className="card stat-card">
              <p className="stat-card__number">{enProgreso}</p>
              <p className="card__meta">En progreso <span className="badge badge--media">Media</span></p>
            </article>
            <article className="card stat-card">
              <p className="stat-card__number">{cerrados}</p>
              <p className="card__meta">Cerrados <span className="badge badge--baja">Baja</span></p>
            </article>
          </div>

          <div className="dashboard-panels">
            <article className="card">
              <h3>Incidentes recientes</h3>
              {recientes.length === 0 ? (
                <p className="card__meta">
                  Aún no hay tickets registrados. <Link to="/nuevo-ticket">Registrar el primero</Link>.
                </p>
              ) : (
                recientes.map((t) => (
                  <div className="recent-row" key={t._id}>
                    <div>
                      <p className="recent-title">{t.titulo}</p>
                      <p className="card__meta mono">#{t._id.slice(-6)}</p>
                    </div>
                    <BadgePrioridad valor={t.prioridad} />
                  </div>
                ))
              )}
            </article>

            <article className="card">
              <h3>Por categoría</h3>
              {conteoPorCategoria.map((c) => (
                <div className="breakdown-row" key={c.categoria}>
                  <span className="breakdown-label">{c.categoria}</span>
                  <div className="breakdown-bar-track">
                    <div
                      className="breakdown-bar-fill"
                      style={{ width: `${(c.cantidad / maxCategoria) * 100}%` }}
                    />
                  </div>
                  <span className="breakdown-count">{c.cantidad}</span>
                </div>
              ))}
            </article>
          </div>

          <section style={{ marginTop: 'var(--spacing-xl)' }}>
            <h3>Accesos Directos</h3>
            <div className="quick-actions">
              <Link className="btn btn--primary" to="/nuevo-ticket">➕ Reportar nuevo incidente</Link>
              <Link className="btn btn--secondary" to="/tickets">📋 Ver listado completo de tickets</Link>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default Dashboard;
