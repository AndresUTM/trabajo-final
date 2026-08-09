// src/components/Badge.jsx
// Pequeño componente de presentación que reutiliza las clases badge--alta /
// badge--media / badge--baja del Design System (Unidad 3). El estado del
// ticket se mapea sobre esa misma escala visual (Abierto ~ alta prioridad
// visual, En Progreso ~ media, Cerrado ~ baja), y la categoría usa un
// badge neutro definido en App.css.

function claseDePrioridad(prioridad) {
  if (prioridad === 'Alta') return 'badge--alta';
  if (prioridad === 'Media') return 'badge--media';
  return 'badge--baja';
}

function claseDeEstado(estado) {
  if (estado === 'Abierto') return 'badge--alta';
  if (estado === 'En Progreso') return 'badge--media';
  return 'badge--baja';
}

export function BadgePrioridad({ valor }) {
  return <span className={`badge ${claseDePrioridad(valor)}`}>{valor}</span>;
}

export function BadgeEstado({ valor }) {
  return <span className={`badge ${claseDeEstado(valor)}`}>{valor}</span>;
}

export function BadgeCategoria({ valor }) {
  return <span className="badge badge--neutral">{valor}</span>;
}

export function StatusDot({ estado }) {
  if (estado === 'Abierto') return <span className="status-dot status-dot--danger" />;
  if (estado === 'En Progreso') return <span className="status-dot status-dot--warning" />;
  return <span className="status-dot" />;
}
