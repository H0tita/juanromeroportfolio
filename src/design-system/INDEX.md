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
| `readme.md` | `src/design-system/README.md` | brand guidelines |
| `SKILL.md` | `src/design-system/SKILL.md` | skill entry point |
| `ui_kits/landing/index.html` | `src/design-system/reference/landing.html` | **port target** (reference only) |

## Ported to `src/components/` (used by the landing island)
Clean `import React … export function …` modules, reused verbatim via @astrojs/react.
Composed by `src/components/PortfolioLanding.jsx` (client:load island).

- **core/** — `Button`, `LiveDataWidget`
- **hud/** — `Crosshair`, `CoordLabel`, `StatusIndicator`, `DotField`
- **navigation/** — `Navbar` (scroll-aware, ESP|ENG switch), `Footer`
- **work/** — `ProjectCard`

## Pending — pull when porting (React ESM, reuse via @astrojs/react)
Each remote component has `.jsx` + `.d.ts` (types) + `.prompt.md` (usage).

- **core/** — `Tag`
- **hud/** — `CornerFrame`, `ProgressBar`
- **modules/** (case studies) — `CaseHero`, `ProblemStatement`, `ProcessTimeline`, `MetricsBlock`, `BeforeAfter`, `QuoteBlock`, `Gallery`
- **guidelines/** — 9 spec HTML cards (colors, type, grid, spacing, mobile, brand-logos)
- **uploads/** — wireframes (`Hero.png`, `work.png`) + moodboards + navbar SVGs.
  Binary refs only, NOT production assets — skipped intentionally.

## Landing composition (what the port must reproduce)
`Navbar` (active=Work, ESP|ENG switch, scroll-aware) → hero `<section>` (DotField right 46%,
Crosshair + LAT/LON coords, StatusIndicator, h1, intro, Button ×2, coord stats row) →
`#work` section (INDEX labels, h2, ProjectCard grid ×2) → `Footer`. Bilingual ESP/ENG,
default ESP.
