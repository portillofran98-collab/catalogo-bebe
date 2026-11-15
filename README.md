# My First Steps Baby Clothes: catálogo online

Catálogo web de una tienda de ropa para bebé. Los clientes eligen productos y talla, arman un carrito y envían el pedido por Instagram.

Proyecto del caso de estudio de **Vibe Coding** con Next.js, desarrollado con IA como copiloto. El proceso está documentado en [VIBE_CODING.md](./VIBE_CODING.md).

🔗 https://catalogo-bebe.vercel.app

## Tecnologías

- Next.js 16 (App Router) con Cache Components
- TypeScript
- Tailwind CSS v4
- Despliegue en Vercel

## Requisitos de la app que cubre

| Requisito | Dónde |
|---|---|
| 4+ rutas | `/`, `/catalogo`, `/catalogo/[id]`, `/carrito`, `/como-pedir`, `/contacto` |
| API interna (Route Handler) | `app/api/productos/route.ts` |
| Server + Client Components | Páginas y `ProductCard` en servidor. `CatalogoCliente`, `CarritoCliente`, `AgregarAlCarrito`, `Navbar` en cliente |
| `useState` / `useEffect` | `CatalogoCliente` (fetch a la API, filtros, búsqueda), `AgregarAlCarrito` |
| Loading UI | `app/catalogo/loading.tsx` y `CatalogoSkeleton` |
| Error UI | `app/error.tsx`, `app/catalogo/error.tsx`, estado de error en `CatalogoCliente` |
| Responsive | Tailwind (`grid-cols-2 md:grid-cols-4`, menú móvil) |
| Variables de entorno | `.env.local` / `.env.example` |

## Instalación

```bash
git clone https://github.com/TU_USUARIO/catalogo-bebe.git
cd catalogo-bebe
npm install
cp .env.example .env.local   # en Windows PowerShell: copy .env.example .env.local
```

Edita `.env.local` y completa `NEXT_PUBLIC_INSTAGRAM_USER`.

```bash
npm run dev
```

Abre http://localhost:3000.

## Variables de entorno

| Variable | Descripción |
|---|---|
| `NEXT_PUBLIC_INSTAGRAM_USER` | Usuario de Instagram de la tienda, sin `@` |
| `NEXT_PUBLIC_SITE_URL` | URL pública del sitio |

## Productos y fotos

- Los productos están en `lib/productos.ts`. Los que tienen `precio: null` muestran "Consultar precio".
- Las fotos van en `public/productos/` (ver `LEEME.txt` en esa carpeta).

## Despliegue en Vercel

1. Sube el repositorio a GitHub.
2. En vercel.com: **Add New → Project** e importa el repositorio.
3. En **Environment Variables** agrega las dos variables de arriba.
4. **Deploy**, y copia la URL pública en este README.
