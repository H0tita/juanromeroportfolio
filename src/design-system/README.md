# JR — Portfolio Design System
**Juan Romero — Product Design · Tech · Business**

> Imported reference copy of the Claude Design project **"Design system delivery review"**
> (`projectId b8df3dc2-1f64-40bb-93fa-2edb56c24e60`). Source of truth lives in Claude Design;
> pull updates with the DesignSync MCP tool / `/design-sync`. See `INDEX.md` for import status.

Personal portfolio design system for a hybrid UX/UI designer (UX + Tech + Business), aimed at recruiters and industry peers. The portfolio itself is the proof of seniority: it must read as an experience a junior could not build.

**Aesthetic: Tactical Telemetry UI / Industrial FUI Minimal, in LIGHT MODE.** Sci-fi HUD and control-panel language (explicit grids, corner brackets, crosshairs, coordinates, console micro-labels, live data) reinterpreted as a printed engineering drawing / lab spec sheet: dark ink + mint green on light paper — never phosphor-on-black.

## The two-layer rule (golden rule)
Every screen combines two coexisting layers — neither may take 100% of a screen:
1. **HUD layer** (decorative/spectacle): visible grid, corner brackets, crosshairs, coordinates, status indicators, live data, Space Mono micro-labels. Used at impact moments: hero, section headers, project cards, transitions.
2. **Editorial layer** (legible): Archivo, generous line-height, wide whitespace. Used for long text: case study body, blog, about.

## CONTENT FUNDAMENTALS
- **Tone: técnico-seco (console-dry).** HUD labels read like system output: `SYS.STATUS`, `REC.001`, `LAT 40.4168 / LON -3.7038`, `CASE STUDY`, `VIEW PROJECT`, `MOD.03 — METRICS`. Always uppercase, Space Mono, letter-spacing 0.14em.
- **Bilingual ES/EN** with an ESP | ENG switcher (navbar). Editorial copy is written per-language; HUD micro-labels stay in English tech-abbreviation style in both languages (industry convention).
- Editorial voice: first person, direct, confident, no fluff. Short sentences. Business impact stated with numbers.
- Numbers are content: dates, coordinates, versions, percentages are formatted as telemetry (`40.4168°N`, `V2.1`, `+34%`).
- **No emoji, ever.** No exclamation marks in HUD copy.
- Naming convention for artifacts: `JR.{SECTION}.{NNN}` (e.g. `JR.WORK.001`).

## VISUAL FOUNDATIONS
- **Color:** light mint-tinted paper (`--bg-0` #EFF4F1) with 3 surface levels; near-black green ink (#0E1F19); validated mint accent **#48B59A**; `--accent-ink` #257A64 for AA accent text. Status family (ACTIVE / MODERATE / ALERT / DISABLED) shares oklch lightness+chroma with the accent, hue varies. Dark blocks (#0E1F19) appear only as INVERSE moments (top utility bar, footer) — quotes from the dark references, never full screens.
- **Type:** Space Mono = HUD (labels, coordinates, metadata, buttons, big index numbers). Archivo = editorial (headings + body). Full scale in `tokens/typography.css`. Editorial body ≥17px, line-height 1.65, max-width 68ch.
- **Grid is visible content:** dot lattice (`--dot-grid`, 22px pitch) as texture fields; 1px hairlines separate regions; 12-col / 24px gutter / 64px page margin (40px tablet, 20px mobile). Breakpoints 480/768/1024/1440.
- **Corners: square.** `--radius-0` everywhere. Depth via surface levels + hairlines, NOT soft shadows (shadow only on popovers).
- **Borders:** 1px. Structural = ink (`--line-strong`); default rules = `--line`; lattice = `--line-faint`.
- **Hover:** background shifts to `--accent-tint` or ink inverts (dark block ↔ light); underline-grow on links; `--dur-fast` 120ms, easing `--ease-hud`. Press: translate 1px down, no scale.
- **Active nav state:** mint block underline/fill (from navbar_02 prototype).
- **Animation:** utilitarian — blinking status dots (1.2s steps), progress bars, count-up numbers, scanline reveals. No bounces, no parallax. Durations 120/240ms.
- **Imagery:** project shots sit in bracketed frames with coordinate captions; duotone/desaturated treatment preferred. Use `<image-slot>`-style placeholders until real shots exist.
- **Cards:** `--bg-1` surface, `--border-rule`, corner brackets on hover, metadata strip in Space Mono.

## ICONOGRAPHY
No icon font. The system uses a small geometric HUD glyph set (crosshair ✚, diagonal cross, corner brackets, parametric squares, 4-point sparkle from the logo, arrows) drawn as 1–1.5px stroke inline SVGs inside components — all primitive geometry (lines, rects, circles). Social glyphs (LinkedIn, mail) come from the user's navbar SVG. Unicode arrows (↗ →) are acceptable inside Space Mono labels. Never emoji.

## Mobile
Simplified HUD: hide coordinate/metadata chrome below 768px, keep dot lattice, brackets, mint accent and mono labels on key elements. Hit targets ≥44px.
