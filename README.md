# Sistema de Gestión de Gastos - Backend API

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Descripción

Backend RESTful construido con **NestJS** y **TypeScript** para la gestión de gastos.

---

## Tecnologías Utilizadas

- **NestJS**
- **TypeScript** - Tipado fuerte
- **PostgreSQL** - Base de datos relacional
- **TypeORM** - ORM para Node.js
- **class-validator** - Validación de DTOs
- **class-transformer** - Transformación de DTOs
- **Helmet** - Seguridad de headers HTTP
- **@nestjs/throttler** - Rate limiting

---

## Instalación

### Prerrequisitos

- Node.js (v16 o superior)
- npm o yarn
- PostgreSQL (v12 o superior)

### Pasos

```bash
# 1. Clonar el repositorio
git clone <repository-url>
cd tuto-nest-simple

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env

# 4. Editar el archivo .env con tu configuración
nano .env

# 5. Iniciar el servidor
npm run start:dev
```

---

## Variables de Entorno

Usa el archivo `.env.example` como base y configura las variables necesarias:

```env
DB_HOST = "ENLACE_DE_LA_BASE_DE_DATOS_AQUÍ"
DB_PORT = "PUERTO"
DB_USERNAME = "USUARIO"
DB_PASSWORD = "CONTRASEÑA"
DB_NAME = "NOMBRE_DE_LA_BASE_DE_DATOS"
DB_SYNC = "SINCRONIZAR_BASE_DE_DATOS"
DB_SSL_MODE = "SSL_MODE_AQUÍ"
DB_CHANNEL_BINDING = "CHANNEL_BINDING_AQUÍ"
CORS_ORIGIN = "LOCALHOST_Y/O_DOMINIO_AQUI"
PORT=3000
```
---

## Semillas de Datos
Para poblar la base de datos con datos de ejemplo, ejecuta:

```bash
npm run seed
```
Te insertará 16 gastos de ejemplo en la base de datos.

---

## Endpoints de la API

### Base URL
```
http://localhost:3000/api
```

### Gastos (Expenses)

#### Listar todos los gastos con paginación

```http
GET /expenses?page=1&limit=10&category=alimentacion&query=comida
```

**Parámetros de Query:**
- `page` (number, opcional) - Página actual (default: 1)
- `limit` (number, opcional) - Registros por página (default: 10, máx: 100)
- `category` (enum, opcional) - Filtrar por categoría
- `query` (string, opcional) - Buscar en descripción


---

#### Obtener un gasto por ID

```http
GET /expenses/:id
```
**Parámetros de Query:**
- `id` (integer, requerido) - ID del gasto

---

#### Buscar gastos por descripción

```http
GET /expenses/search?query=comida
```

**Parámetros de Query:**
- `query` (string, requerido) - Término de búsqueda (case-insensitive)

---

#### Crear un nuevo gasto

```http
POST /expenses
Content-Type: application/json

{
  "description": "Compra de comida",
  "amount": 45.50,
  "date": "2024-01-15T10:30:00.000Z",
  "category": "alimentacion"
}
```

**Validaciones:**
- `description` - String, 3-255 caracteres, requerido
- `amount` - Número positivo, máx 2 decimales, requerido
- `date` - Fecha válida, requerido
- `category` - Una de: alimentacion, transporte, vivienda, entretenimiento, salud, educacion, utilidades, otros

---

#### Actualizar un gasto

```http
PUT /expenses/:id
Content-Type: application/json

{
  "description": "Compra de comida actualizada",
  "amount": 50.00
}
```

**Nota:** Todos los campos son opcionales

#### Eliminar un gasto

```http
DELETE /expenses/:id
```
---

## Estructura del Proyecto

```
src/
├── expenses/              # Módulo de gastos
│   ├── dto/
│   │   ├── create-expense.dto.ts
│   │   ├── update-expense.dto.ts
│   │   └── query-expense.dto.ts
│   ├── entities/
│   │   └── expense.entity.ts
│   ├── enums/
│   │   └── expense-category.enum.ts
│   ├── expenses.controller.ts
│   ├── expenses.service.ts
│   └── expenses.module.ts
├── database/              # Configuración de BD
│   └── database.module.ts
├── logger/                # Logger custom
│   └── logger.service.ts
├── app.module.ts          # Módulo principal
├── main.ts                # Punto de entrada
└── all-exceptions.filter.ts
```
---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---