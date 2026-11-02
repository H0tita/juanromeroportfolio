import React from 'react';
/**
 * Two-layer rule demo: one slider sets the HUD share (0–100) of a specimen card. HUD pieces
 * (lattice, brackets, labels, coordinates, status, crosshair) switch on as the share grows, while
 * the editorial pieces (readable heading and paragraph) fade and finally get covered. Both
 * extremes report an ALERT, the middle reads NOMINAL.
 */
const HUD_PIECES = ['lattice', 'labels', 'brackets', 'status', 'coords', 'cross'];
const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' };

export function GoldenRule({ t }) {
  const [hud, setHud] = React.useState(45);
  const on = (k) => HUD_PIECES.indexOf(k) < Math.round((hud / 100) * HUD_PIECES.length);
  const state = hud < 15 ? 'low' : hud > 85 ? 'high' : 'ok';
  const alert = state !== 'ok';
  const edit = Math.max(0, Math.min(1, (100 - hud) / 50)); // editorial legibility: 1 until 50 %, then fades
  const fade = (k) => ({ opacity: on(k) ? 1 : 0, transition: 'opacity var(--dur-med) var(--ease-hud)' });
  const bracket = (pos) => (
    <span aria-hidden="true" style={{ position: 'absolute', width: 16, height: 16, ...pos, borderColor: 'var(--accent)', borderStyle: 'solid', borderWidth: 0, ...fade('brackets'),
      ...(pos.top != null && pos.left != null && { borderTopWidth: 2, borderLeftWidth: 2 }),
      ...(pos.top != null && pos.right != null && { borderTopWidth: 2, borderRightWidth: 2 }),
      ...(pos.bottom != null && pos.left != null && { borderBottomWidth: 2, borderLeftWidth: 2 }),
      ...(pos.bottom != null && pos.right != null && { borderBottomWidth: 2, borderRightWidth: 2 }) }} />
  );
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 32, alignItems: 'start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 12px', justifyContent: 'space-between', ...L, color: 'var(--ink-400)' }}>
            <span>{t.slider}</span><span style={{ color: 'var(--ink-900)', whiteSpace: 'nowrap' }}>HUD {hud}% / ED {100 - hud}%</span>
          </span>
          <input type="range" min="0" max="100" value={hud} onChange={(e) => setHud(+e.target.value)} className="jr-range" aria-valuetext={`HUD ${hud}%, editorial ${100 - hud}%`} />
          <span style={{ display: 'flex', justifyContent: 'space-between', ...L, fontSize: 10, color: 'var(--ink-400)' }}><span>EDITORIAL</span><span>HUD</span></span>
        </label>
        <div role="status" style={{ border: '1px solid ' + (alert ? 'var(--status-alert)' : 'var(--line)'), background: 'var(--bg-1)', padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={{ ...L, display: 'flex', alignItems: 'center', gap: 8, color: alert ? 'var(--status-alert-ink)' : 'var(--accent-ink)' }}>
            <span style={{ width: 8, height: 8, background: alert ? 'var(--status-alert)' : 'var(--status-active)' }} />
            {alert ? 'ALERT / RULE BROKEN' : 'NOMINAL / RULE OK'}
          </span>
          <span style={{ font: 'var(--text-body-sm)', color: 'var(--ink-600)' }}>{t.states[state]}</span>
        </div>
      </div>

      <div aria-hidden="true" style={{ position: 'relative', minHeight: 260, padding: 28, background: 'var(--bg-1)', border: '1px solid var(--line)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, var(--line) 1.5px, transparent 1.5px)', backgroundSize: hud > 85 ? '11px 11px' : '22px 22px', ...fade('lattice') }} />
        {bracket({ top: 8, left: 8 })}{bracket({ top: 8, right: 8 })}{bracket({ bottom: 8, left: 8 })}{bracket({ bottom: 8, right: 8 })}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', gap: 12, ...L, fontSize: 10, color: 'var(--accent-ink)', ...fade('labels') }}>
          <span>JR.WORK.002 / CASE STUDY</span><span>MOD.01</span>
        </div>
        <div style={{ position: 'relative', marginTop: 24, opacity: edit, filter: `blur(${(1 - edit) * 3}px)`, transition: 'opacity var(--dur-med), filter var(--dur-med)' }}>
          <div style={{ font: 'var(--text-h4)', color: 'var(--ink-900)', ...(hud > 70 && { fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.14em', fontSize: 18 }) }}>{t.specimen.title}</div>
          <p style={{ margin: '10px 0 0', font: 'var(--text-body)', color: 'var(--ink-600)', maxWidth: '44ch', ...(hud > 70 && { fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase' }) }}>{t.specimen.text}</p>
        </div>
        <div style={{ position: 'relative', marginTop: 24, display: 'flex', flexWrap: 'wrap', gap: '8px 20px', ...L, fontSize: 10, color: 'var(--ink-400)' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--ink-900)', ...fade('status') }}><span style={{ width: 7, height: 7, background: 'var(--status-active)' }} />SHIPPED</span>
          <span style={fade('coords')}>LAT 40.4168 / LON -3.7038</span>
          <span style={fade('coords')}>SAT 60% → 85%</span>
        </div>
        <svg width="120" height="120" viewBox="0 0 120 120" style={{ position: 'absolute', right: 28, top: '38%', ...fade('cross') }}>
          <g stroke="var(--accent-ink)" strokeWidth="1" fill="none"><circle cx="60" cy="60" r="40" /><circle cx="60" cy="60" r="18" /><line x1="60" y1="0" x2="60" y2="120" /><line x1="0" y1="60" x2="120" y2="60" /></g>
        </svg>
        {hud > 85 && (
          <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', alignContent: 'space-around', padding: 20, gap: 8, ...L, fontSize: 9, color: 'var(--accent-ink)', background: 'rgba(239,244,241,0.55)' }}>
            {['SYS.0x4F', 'REC.009', 'V2.1', 'NODE 12', 'Δ +0.04', 'BUF 88%', 'CH.03', 'T-00:12', 'SCAN', 'GRID 22', 'LOCK', 'PING 14ms'].map((s) => <span key={s}>{s}</span>)}
          </div>
        )}
      </div>
    </div>
  );
}
