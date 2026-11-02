import React from 'react';
/**
 * Colour module: palette swatches read live from the CSS tokens (so the page can never drift
 * from colors.css) + a WCAG contrast checker over the same palette.
 * - Each token is resolved to hex by painting it on a 1×1 canvas: that also normalises the
 *   oklch() status colours.
 * - Clicking a swatch copies its hex (with a COPIED confirmation).
 */
const GROUPS = {
  surface: ['--bg-0', '--bg-1', '--bg-2', '--bg-dark', '--bg-dark-2'],
  ink: ['--ink-900', '--ink-600', '--ink-400', '--ink-inverse', '--ink-inverse-dim'],
  line: ['--line-strong', '--line', '--line-faint'],
  accent: ['--accent', '--accent-ink', '--accent-tint'],
  status: ['--status-active', '--status-moderate', '--status-alert', '--status-off'],
};
const FG = ['--ink-900', '--ink-600', '--ink-400', '--accent', '--accent-ink', '--ink-inverse'];
const BG = ['--bg-0', '--bg-1', '--bg-2', '--accent-tint', '--bg-dark'];
const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' };

function useTokenColors(tokens) {
  const [hex, setHex] = React.useState({});
  React.useEffect(() => {
    const ctx = Object.assign(document.createElement('canvas'), { width: 1, height: 1 }).getContext('2d', { willReadFrequently: true });
    const css = getComputedStyle(document.documentElement);
    const out = {};
    for (const tk of tokens) {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = '#000';
      ctx.fillStyle = css.getPropertyValue(tk).trim();
      ctx.fillRect(0, 0, 1, 1);
      const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
      out[tk] = '#' + [r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('').toUpperCase();
    }
    setHex(out);
  }, []);
  return hex;
}

// WCAG 2.x relative luminance and contrast ratio.
const lum = (h) => {
  const c = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };

function Swatch({ tk, hex, copied, onCopy }) {
  return (
    <button type="button" onClick={() => onCopy(tk, hex)} aria-label={`${tk} ${hex}`}
      style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', padding: 0, background: 'var(--bg-1)', border: '1px solid var(--line)', cursor: 'pointer', borderRadius: 0 }}>
      <span style={{ height: 56, background: `var(${tk})`, borderBottom: '1px solid var(--line)' }} />
      <span style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 4 }}>
        <span style={{ ...L, textTransform: 'none', color: 'var(--ink-900)' }}>{tk}</span>
        <span style={{ font: 'var(--text-caption)', color: copied ? 'var(--accent-ink)' : 'var(--ink-600)' }}>{copied || hex || '—'}</span>
      </span>
    </button>
  );
}

function Picker({ label, tokens, value, onChange, hex }) {
  return (
    <div role="radiogroup" aria-label={label} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <span style={{ ...L, color: 'var(--ink-400)' }}>{label}</span>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {tokens.map((tk) => (
          <button key={tk} type="button" role="radio" aria-checked={value === tk} aria-label={`${tk} ${hex[tk] || ''}`} title={tk} onClick={() => onChange(tk)}
            style={{ width: 32, height: 32, padding: 0, background: `var(${tk})`, border: '1px solid var(--line)', outline: value === tk ? '2px solid var(--accent-ink)' : 'none', outlineOffset: 2, cursor: 'pointer', borderRadius: 0 }} />
        ))}
      </div>
    </div>
  );
}

const Badge = ({ name, pass }) => (
  <span style={{ ...L, display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 8px', border: '1px solid ' + (pass ? 'var(--accent)' : 'var(--status-alert)'), color: pass ? 'var(--accent-ink)' : 'var(--status-alert-ink)' }}>
    {name} {pass ? 'PASS' : 'FAIL'}
  </span>
);

export function ColorModule({ t }) {
  const all = [...new Set([...Object.values(GROUPS).flat(), ...FG, ...BG])];
  const hex = useTokenColors(all);
  const [copied, setCopied] = React.useState(null);
  const [fg, setFg] = React.useState('--accent');
  const [bg, setBg] = React.useState('--bg-0');
  const copy = (tk, h) => {
    navigator.clipboard?.writeText(h).catch(() => {});
    setCopied(tk);
    setTimeout(() => setCopied((c) => (c === tk ? null : c)), 1200);
  };
  const r = hex[fg] && hex[bg] ? ratio(hex[fg], hex[bg]) : null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
      {Object.entries(GROUPS).map(([g, tokens]) => (
        <div key={g}>
          <div style={{ ...L, color: 'var(--ink-400)', marginBottom: 12 }}>{t.groups[g]} / {String(tokens.length).padStart(2, '0')}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: 12 }}>
            {tokens.map((tk) => <Swatch key={tk} tk={tk} hex={hex[tk]} copied={copied === tk && t.copied} onCopy={copy} />)}
          </div>
        </div>
      ))}

      <div style={{ borderTop: '1px solid var(--line)', paddingTop: 28 }}>
        <h3 style={{ margin: 0, font: 'var(--text-h5)', color: 'var(--ink-900)' }}>{t.checker.heading}</h3>
        <p style={{ margin: '8px 0 0', font: 'var(--text-body-sm)', color: 'var(--ink-600)', maxWidth: 'var(--reading-max)' }}>{t.checker.body}</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 24, marginTop: 20, alignItems: 'stretch' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <Picker label={t.checker.fg} tokens={FG} value={fg} onChange={setFg} hex={hex} />
            <Picker label={t.checker.bg} tokens={BG} value={bg} onChange={setBg} hex={hex} />
          </div>
          <div style={{ background: `var(${bg})`, color: `var(${fg})`, border: '1px solid var(--line)', padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <span style={{ ...L, textTransform: 'none', color: 'inherit', opacity: 0.85 }}>{fg} / {bg}</span>
            <span style={{ font: 'var(--text-h4)' }}>{t.checker.sample}</span>
            <span style={{ font: 'var(--text-body-sm)' }}>{t.checker.sample}</span>
          </div>
        </div>
        <div aria-live="polite" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px 16px', marginTop: 16 }}>
          <span style={{ font: 'var(--text-data-lg)', color: 'var(--ink-900)' }}>{r ? r.toFixed(2) : '—'}:1</span>
          {r && <>
            <Badge name={'AA · ' + t.checker.normal} pass={r >= 4.5} />
            <Badge name={'AA · ' + t.checker.large} pass={r >= 3} />
            <Badge name="AAA" pass={r >= 7} />
          </>}
        </div>
      </div>
    </div>
  );
}
