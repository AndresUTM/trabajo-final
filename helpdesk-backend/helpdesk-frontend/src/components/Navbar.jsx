// src/components/Navbar.jsx
// Componente de Navegación. Reutiliza exactamente las clases hd-header y
// hd-nav definidas en el Design System (Unidad 3): header con branding +
// barra de navegación sticky con enlaces, ahora manejados por React Router
// en lugar de páginas .html independientes.

import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <>
      <header className="hd-header">
        <div>
          <h1>🖥️ Sistema Help Desk</h1>
          <p>Gestión integral de incidentes TI</p>
        </div>
        <div>
          <span className="badge badge--media">📊 SPA · React</span>
        </div>
      </header>

      <nav className="hd-nav">
        <ul>
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
              📊 Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/nuevo-ticket" className={({ isActive }) => (isActive ? 'active' : '')}>
              📝 Reportar Incidente
            </NavLink>
          </li>
          <li>
            <NavLink to="/tickets" className={({ isActive }) => (isActive ? 'active' : '')}>
              🎫 Ver Tickets
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
