# Documentación de la API — Sistema de Gestión de Incidentes (Help Desk)

Base URL local: `http://localhost:5000`

Todas las respuestas se devuelven en formato JSON con la siguiente estructura general:

```json
{
  "exito": true,
  "datos": { }
}
```

---

## 1. Listar todos los tickets

**GET** `/tickets`

Filtros opcionales por query string: `estado`, `categoria`, `prioridad`.

Ejemplo: `GET /tickets?estado=Abierto&categoria=Red`

**Respuesta 200 OK**
```json
{
  "exito": true,
  "total": 2,
  "datos": [
    {
      "_id": "66a1f0c2e4b0a1a2b3c4d5e6",
      "titulo": "No enciende el computador de recepción",
      "descripcion": "El equipo no enciende desde esta mañana.",
      "categoria": "Hardware",
      "prioridad": "Alta",
      "estado": "Abierto",
      "createdAt": "2026-07-20T10:00:00.000Z",
      "updatedAt": "2026-07-20T10:00:00.000Z"
    }
  ]
}
```

---

## 2. Buscar un ticket por id

**GET** `/tickets/:id`

**Respuesta 200 OK** — ticket encontrado
**Respuesta 404 Not Found** — si el id no existe
**Respuesta 400 Bad Request** — si el id no tiene formato válido de MongoDB

---

## 3. Crear un nuevo ticket

**POST** `/tickets`

**Body (JSON)**
```json
{
  "titulo": "Falla en el switch del segundo piso",
  "descripcion": "Los usuarios del segundo piso reportan intermitencia en la red cableada.",
  "categoria": "Red",
  "prioridad": "Alta",
  "estado": "Abierto"
}
```

**Respuesta 201 Created**
```json
{
  "exito": true,
  "mensaje": "Ticket creado correctamente",
  "datos": { "_id": "...", "titulo": "...", "...": "..." }
}
```

**Respuesta 400 Bad Request** — si falta un campo obligatorio o el valor de `categoria`/`prioridad`/`estado` no es válido.

---

## 4. Actualizar un ticket

**PUT** `/tickets/:id`

**Body (JSON)** — solo se envían los campos a modificar
```json
{
  "estado": "En Progreso"
}
```

**Respuesta 200 OK**
```json
{
  "exito": true,
  "mensaje": "Ticket actualizado correctamente",
  "datos": { "_id": "...", "estado": "En Progreso", "...": "..." }
}
```

---

## 5. Eliminar un ticket

**DELETE** `/tickets/:id`

**Respuesta 200 OK**
```json
{
  "exito": true,
  "mensaje": "Ticket eliminado correctamente",
  "datos": { "_id": "...", "...": "..." }
}
```

---

## Valores permitidos (enum)

| Campo      | Valores válidos                  |
|------------|-----------------------------------|
| categoria  | Red, Hardware, Software           |
| prioridad  | Alta, Media, Baja                 |
| estado     | Abierto, En Progreso, Cerrado     |

---

## Pruebas sugeridas en Postman

1. Crear una colección "Help Desk API".
2. Agregar una petición por cada endpoint (GET, GET by id, POST, PUT, DELETE).
3. Verificar código de estado (200/201) y el cuerpo JSON de respuesta.
4. Guardar capturas de pantalla de cada prueba exitosa para el PDF de entrega.
