# Design system — import status

Source: Claude Design project **"Design system delivery review"**
`projectId b8df3dc2-1f64-40bb-93fa-2edb56c24e60` (owner: Juan, canEdit).

Read remote files with the **DesignSync** MCP tool (`get_file` / `list_files`) or the
`/design-sync` skill. `get_file` pulls content into the agent context, so we import
**incrementally, one component at a time** as we port it — never a wholesale dump.

## Imported (live in this repo)
| Remote path | Local path | Notes |
|---|---|---|
| `tokens/colors.css` | `src/styles/tokens/colors.css` | live foundation |
| `tokens/typography.css` | `src/styles/tokens/typography.css` | live foundation (Google Fonts @import) |
| `tokens/spacing.css` | `src/styles/tokens/spacing.css` | live foundation |
| `tokens/effects.css` | `src/styles/tokens/effects.css` | live foundation |
| `styles.css` | `src/styles/global.css` | rewritten: token @imports + base resets |
| `assets/logo-color.svg` | `public/logos/logo-color.svg` | ink + mint |
| `assets/logo-ink.svg` | `public/logos/logo-ink.svg` | all ink |
| `assets/logo-mint.svg` | `public/logos/logo-mint.svg` | all mint |
| `assets/logo-white.svg` | `public/logos/logo-white.svg` | for dark blocks |
| `assets/foto-perfil.png` | `public/foto-perfil.jpg` | real photo (added manually, 2320×3088 → cover-cropped 440×520 JPEG q85, 40KB) |
| `readme.md` | `src/design-system/README.md` | brand guidelines |
| `SKILL.md` | `src/design-system/SKILL.md` | skill entry point |
| `ui_kits/landing/index.html` | `src/design-system/reference/landing.html` | **port target** (reference only) |

## Ported to `src/components/` (used by the landing island)
Clean `import React … export function …` modules, reused verbatim via @astrojs/react.
Composed by `src/components/PortfolioLanding.jsx` (client:load island).

- **core/** — `Button`, `LiveDataWidget`
- **hud/** — `Crosshair`, `CoordLabel`, `StatusIndicator`, `DotField`
- **navigation/** — `Navbar` (scroll-aware, ESP|ENG switch, `onNavigate` scrolls to sections), `Footer`
- **work/** — `ProjectCard`
- **sections/** — `AboutSection` (framed photo + experience REC cards), `ContactSection`
  (inverse block, prototype form → local "sent" state, no backend yet)
- **modules/** (case studies, used by `CaseStudyPage.jsx` → `/work/<slug>`) — `CaseHero`,
  `ProcessTimeline` verbatim (`CaseHero` since restyled: top strip + meta row are inverse
  `--bg-dark` blocks with light text). Local extensions, backwards-compatible (defaults = remote behaviour):
  `ProblemStatement` (+`label` to reuse it for role / IA / decisions, +`extra` full-width slot;
  **layout changed**: left label rail → header row + left-aligned content, matching the other modules),
  `BeforeAfter` (+`beforeContent`/`afterContent` slots for schematics instead of images),
  `MetricsBlock` (+`source`, header provenance label; default `VERIFIED`).
  **Not pushed back to Claude Design yet.**

Local-only (not in the DS):
- Case shell: `case/CaseLayout` (Navbar + back link + CaseHero + CTA + Footer, body as
  `children(t, lang)`), `case/Body` (paragraphs from content data), `case/ModuleSection`
  (full-width module header for interactives/tables). One island per case in `cases/`
  (`IngCase`, `PiscilonaCase`), content in `src/content/work/<slug>.ts`.
- Schematics (confidential projects): `case/HomeSchematic`, `case/PathSchematic`.
- Interactives (Piscilona): `case/SheetFormMap` (paper sheet ↔ web form linked fields),
  `case/BudgetSimulator` (4-step playable quote, validated inputs, fictitious rates),
  `case/TimeCompare` (animated before/after time bars), `case/UsabilityTable`.
- Shared card pieces: `case/HoverCard` (mint tint + green corner brackets, neutral border),
  `case/KeyFactCards` (label + big figure + text; 4 cards → 2×2), `case/FlowSteps` (vertical
  spec-sheet flow with rails).
- Interactives (Intrabuddy): `case/SearchRace` (without vs with agent, relative time scale),
  `case/ImpactCalculator` (business projection labelled ESTIMATE, formula shown live),
  `case/TeamTree` (team org chart).
- `lib/useLang` (ESP|ENG shared across pages via localStorage), `lib/nav` (nav label → section).

## Pending — pull when porting (React ESM, reuse via @astrojs/react)
Each remote component has `.jsx` + `.d.ts` (types) + `.prompt.md` (usage).

- **core/** — `Tag`
- **hud/** — `CornerFrame`, `ProgressBar`
- **modules/** — `QuoteBlock`, `Gallery` (skipped for the ING case: no real quote, no screens)
- **guidelines/** — 9 spec HTML cards (colors, type, grid, spacing, mobile, brand-logos)
- **uploads/** — wireframes (`Hero.png`, `work.png`) + moodboards + navbar SVGs.
  Binary refs only, NOT production assets — skipped intentionally.

## Landing composition (what the port must reproduce)
`Navbar` (active=Work, ESP|ENG switch, scroll-aware) → hero `<section>` (DotField right 46%,
Crosshair + LAT/LON coords, StatusIndicator, h1, intro, Button ×2, coord stats row) →
`#work` section (INDEX labels, h2, ProjectCard grid ×2) → `#about` (`AboutSection`) →
`#contact` (`ContactSection`) → `Footer`. Bilingual ESP/ENG, default ESP.
