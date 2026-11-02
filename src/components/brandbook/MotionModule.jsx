import React from 'react';
import { HoverCard } from '../case/HoverCard.jsx';
/**
 * Motion module: one Play button runs the same move with three curves side by side (system
 * ease-hud vs linear vs a forbidden bounce), then the system's own patterns live (status blink,
 * bracket hover, 1px press). Playing is user-initiated, so it runs even with reduced motion; the
 * blink respects prefers-reduced-motion.
 */
const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' };
const TIMING = {
  hud: '240ms cubic-bezier(0.2, 0, 0, 1)',
  linear: '240ms linear',
  bounce: '600ms cubic-bezier(0.34, 1.8, 0.64, 1)',
};
const VERDICT_COLOR = { SYSTEM: ['var(--accent)', 'var(--accent-ink)'], AVOID: ['var(--status-moderate)', 'var(--status-moderate-ink)'], FORBIDDEN: ['var(--status-alert)', 'var(--status-alert-ink)'] };

export function MotionModule({ t }) {
  const [end, setEnd] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
      <div style={{ border: '1px solid var(--line-strong)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: '1px solid var(--line-strong)' }}>
          <span style={{ ...L, color: 'var(--ink-400)' }}>CURVES / 03</span>
          <button type="button" onClick={() => setEnd((e) => !e)}
            style={{ ...L, padding: '10px 16px', border: 0, borderRadius: 0, cursor: 'pointer', background: 'var(--accent)', color: 'var(--ink-900)' }}>{t.play} {'→'}</button>
        </div>
        {t.curves.map((c) => {
          const [line, ink] = VERDICT_COLOR[c.verdict];
          return (
            <div key={c.id} style={{ padding: '16px', borderBottom: '1px solid var(--line-faint)', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '4px 12px' }}>
                <span style={{ ...L, textTransform: 'none', color: 'var(--ink-900)' }}>{c.name}</span>
                <span style={{ ...L, color: ink }}>{c.verdict}</span>
              </div>
              <div style={{ position: 'relative', height: 24, borderBottom: '1px dashed var(--line)' }}>
                <span style={{ position: 'absolute', top: 2, left: end ? 'calc(100% - 20px)' : 0, width: 20, height: 20, background: line, transition: 'left ' + TIMING[c.id] }} />
              </div>
              <span style={{ font: 'var(--text-body-sm)', color: 'var(--ink-600)' }}>{c.note}</span>
            </div>
          );
        })}
      </div>

      <div>
        <div style={{ ...L, color: 'var(--ink-400)', marginBottom: 12 }}>{t.patterns}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 16 }}>
          {t.items.map((it) => {
            const demo = {
              blink: <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, ...L, color: 'var(--ink-900)' }}><span className="jr-motion-blink" style={{ width: 8, height: 8, background: 'var(--status-active)' }} />ACTIVE</span>,
              hover: <span style={{ ...L, color: 'var(--accent-ink)' }}>HOVER ME</span>,
              press: (
                <button type="button" onPointerDown={() => setPressed(true)} onPointerUp={() => setPressed(false)} onPointerLeave={() => setPressed(false)}
                  style={{ ...L, padding: '10px 16px', borderRadius: 0, cursor: 'pointer', border: '1px solid var(--ink-900)', background: 'transparent', color: 'var(--ink-900)', transform: pressed ? 'translateY(1px)' : 'none', transition: 'transform var(--dur-fast) var(--ease-hud)' }}>PRESS</button>
              ),
            }[it.id];
            const body = (
              <>
                <div style={{ height: 56, display: 'grid', placeItems: 'center', border: '1px dashed var(--line)', marginBottom: 14 }}>{demo}</div>
                <div style={{ font: 'var(--text-h6)', color: 'var(--ink-900)' }}>{it.name}</div>
                <div style={{ font: 'var(--text-body-sm)', color: 'var(--ink-600)', marginTop: 4 }}>{it.note}</div>
              </>
            );
            return it.id === 'hover'
              ? <HoverCard key={it.id} style={{ padding: 16 }}>{body}</HoverCard>
              : <div key={it.id} style={{ padding: 16, background: 'var(--bg-1)', border: '1px solid var(--line)' }}>{body}</div>;
          })}
        </div>
      </div>
      <style>{'@keyframes jr-blink{to{visibility:hidden}}.jr-motion-blink{animation:jr-blink 1.2s steps(2,start) infinite}@media(prefers-reduced-motion:reduce){.jr-motion-blink{animation:none}}'}</style>
    </div>
  );
}
