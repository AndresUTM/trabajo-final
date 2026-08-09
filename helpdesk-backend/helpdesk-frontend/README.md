# Help Desk — Frontend

SPA (Single Page Application) del Sistema de Gestión de Incidentes, construida con **React + Vite**. Consume la API REST desarrollada en la Actividad #8.

## Componentes principales

- **Navbar** — navegación entre las vistas (Dashboard, Registrar, Tickets).
- **Dashboard** — resumen de indicadores: totales por estado y por categoría, incidentes recientes.
- **TicketForm** — registro de nuevos incidentes (POST /tickets).
- **TicketList** — listado con filtros, cambio de estado (PUT) y eliminación (DELETE).

## Ejecutar en local

```bash
npm install
cp .env.example .env      # y edita VITE_API_URL si es necesario
npm run dev
```

Abre http://localhost:5173. Asegúrate de que el backend esté corriendo (por defecto en `http://localhost:5000`).

## Compilar para producción

```bash
npm run build      # genera la carpeta dist/
npm run preview    # sirve dist/ localmente para probarlo
```

## Desplegar en Vercel o Netlify

1. Sube este proyecto a un repositorio de GitHub (puede ir junto al backend o en repos separados).
2. En Vercel/Netlify, importa el repositorio y selecciona la carpeta `helpdesk-frontend` como raíz del proyecto (si está en un monorepo).
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Agrega la variable de entorno `VITE_API_URL` con la URL pública de tu backend en Render/Railway (ej. `https://helpdesk-backend-xxxx.onrender.com`).
5. Despliega. Obtendrás una URL pública tipo `https://tu-proyecto.vercel.app`.

## Seguridad (XSS)

- React escapa automáticamente todo el contenido insertado en el JSX (no se usa `dangerouslySetInnerHTML` en ningún componente).
- Además, `src/utils/sanitize.js` limpia las entradas del usuario (elimina etiquetas HTML, `javascript:` y manejadores `on*=`) antes de enviarlas a la API, evitando que contenido malicioso llegue a persistirse en la base de datos.
