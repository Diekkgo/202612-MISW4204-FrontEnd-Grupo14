# Gestor App

## Estructura de Carpetas

La estructura del proyecto se compone de la siguiente manera:

```text
src/
├── app/
│   ├── core/                     # Servicios globales (singleton)
│   │   ├── services/
│   │   │   └── token.service.ts
│   │   ├── interceptors/
│   │   │   └── auth.interceptor.ts
│   │   ├── guards/
│   │   │   └── auth.guard.ts
│   │   ├── models/
│   │   └── utils/
│   │
│   ├── shared/                  # Reutilizable en toda la app
│   │   ├── components/
│   │   │   ├── button/
│   │   │   └── modal/
│   │   ├── directives/
│   │   └── pipes/
│   │
│   ├── features/
│   │   ├── auth/
│   │   │   ├── pages/
│   │   │   │   └── login/
│   │   │   ├── services/
│   │   │   ├── models/
│   │   │   └── auth.routes.ts
│   │   │
│   │   ├── dashboard/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   ├── models/
│   │   │   └── dashboard.routes.ts
│   │   │
│   │   └── users/
│   │       ├── pages/
│   │       ├── services/
│   │       ├── models/
│   │       └── users.routes.ts
│   │
│   ├── app.routes.ts            # Rutas principales
│   ├── app.config.ts            # Config standalone
│   └── app.component.ts
│
├── assets/
│   ├── images/
│   └── icons/
│
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
│
├── index.html
├── main.ts
└── styles.scss
```
