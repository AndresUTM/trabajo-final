# Sistema de Gestión de Incidentes (Help Desk) — Backend API

Proyecto desarrollado para la **Actividad #8: Resolución de Ejercicios**,
Unidad 4 — Desarrollo de Sistemas Informáticos, Universidad Técnica de Manabí.

API RESTful para la gestión de tickets de soporte técnico (incidentes),
construida con **Node.js, Express y MongoDB (Mongoose)**.

---

## 📁 Estructura del proyecto

```
helpdesk-backend/
├── backend/                  # Código fuente del servidor (API REST)
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js         # Conexión a MongoDB
│   │   ├── models/
│   │   │   └── Ticket.js     # Esquema del recurso Ticket
│   │   ├── controllers/
│   │   │   └── ticketController.js  # Lógica CRUD
│   │   ├── routes/
│   │   │   └── ticketRoutes.js      # Definición de endpoints
│   │   ├── middlewares/
│   │   │   └── errorHandler.js
│   │   ├── app.js            # Configuración de Express
│   │   └── server.js         # Punto de entrada
│   ├── package.json
│   └── .env.example
├── db/
│   └── seed.js                # Script para poblar datos de ejemplo
├── docs/
│   └── API.md                 # Documentación detallada de la API
├── frontend/                  # (Opcional) espacio reservado para interfaz cliente
└── README.md
```

---

## 🛠️ Tecnologías utilizadas

- **Node.js** + **Express** — servidor y enrutamiento HTTP
- **MongoDB** + **Mongoose** — base de datos documental y ODM
- **dotenv** — manejo de variables de entorno
- **cors** — habilitar peticiones cross-origin
- **morgan** — logging de peticiones HTTP
- **nodemon** (dev) — recarga automática en desarrollo
- **Postman / cURL** — pruebas de los endpoints

---

## ⚙️ Requisitos previos

- Node.js v18 o superior
- MongoDB corriendo localmente (`mongod`) o una cadena de conexión a MongoDB Atlas
- Postman o Insomnia (para pruebas manuales)

---

## 🚀 Guía de instalación y ejecución local

```bash
# 1. Clonar el repositorio
git clone https://github.com/<tu-usuario>/helpdesk-backend.git
cd helpdesk-backend/backend

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env y ajustar MONGO_URI si es necesario

# 4. (Opcional) Poblar la base de datos con datos de ejemplo
npm run seed

# 5. Levantar el servidor en modo desarrollo
npm run dev

# El servidor quedará disponible en:
# http://localhost:5000
```

---

## 📡 Endpoints disponibles

| Método | Endpoint            | Descripción                          |
|--------|----------------------|---------------------------------------|
| GET    | `/tickets`           | Lista todos los incidentes            |
| GET    | `/tickets/:id`        | Busca un ticket específico            |
| POST   | `/tickets`            | Registra un nuevo incidente           |
| PUT    | `/tickets/:id`        | Actualiza estado/detalles de un ticket|
| DELETE | `/tickets/:id`        | Elimina un registro                   |

Documentación completa con ejemplos de request/response: [`docs/API.md`](./docs/API.md)

### Modelo de datos: Ticket

| Campo       | Tipo    | Valores / Reglas                              |
|-------------|---------|------------------------------------------------|
| id          | ObjectId| Generado automáticamente por MongoDB           |
| titulo      | String  | Obligatorio, mínimo 5 caracteres                |
| descripcion | String  | Obligatorio, mínimo 10 caracteres               |
| categoria   | String  | Red, Hardware, Software                         |
| prioridad   | String  | Alta, Media, Baja                               |
| estado      | String  | Abierto, En Progreso, Cerrado (default: Abierto)|

---

## 🧪 Ejemplos rápidos con cURL

```bash
# Listar tickets
curl http://localhost:5000/tickets

# Crear ticket
curl -X POST http://localhost:5000/tickets \
  -H "Content-Type: application/json" \
  -d '{"titulo":"Falla de red en piso 2","descripcion":"Intermitencia en la red cableada","categoria":"Red","prioridad":"Alta"}'

# Actualizar estado
curl -X PUT http://localhost:5000/tickets/<id> \
  -H "Content-Type: application/json" \
  -d '{"estado":"En Progreso"}'

# Eliminar ticket
curl -X DELETE http://localhost:5000/tickets/<id>
```

---

## 🔀 Flujo de trabajo con Git (control de versiones)

```bash
# Crear la rama de la funcionalidad
git checkout -b feature/backend-api

# Agregar y confirmar los cambios
git add .
git commit -m "feat: implementar API REST de tickets (CRUD) con Express y MongoDB"

# Subir la rama al repositorio remoto
git push origin feature/backend-api

# Fusionar con develop
git checkout develop
git pull origin develop
git merge feature/backend-api
git push origin develop
```

---

## ✅ Checklist de la actividad

- [x] Base de datos documental (MongoDB) con la colección `Tickets`
- [x] Atributos: id, titulo, descripcion, categoria, prioridad, estado
- [x] Endpoint GET /tickets
- [x] Endpoint GET /tickets/:id
- [x] Endpoint POST /tickets
- [x] Endpoint PUT /tickets/:id
- [x] Endpoint DELETE /tickets/:id
- [ ] Pruebas realizadas en Postman/cURL (capturas de pantalla — a cargo del estudiante)
- [ ] Código subido a la rama `feature/backend-api` y fusionado con `develop` (a cargo del estudiante)
- [ ] PDF de entrega con enlace al repositorio y capturas de pantalla (ver plantilla adjunta)

---

## 👤 Autor

Estudiante — Universidad Técnica de Manabí
Desarrollo de Sistemas Informáticos — Unidad 4
