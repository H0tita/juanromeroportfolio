# JR Portfolio — Agent guide

> `CLAUDE.md` es un symlink a este archivo (convención del scaffold de Astro).

Portfolio personal de **Juan Romero** (Product Design · Tech · Business). Objetivo: que el
propio portfolio sea la prueba de seniority. Estética **Tactical Telemetry UI / Industrial FUI
Minimal, en LIGHT MODE** (tinta verde-negra + menta #48B59A sobre papel mint claro).

## Stack
- **Astro 7** (`astro`), output estático. Cero JS por defecto.
- **@astrojs/react** — los componentes del design system son React (ESM) y se reutilizan como
  islands; se hidrata solo lo interactivo (`client:*`).
- TypeScript strict.

## Comandos
- `npm run dev` — servidor de desarrollo (localhost:4321).
- `npm run build` — build de producción a `dist/`.
- `npm run preview` — sirve el build.
- Dev en background: `astro dev --background`; gestionar con `astro dev stop|status|logs`.

## Estructura
```
src/
  styles/
    tokens/{colors,typography,spacing,effects}.css   # tokens del DS (fuente viva)
    global.css                                       # @import tokens + resets base
  layouts/Base.astro                                 # shell HTML + global.css
  pages/index.astro                                  # landing (placeholder -> se construye)
  design-system/                                     # copia de referencia del DS importado
    README.md  SKILL.md  INDEX.md                    # guias + estado de importacion
    reference/landing.html                           # objetivo a portar (solo referencia)
    components/<group>/                              # .jsx portados incrementalmente
public/logos/logo-{color,ink,mint,white}.svg          # monograma JR + sparkle
```

## Design system (fuente de verdad)
Proyecto Claude Design **"Design system delivery review"**,
`projectId b8df3dc2-1f64-40bb-93fa-2edb56c24e60`. Se lee/actualiza con la herramienta MCP
**DesignSync** (`get_file` / `list_files`) o `/design-sync`.

- **Importación incremental:** `get_file` trae cada archivo al contexto del agente, así que se
  importa **un componente cada vez, al portarlo** — nunca un volcado masivo. Estado y
  pendientes en `src/design-system/INDEX.md`.
- **Regla de oro:** cada pantalla mezcla capa **HUD** (Space Mono, micro-labels, brackets, dot
  lattice, menta) + capa **editorial** (Archivo, 17px+/1.65, 68ch). Nunca 100% de una sola.
- Esquinas cuadradas (`--radius-0`), bordes 1px, sin sombras salvo popovers. Bilingüe ESP/ENG
  (default ESP); micro-labels HUD siempre en inglés técnico. Sin emoji.

## Deploy
- **GitHub:** cuenta lista. `gh` CLI **no instalada** aún → instalar o usar git + HTTPS.
- **Dominio:** ya en un portfolio activo en Framer. **NO tocar DNS** hasta que el sitio nuevo
  esté verificado en su hosting.
- **Hosting:** por decidir cerca del deploy.

## Documentación Astro
Full docs: https://docs.astro.build — routing, componentes Astro, framework components (React),
content collections, estilos, i18n.
