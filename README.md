# Ellume API - Aplicación de Transporte Urbano

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

## Descripción

Ellume API es el backend para una aplicación de transporte urbano tipo Uber, desarrollada con NestJS. Esta API proporciona la infraestructura necesaria para conectar conductores con pasajeros, gestionar viajes, pagos y más. Actualmente se encuentra en fase inicial de desarrollo con el sistema de autenticación implementado.

## Estado Actual del Proyecto

**Fase 1: Autenticación y Gestión de Usuarios (En desarrollo)**

- ✅ Autenticación JWT implementada
- ✅ Registro y login de usuarios
- ✅ Protección de rutas con guards
- ✅ Perfiles de usuario básicos
- ✅ Carga de imágenes de perfil

**Próximas fases (Planificadas)**

- Gestión de viajes
- Sistema de geolocalización
- Cálculo de rutas y precios
- Pasarela de pagos
- Calificaciones y reseñas
- Notificaciones en tiempo real

## Requisitos Previos

- Node.js (v14 o superior)
- MySQL
- npm o yarn

## Instalación

```bash
# Clonar el repositorio
$ git clone https://github.com/tu-usuario/ellume-api.git

# Instalar dependencias
$ npm install

# Configurar la base de datos
# Asegúrate de tener MySQL instalado y crea una base de datos llamada 'ellumedb'
```

## Configuración

La aplicación está configurada para conectarse a una base de datos MySQL local. Puedes modificar la configuración en el archivo `src/app.module.ts`.

```typescript
TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'admin123',
  database: 'ellumedb',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // No usar en producción
  autoLoadEntities: true,
}),
```

## Ejecución

```bash
# Modo desarrollo
$ npm run start:dev

# Modo producción
$ npm run start:prod
```

## Endpoints Implementados

### Autenticación

- **POST /auth/register**: Registrar un nuevo usuario
  ```json
  {
    "email": "usuario@ejemplo.com",
    "password": "contraseña",
    "name": "Nombre",
    "lastname": "Apellido",
    "phone": "123456789"
  }
  ```

- **POST /auth/login**: Iniciar sesión y obtener token JWT
  ```json
  {
    "email": "usuario@ejemplo.com",
    "password": "contraseña"
  }
  ```

### Usuarios

- **GET /users/profile**: Obtener perfil del usuario autenticado (requiere token JWT)

## Seguridad

Todas las rutas protegidas requieren un token JWT válido en el encabezado de autorización:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Estructura del Proyecto

```
src/
├── auth/                  # Módulo de autenticación
│   ├── dto/               # Objetos de transferencia de datos
│   ├── guards/            # Guards de autenticación JWT
│   ├── strategies/        # Estrategias de autenticación
│   ├── auth.controller.ts # Controlador de autenticación
│   ├── auth.module.ts     # Módulo de autenticación
│   └── auth.service.ts    # Servicio de autenticación
├── users/                 # Módulo de usuarios
│   ├── dto/               # DTOs para usuarios
│   ├── entities/          # Entidades de usuario
│   ├── users.controller.ts
│   ├── users.module.ts
│   └── users.service.ts
├── uploads/               # Módulo para carga de archivos (en desarrollo)
├── app.controller.ts      # Controlador principal
├── app.module.ts          # Módulo principal
├── app.service.ts         # Servicio principal
└── main.ts                # Punto de entrada de la aplicación
```

## Próximos Pasos

- Implementación de roles (conductor/pasajero)
- Sistema de gestión de viajes
- Integración con servicios de mapas
- Cálculo de tarifas dinámicas
- Sistema de pagos
- Notificaciones en tiempo real

## Pruebas

```bash
# Pruebas unitarias
$ npm run test

# Pruebas e2e
$ npm run test:e2e

# Cobertura de pruebas
$ npm run test:cov
```

## Licencia

Este proyecto está bajo la Licencia MIT.

