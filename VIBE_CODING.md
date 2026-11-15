# Proceso de Vibe Coding

IA utilizada como copiloto: **Claude** (Anthropic).

Cada iteración registra: el prompt, lo que generó la IA, lo que corregí o revisé yo y la decisión técnica. Las entradas marcadas ✏️ las completo con mis propias observaciones.

## Iteración 0: concepción del proyecto

**Prompt:** pegué el enunciado completo del caso de estudio y pedí ayuda para planificarlo.

**Resultado de la IA:** propuso un catálogo de ropa de bebé con pedidos por Instagram, un mapa de requisitos a rutas/componentes y un orden de trabajo con un commit por paso.

**Decisión técnica:**
- Tema: catálogo de una tienda real de ropa para bebé.
- Datos locales en `lib/productos.ts` expuestos mediante un Route Handler, en lugar de una base de datos, porque son pocos productos.

✏️ _Por qué elegí este tema:_

## Iteración 1: creación del proyecto

**Prompt:** "¿cómo hago el create-next-app?"

**Resultado de la IA:** comandos de `create-next-app` y respuestas recomendadas (TypeScript, Tailwind, App Router).

**Desafío:** PowerShell bloqueó `npx` con el error "running scripts is disabled on this system", y por eso la carpeta del proyecto no se creó.

**Solución:** la IA identificó que era la política de ejecución de PowerShell. Ejecuté `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned` y repetí el comando.

## Iteración 2: layout, navbar, footer y paleta

**Prompt:** pedí el layout general con navbar responsive, footer y paleta de colores.

**Resultado de la IA:** `layout.tsx`, `Navbar` (Client Component con menú móvil con `useState`), `Footer` y colores en `globals.css` con `@theme` de Tailwind v4.

**Revisión:** la terminal mostró "Cache Components enabled" en Next 16, lo que cambia cómo se debe escribir el código.

**Decisión técnica:** quitar `new Date().getFullYear()` del Footer, porque con Cache Components leer la hora en un Server Component durante el prerender produce un error.

## Iteración 3: catálogo, API, carrito y páginas

**Prompt:** pedí construir el catálogo completo para abrirlo y probarlo.

**Resultado de la IA:** Route Handler `/api/productos`, `/catalogo` con filtros y búsqueda, detalle `/catalogo/[id]`, carrito en `localStorage`, `/como-pedir`, `/contacto`, `loading.tsx` y `error.tsx`.

**Decisiones técnicas:**
- El catálogo (Client Component) consume `/api/productos` con `useEffect`, con estados de carga, error y reintento.
- La página de detalle es un Server Component con `generateStaticParams`.
- El carrito usa `useSyncExternalStore` sobre `localStorage` para evitar errores de hidratación.
- Instagram no permite pre-llenar mensajes, así que el botón copia el pedido y abre el chat (`ig.me/m/usuario`).

**Revisión:** ✏️ _errores que encontré al probarlo y cómo los resolví:_

## Iteración 4: despliegue

✏️ _Pasos en Vercel, variables de entorno y problemas encontrados:_

## Reflexión

✏️ _Qué funcionó bien con la IA, qué tuve que corregir yo y qué haría distinto:_
