# Sitio Web Webcam Colombia - Julieth

Sitio web completo con panel admin para modelo webcam colombiana, con restricción geográfica, múltiples idiomas, suscripciones, regalos y mucho más.

## Características

- **Diseño profesional y sensual** - Colores cálidos, glassmorphism, dark mode
- **Restricción geográfica** - Solo acceso desde Colombia
- **Multi-idioma** - Español, Inglés, Portugués
- **Sistema de autenticación** - NextAuth.js con roles (usuario, suscriptor, admin)
- **Panel de administración** - Dashboard completo para gestionar usuarios, mensajes, regalos
- **Sistema de suscripciones** - Integración con Stripe
- **Sistema de regalos** - Pagos con Stripe para regalos a la modelo
- **Transmisión en vivo** - Página de live con chat
- **Galería** - Galería de fotos/videos
- **Responsive** - Mobile-first design
- **TypeScript + Next.js 16** - Tecnologías modernas

## Stack Tecnológico

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Base de datos**: [SQLite](https://www.sqlite.org/) + [Prisma ORM](https://www.prisma.io/)
- **Autenticación**: [NextAuth.js](https://next-auth.js.org/)
- **Pagos**: [Stripe](https://stripe.com/)
- **i18n**: [i18next](https://www.i18next.com/)
- **Geolocalización**: [geoip-lite](https://github.com/geoip-lite/node-geoip)

## Instalación

### 1. Clonar el repositorio
```bash
git clone <url-del-repo>
cd webcam-colombia
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Copia `.env.example` a `.env` y configura las variables:
```bash
cp .env.example .env
```

Genera un secret para NextAuth:
```bash
openssl rand -base64 32
```

### 4. Configurar base de datos
```bash
npx prisma generate
npx prisma db push
```

### 5. Iniciar servidor de desarrollo
```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Panel de Administración

Para crear un usuario administrador, puedes hacerlo directamente en la base de datos o registrar un usuario y actualizar su rol a `admin` en la tabla `User`.

### Cuentas de demo
- Admin: `admin@julieth.com` / `admin123`
- Usuario: `user@example.com` / `user123`

## Configuración de Stripe

1. Crea una cuenta en [Stripe](https://stripe.com/)
2. Obtén las claves en el dashboard de desarrolladores
3. Configura los productos y precios
4. Configura el webhook en `http://tu-dominio.com/api/stripe-webhook`

## Despliegue

### Vercel (Recomendado)
1. Sube el código a GitHub
2. Importa el proyecto en [Vercel](https://vercel.com/)
3. Configura las variables de entorno
4. Despliega

### Otros proveedores
Necesitarás una base de datos PostgreSQL en producción. Cambia `DATABASE_URL` y ajusta el schema si es necesario.

## Restricción Geográfica

El sitio verifica la IP del visitante usando `geoip-lite`. Solo permite acceso desde Colombia (`CO`). Si alguien desde otro país intenta acceder, será redirigido a la página de bloqueo.

## Licencia

Este proyecto es solo para uso educativo/demostrativo.

## Soporte

Para dudas o soporte, contacta al desarrollador.
