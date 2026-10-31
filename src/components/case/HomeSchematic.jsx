import React from 'react';
/**
 * Block-level wireframe of an intranet home, drawn in code so no real screen is exposed.
 * variant 'before' = dropdown grab-bag + stale shortcuts; 'after' = task-first blocks.
 * All copy comes from `labels` (bilingual content file).
 */
const M = { font: 'var(--text-micro)', letterSpacing: 'var(--tracking-micro)', textTransform: 'uppercase' };
const bar = (w, tone = 'var(--line)') => <span style={{ display: 'block', height: 6, width: w, background: tone }} />;

function Block({ label, children, accent, dashed, span }) {
  return (
    <div style={{ gridColumn: span ? '1 / -1' : 'auto', border: '1px ' + (dashed ? 'dashed' : 'solid') + ' ' + (accent ? 'var(--accent)' : 'var(--line)'), background: accent ? 'var(--accent-tint)' : 'var(--bg-0)', padding: 8, display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ ...M, color: accent ? 'var(--accent-ink)' : 'var(--ink-600)' }}>{label}</span>
      {children}
    </div>
  );
}

const Chip = ({ children, muted }) => (
  <span style={{ ...M, padding: '3px 6px', border: '1px solid var(--line)', color: muted ? 'var(--ink-400)' : 'var(--ink-900)', background: 'var(--bg-1)', textDecoration: muted ? 'line-through' : 'none' }}>{children}</span>
);

export function HomeSchematic({ variant = 'after', labels }) {
  const head = (
    <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 8, marginBottom: 10, borderBottom: '1px solid var(--line)' }}>
      <span style={{ ...M, color: 'var(--ink-900)' }}>{labels.header}</span>
      <span style={{ ...M, color: 'var(--ink-400)' }}>{variant === 'after' ? 'SP ONLINE' : 'SP 2016'}</span>
    </div>
  );

  if (variant === 'before') {
    return (
      <div role="img" aria-label={labels.aria}>
        {head}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {labels.dropdowns.map((d, i) => (
            <div key={i} style={{ border: '1px solid var(--line)', background: 'var(--bg-0)' }}>
              <div style={{ ...M, color: 'var(--ink-600)', padding: '6px 8px', display: 'flex', justifyContent: 'space-between' }}>
                <span>{d}</span><span aria-hidden="true">{i === 1 ? '▾' : '▸'}</span>
              </div>
              {i === 1 && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, padding: '0 8px 8px' }}>
                  {Array.from({ length: 6 }, (_, k) => <span key={k} style={{ height: 14, border: '1px solid var(--line)', background: 'var(--bg-1)' }} />)}
                </div>
              )}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 4, alignItems: 'center' }}>
          <span style={{ ...M, color: 'var(--ink-600)', marginRight: 4 }}>{labels.quick}</span>
          <Chip muted>{labels.link}</Chip><Chip muted>{labels.link}</Chip><Chip muted>{labels.link}</Chip>
          <span style={{ ...M, color: 'var(--status-alert-ink)', marginLeft: 'auto' }}>{labels.stale}</span>
        </div>
      </div>
    );
  }

  return (
    <div role="img" aria-label={labels.aria}>
      {head}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
        <Block label={labels.banner} accent dashed span>{bar('60%', 'var(--accent-dim)')}</Block>
        <Block label={labels.campaigns} span>{bar('80%')}{bar('45%')}</Block>
        <Block label={labels.tools}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
            {Array.from({ length: 4 }, (_, k) => <span key={k} style={{ aspectRatio: '1', border: '1px solid var(--line)', background: 'var(--bg-1)' }} />)}
          </div>
        </Block>
        <Block label={labels.engage}>{bar('90%')}{bar('70%')}{bar('80%')}</Block>
        <Block label={labels.ops} accent span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>{labels.opsChips.map((c) => <Chip key={c}>{c}</Chip>)}</div>
        </Block>
        <Block label={labels.saved}>{bar('70%')}{bar('55%')}</Block>
        <Block label={labels.recent}>
          {[0, 1].map((k) => (
            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {bar('60%')}<span style={{ ...M, color: 'var(--accent-ink)' }}>{labels.live}</span>
            </div>
          ))}
        </Block>
        <Block label={labels.training}>{bar('75%')}{bar('50%')}</Block>
        <Block label={labels.employee}>{bar('65%')}{bar('40%')}</Block>
      </div>
    </div>
  );
}
