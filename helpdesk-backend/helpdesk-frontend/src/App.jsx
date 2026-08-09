// src/App.jsx
// Componente raiz: reproduce el header y la navegación (hd-header / hd-nav)
// del Design System estático, ahora como layout persistente de la SPA, con
// las rutas de los 4 componentes principales.

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Dashboard from './components/Dashboard.jsx';
import TicketForm from './components/TicketForm.jsx';
import TicketList from './components/TicketList.jsx';
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <main className="hd-main">
        <section>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/nuevo-ticket" element={<TicketForm />} />
            <Route path="/tickets" element={<TicketList />} />
            <Route path="*" element={<RutaNoEncontrada />} />
          </Routes>
        </section>
      </main>

      <footer className="hd-footer">
        <p>© 2026 - Universidad Técnica de Manabí | Desarrollo de Sistemas Informáticos</p>
        <p>Sistema de Gestión de Incidentes (Help Desk) · Actividad #9 · Full Stack</p>
      </footer>
    </>
  );
}

function RutaNoEncontrada() {
  return (
    <article className="card empty-state">
      <h3>Página no encontrada</h3>
      <p>La ruta que buscas no existe dentro del sistema.</p>
    </article>
  );
}

export default App;
