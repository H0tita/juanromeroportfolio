import React from 'react';
import { HoverCard } from './HoverCard.jsx';
/**
 * Vertical team tree: manager → two-person core team (self highlighted) → branch coordinators,
 * each with their pilot managers underneath. Nodes are HoverCards joined by accent rails.
 */
const M = { font: 'var(--text-micro)', letterSpacing: 'var(--tracking-micro)', textTransform: 'uppercase' };
const RAIL = 'var(--accent)';

const Person = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" style={{ flex: 'none' }}>
    <circle cx="10" cy="6.5" r="3.5" />
    <path d="M3 18c0-3.9 3.1-6.5 7-6.5s7 2.6 7 6.5" />
  </svg>
);

function Node({ node, badge, accent, compact, fill }) {
  return (
    <HoverCard style={{ padding: compact ? '10px 12px' : '12px 14px', ...(fill && { height: '100%' }), ...(accent && { border: '1px solid var(--accent)' }) }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: accent ? 'var(--accent-ink)' : 'var(--ink-600)' }}>
        <Person />
        <span style={{ ...M, color: accent ? 'var(--accent-ink)' : 'var(--ink-400)' }}>{node.label}</span>
        {badge && <span style={{ ...M, marginLeft: 'auto', padding: '2px 6px', background: 'var(--accent)', color: '#0E1F19' }}>{badge}</span>}
      </div>
      <div style={{ font: 'var(--text-h6)', color: 'var(--ink-900)', marginTop: 8 }}>{node.title}</div>
      <div style={{ font: 'var(--text-caption)', color: 'var(--ink-600)', marginTop: 4 }}>{node.text}</div>
    </HoverCard>
  );
}

/** Straight drop from a centred parent. */
const Drop = ({ h = 20 }) => (
  <div aria-hidden="true" style={{ position: 'relative', height: h }}>
    <span style={{ position: 'absolute', left: 'calc(50% - 1px)', top: 0, bottom: 0, width: 2, background: RAIL }} />
  </div>
);

/** Centred parent splitting into two equal columns (children centred at 25 % / 75 %). */
const Fork = () => (
  <div aria-hidden="true" style={{ position: 'relative', height: 28 }}>
    <span style={{ position: 'absolute', left: 'calc(50% - 1px)', top: 0, height: 14, width: 2, background: RAIL }} />
    <span style={{ position: 'absolute', left: '25%', right: '25%', top: 13, height: 2, background: RAIL }} />
    <span style={{ position: 'absolute', left: 'calc(25% - 1px)', top: 13, bottom: 0, width: 2, background: RAIL }} />
    <span style={{ position: 'absolute', left: 'calc(75% - 1px)', top: 13, bottom: 0, width: 2, background: RAIL }} />
  </div>
);

/** Two equal columns joining back into a centred child. */
const Join = () => (
  <div aria-hidden="true" style={{ position: 'relative', height: 28 }}>
    <span style={{ position: 'absolute', left: 'calc(25% - 1px)', top: 0, height: 14, width: 2, background: RAIL }} />
    <span style={{ position: 'absolute', left: 'calc(75% - 1px)', top: 0, height: 14, width: 2, background: RAIL }} />
    <span style={{ position: 'absolute', left: '25%', right: '25%', top: 13, height: 2, background: RAIL }} />
    <span style={{ position: 'absolute', left: 'calc(50% - 1px)', top: 13, bottom: 0, width: 2, background: RAIL }} />
  </div>
);

const pair = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 };

export function TeamTree({ team }) {
  const gestores = (n) => (n === 1 ? (
    <>
      <Drop h={28} />
      <div style={{ width: 'calc(50% - 8px)', margin: '0 auto' }}><Node node={team.gestor} compact /></div>
    </>
  ) : (
    <>
      <Fork />
      <div style={pair}>{Array.from({ length: n }, (_, i) => <Node key={i} node={team.gestor} compact fill />)}</div>
    </>
  ));

  // Narrow screens: the same hierarchy as an indented list (two-column branches get too thin).
  const flat = [
    { node: team.manager, level: 0 },
    { node: team.mate, level: 1 },
    { node: team.self, level: 1, me: true },
    ...team.coordinators.flatMap((c) => [
      { node: c, level: 2 },
      ...Array.from({ length: c.managers }, () => ({ node: team.gestor, level: 3 })),
    ]),
  ];
  const list = (
    <div className="jr-only-mobile" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {flat.map((f, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'stretch', paddingLeft: Math.max(f.level - 1, 0) * 16 }}>
          {f.level > 0 && (
            <span aria-hidden="true" style={{ flex: 'none', width: 16, position: 'relative' }}>
              <span style={{ position: 'absolute', left: 4, top: -8, height: 'calc(50% + 8px)', width: 2, background: RAIL }} />
              <span style={{ position: 'absolute', left: 4, top: '50%', width: 10, height: 2, background: RAIL }} />
            </span>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <Node node={f.node} accent={f.me} badge={f.me ? team.me : undefined} compact={f.level === 3} fill />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div role="group" aria-label={team.aria}>
      {list}
      <div className="jr-only-desktop" style={{ maxWidth: 760 }}>
      <div style={{ width: 'calc(50% - 8px)', margin: '0 auto' }}><Node node={team.manager} /></div>
      <Fork />
      <div style={pair}>
        <Node node={team.mate} fill />
        <Node node={team.self} accent badge={team.me} fill />
      </div>
      <Join />
      <Fork />
      <div style={{ ...pair, alignItems: 'start' }}>
        {team.coordinators.map((c) => (
          <div key={c.label}>
            <Node node={c} />
            {gestores(c.managers)}
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
