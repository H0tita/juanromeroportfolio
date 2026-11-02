import React from 'react';
/**
 * Logo module: the JR monogram drawn inline (same paths as public/logos/*.svg) so its colours can
 * change live. Version × background gives a verdict (OK / LIMITED / MISUSE); the construction
 * toggle overlays the clear space (X = sparkle height), the 45° cut guides and the top/base lines.
 */
const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' };
const INK = '#0E1F19', MINT = '#48B59A', WHITE = '#FFFFFF';
const VERSIONS = { color: [INK, MINT], ink: [INK, INK], mint: [MINT, MINT], white: [WHITE, WHITE] };
const BGS = { paper: 'var(--bg-0)', white: 'var(--bg-2)', tint: 'var(--accent-tint)', dark: 'var(--bg-dark)' };
const VERDICT = {
  color: { paper: 'ok', white: 'ok', tint: 'ok', dark: 'misuse' },
  ink: { paper: 'ok', white: 'ok', tint: 'ok', dark: 'misuse' },
  mint: { paper: 'limited', white: 'limited', tint: 'misuse', dark: 'ok' },
  white: { paper: 'misuse', white: 'misuse', tint: 'misuse', dark: 'ok' },
};
const X = 16; // sparkle height in logo units

function Monogram({ ink, accent }) {
  return (
    <g>
      <path d="M122 36L101.5 36L101.5 26.5L72.5 26.5L60 14L116.5 14L122 19.5L122 36Z" fill={ink} />
      <path d="M135 64.5L114.5 64.5L114.5 51.4987L96.5 51.4992L84 38.9992L129.5 38.9987L135 44.4987L135 64.5Z" fill={ink} />
      <path d="M0 33H20.5V51.5H54.5L67 64H5.5L0 58.5V33Z" fill={ink} />
      <path d="M95.5 56L53.5 14H23L74 64H95.5V56Z" fill={ink} />
      <rect x="134" width="2" height="16" fill={accent} />
      <rect x="143" y="7" width="2" height="16" transform="rotate(90 143 7)" fill={accent} />
      <rect x="129" y="3" width="2" height="16" transform="rotate(-45 129 3)" fill={accent} />
      <rect x="140.313" y="1.58594" width="2" height="16" transform="rotate(45 140.313 1.58594)" fill={accent} />
    </g>
  );
}

function Segmented({ label, options, value, onChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ ...L, color: 'var(--ink-400)' }}>{label}</span>
      <div role="radiogroup" aria-label={label} style={{ display: 'inline-flex', flexWrap: 'wrap', border: '1px solid var(--line-strong)', alignSelf: 'flex-start' }}>
        {Object.entries(options).map(([k, name]) => (
          <button key={k} type="button" role="radio" aria-checked={value === k} onClick={() => onChange(k)}
            style={{ ...L, padding: '8px 12px', border: 0, borderRadius: 0, cursor: 'pointer', background: value === k ? 'var(--ink-900)' : 'transparent', color: value === k ? 'var(--ink-inverse)' : 'var(--ink-900)' }}>{name}</button>
        ))}
      </div>
    </div>
  );
}

export function LogoModule({ t }) {
  const [version, setVersion] = React.useState('color');
  const [bg, setBg] = React.useState('paper');
  const [build, setBuild] = React.useState(false);
  const verdict = VERDICT[version][bg];
  const [ink, accent] = VERSIONS[version];
  const guide = bg === 'dark' ? 'rgba(72,181,154,0.9)' : '#257A64';
  const tone = { ok: ['var(--status-active)', 'var(--accent-ink)', 'OK'], limited: ['var(--status-moderate)', 'var(--status-moderate-ink)', 'LIMITED'], misuse: ['var(--status-alert)', 'var(--status-alert-ink)', 'MISUSE'] }[verdict];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 24, alignItems: 'start' }}>
      <div style={{ position: 'relative', background: BGS[bg], border: '1px solid var(--line)', aspectRatio: '4/3', display: 'grid', placeItems: 'center', transition: 'background var(--dur-med) var(--ease-hud)' }}>
        <svg viewBox={`${-X - 6} ${-X - 6} ${143 + 2 * X + 12} ${64.5 + 2 * X + 12}`} style={{ width: '78%', overflow: 'visible' }} role="img" aria-label={`JR — ${t.versions[version]} / ${t.backgrounds[bg]}`}>
          <Monogram ink={ink} accent={accent} />
          {build && (
            <g fill="none" stroke={guide} strokeWidth="0.5" aria-hidden="true">
              <rect x={-X} y={-X} width={143 + 2 * X} height={64.5 + 2 * X} strokeDasharray="2 2" />
              <rect x="0" y="0" width="143" height="64.5" />
              <line x1={-X} y1="14" x2={143 + X} y2="14" strokeDasharray="1 2" />
              <line x1={-X} y1="64" x2={143 + X} y2="64" strokeDasharray="1 2" />
              <line x1="39.5" y1="0" x2="104" y2="64.5" />
              <line x1="9" y1="0" x2="73.5" y2="64.5" />
              <line x1="72.5" y1="26.5" x2="60" y2="14" strokeWidth="1.2" />
              <circle cx="135" cy="8" r="9" />
              <g fill={guide} stroke="none" style={{ font: '700 5px var(--font-mono)' }}>
                <text x={-X + 2} y={-X + 6}>X</text>
                <text x={-X + 2} y={8}>X = {X}</text>
                <text x="100" y="72">45°</text>
              </g>
            </g>
          )}
        </svg>
        <span style={{ position: 'absolute', top: 10, left: 12, ...L, fontSize: 10, color: bg === 'dark' ? 'var(--ink-inverse-dim)' : 'var(--ink-400)' }}>FIG.LOGO / {version.toUpperCase()} ON {bg.toUpperCase()}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <Segmented label={t.version} options={t.versions} value={version} onChange={setVersion} />
        <Segmented label={t.background} options={t.backgrounds} value={bg} onChange={setBg} />
        <label style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer', ...L, color: 'var(--ink-900)' }}>
          <input type="checkbox" checked={build} onChange={(e) => setBuild(e.target.checked)} style={{ width: 16, height: 16, accentColor: 'var(--accent-ink)', margin: 0 }} />
          {t.construction}
        </label>
        <div role="status" style={{ border: '1px solid ' + tone[0], background: 'var(--bg-1)', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ ...L, display: 'flex', alignItems: 'center', gap: 8, color: tone[1] }}><span style={{ width: 8, height: 8, background: tone[0] }} />{tone[2]}</span>
          <span style={{ font: 'var(--text-body-sm)', color: 'var(--ink-600)' }}>{t.verdicts[verdict]}</span>
        </div>
        {build && (
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {t.legend.map((l) => <li key={l} style={{ font: 'var(--text-body-sm)', color: 'var(--ink-600)', display: 'flex', gap: 10 }}><span style={{ color: 'var(--accent-ink)', fontFamily: 'var(--font-mono)' }}>{'>'}</span>{l}</li>)}
          </ul>
        )}
      </div>
    </div>
  );
}
