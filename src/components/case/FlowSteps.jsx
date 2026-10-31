import React from 'react';
import { HoverCard } from './HoverCard.jsx';
/**
 * Small vertical flow infographic in the DS spec-sheet language: each step is a card with a
 * HUD header (index + place), joined by a timeline-style rail carrying the handoff label.
 * Cards use the shared HoverCard state (mint tint + corner brackets).
 */
const M = { font: 'var(--text-micro)', letterSpacing: 'var(--tracking-micro)', textTransform: 'uppercase' };
const L = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase' };

const Step = ({ index, step }) => (
  <HoverCard>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', borderBottom: '1px solid var(--line-faint)' }}>
      <span style={{ ...L, color: 'var(--accent-ink)' }}>{String(index + 1).padStart(2, '0')}</span>
      <span style={{ ...M, color: 'var(--ink-400)' }}>{step.tag}</span>
    </div>
    <div style={{ padding: '14px 12px 16px', font: 'var(--text-h6)', color: 'var(--ink-900)' }}>{step.title}</div>
  </HoverCard>
);

const Rail = ({ label }) => (
  <div aria-hidden="true" style={{ position: 'relative', height: 52, marginLeft: 16 }}>
    <span style={{ position: 'absolute', left: 3, top: 0, bottom: 0, width: 2, background: 'var(--accent)' }} />
    <span style={{ position: 'absolute', left: 0, bottom: -4, width: 8, height: 8, background: 'var(--accent)' }} />
    {label && <span style={{ ...M, position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', color: 'var(--accent-ink)' }}>{'↓'} {label}</span>}
  </div>
);

export function FlowSteps({ steps, handoff, aria, style }) {
  return (
    <ol aria-label={aria} style={{ listStyle: 'none', margin: 0, padding: 0, width: '100%', ...style }}>
      {steps.map((s, i) => (
        <li key={s.title}>
          {i > 0 && <Rail label={handoff} />}
          <Step index={i} step={s} />
        </li>
      ))}
    </ol>
  );
}
