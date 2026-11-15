# Proceso de Vibe Coding

IA utilizada como copiloto: **Claude** (Anthropic).

Cada iteración registra: el prompt, lo que generó la IA, lo que corregí o revisé yo y la decisión técnica. Las entradas marcadas ✏️ las completo con mis propias observaciones.

## Iteración 0: concepción del proyecto

**Prompt:** pegué el enunciado completo del caso de estudio y pedí ayuda para planificarlo.

**Resultado de la IA:** propuso un catálogo de ropa de bebé con pedidos por Instagram, un mapa de requisitos a rutas/componentes y un orden de trabajo con un commit por paso.

**Decisión técnica:**
- Tema: catálogo de una tienda real de ropa para bebé.
- Datos locales en `lib/productos.ts` expuestos mediante un Route Handler, en lugar de una base de datos, porque son pocos productos.

✏️ **Por qué elegí este tema:** un catálogo de ropa de bebé para una tienda que vende por Instagram es un caso real, y permite cubrir todos los requisitos (rutas, API, estado, carga/error) sin una base de datos compleja.

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

**Revisión:** **Revisión y errores al probarlo:**
- Al abrir la app seguía apareciendo la página por defecto de Next.js: los archivos generados no se habían copiado al proyecto. Lo comprobé con `dir app` y `dir lib` (no existía `lib`) y los extraje con `Expand-Archive` dentro de la carpeta correcta.
- Escribí `NEXT_PUBLIC_INSTAGRAM_USER=...` como si fuera un comando de PowerShell y dio error. Es el contenido del archivo `.env.local`, que creé con `Set-Content`.
- Entendí que `.env.example` quedaba ignorado por el `.gitignore` de Next (`.env*`), y agregué la excepción `!.env.example`.

## Iteración 4: despliegue

**Antes de desplegar:** corrí `npm run build` en local para detectar errores del build de producción. Terminó bien y listó las rutas, incluidas las páginas `/catalogo/[id]` prerenderizadas.

**Git y GitHub:**
- Ejecuté comandos de git fuera de la carpeta del proyecto y dio "not a git repository"; el comando correcto se ejecuta dentro de `catalogo-bebe`.
- Pegué dos comandos en la misma línea y el commit no se hizo; los ejecuté uno por uno.
- Usé la URL con el marcador `TU_USUARIO` en vez de mi usuario real y GitHub respondió "Repository not found"; la corregí con `git remote set-url`.
- Un `git push` fue rechazado porque había editado el README en GitHub; lo resolví con `git pull` (fast-forward).
- Los avisos "LF will be replaced by CRLF" son normales en Windows y no afectan.

**Vercel:** importé el repositorio desde GitHub, agregué las variables `NEXT_PUBLIC_INSTAGRAM_USER` y `NEXT_PUBLIC_SITE_URL` y desplegué. El primer deploy tardó 44 segundos y funcionó sin errores. URL: https://catalogo-bebe.vercel.app

## Reflexión

**Qué funcionó bien:** la IA generó rápido la estructura del proyecto (rutas, Route Handler, componentes, loading/error UI y documentación) y señaló un detalle de Next 16 (Cache Components) que habría causado un error con `new Date()` en el footer.

**Qué tuve que corregir yo:** casi todos los problemas fueron del entorno (políticas de PowerShell, rutas de carpeta, comandos de git, variables de entorno), no del código generado. Aprendí que hay que leer los mensajes de error y verificar en qué carpeta se ejecuta cada comando.

**Qué haría distinto:** hacer commits más pequeños desde el inicio, probar `npm run build` antes de cada despliegue y agregar las fotos y los precios reales de los productos.
