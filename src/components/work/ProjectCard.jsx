import React from 'react';
/** Project card from work.png wireframe: image field, index, tag, title, excerpt (subtitle), optional key metric { value, label }, hover brackets. */
export function ProjectCard({ index = '01', title = 'Project Title', excerpt = '', metric, tag = 'Case Study', categories = [], image, meta, href = '#', onClick, lang = 'ENG' }) {
  const [hover, setHover] = React.useState(false);
  const bk = (pos) => (
    <span style={{ position: 'absolute', width: 18, height: 18, ...pos, borderColor: 'var(--accent)', borderStyle: 'solid', borderWidth: 0, opacity: hover ? 1 : 0, transition: 'opacity var(--dur-fast) var(--ease-hud)', zIndex: 2,
      ...(pos.top != null && pos.left != null && { borderTopWidth: 2, borderLeftWidth: 2 }),
      ...(pos.top != null && pos.right != null && { borderTopWidth: 2, borderRightWidth: 2 }),
      ...(pos.bottom != null && pos.left != null && { borderBottomWidth: 2, borderLeftWidth: 2 }),
      ...(pos.bottom != null && pos.right != null && { borderBottomWidth: 2, borderRightWidth: 2 }) }} />
  );
  return (
    <a href={href} onClick={onClick} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ position: 'relative', display: 'block', textDecoration: 'none', color: 'var(--ink-900)', background: 'var(--bg-1)', border: '1px solid var(--line)' }}>
      {bk({ top: -1, left: -1 })}{bk({ top: -1, right: -1 })}{bk({ bottom: -1, left: -1 })}{bk({ bottom: -1, right: -1 })}
      <div style={{ position: 'relative', aspectRatio: '16/10', background: '#8FA69B', overflow: 'hidden' }}>
        {image
          ? <img src={image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: hover ? 'none' : 'saturate(0.75)', transition: 'filter var(--dur-med) var(--ease-hud)' }} />
          : <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(45deg, #93AAA0 0 10px, #8FA69B 10px 20px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ font: 'var(--text-caption)', color: '#F1F7F4', background: 'rgba(14,31,25,0.55)', padding: '4px 10px' }}>project cover — drop shot here</span>
            </div>}
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
          <span style={{ padding: '5px 10px', font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', border: '1px solid rgba(241,247,244,0.5)', color: 'var(--ink-inverse)', background: 'rgba(14,31,25,0.55)' }}>{tag}</span>
        </div>
        <span style={{ position: 'absolute', top: 8, right: 12, font: 'var(--text-data-lg)', color: 'rgba(241,247,244,0.9)' }}>{index}</span>
      </div>
      <div style={{ padding: '18px 20px 20px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', justifyContent: 'space-between', gap: '6px 12px' }}>
          <h3 style={{ margin: 0, font: 'var(--text-h4)' }}>{title}</h3>
          <span style={{ font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', color: hover ? 'var(--accent-ink)' : 'var(--ink-400)', whiteSpace: 'nowrap', transition: 'color var(--dur-fast)' }}>{lang === 'ESP' ? 'VER PROYECTO' : 'VIEW PROJECT'} {'↗'}</span>
        </div>
        {excerpt && <p style={{ margin: '10px 0 0', font: 'var(--text-body-sm)', color: 'var(--ink-600)' }}>{excerpt}</p>}
        {metric && (
          <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', columnGap: 10, rowGap: 4, marginTop: 14 }}>
            <span style={{ font: '700 clamp(22px, 2.2vw, 28px)/1.1 var(--font-mono)', color: 'var(--accent-ink)' }}>{metric.value}</span>
            <span style={{ font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--ink-400)' }}>{metric.label}</span>
          </div>
        )}
        {(categories.length > 0 || meta) && (
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginTop: 14, paddingTop: 12, borderTop: '1px solid var(--line-faint)' }}>
            <span style={{ font: 'var(--text-micro)', letterSpacing: 'var(--tracking-micro)', textTransform: 'uppercase', color: 'var(--ink-400)' }}>{categories.join(' / ')}</span>
            {meta && <span style={{ font: 'var(--text-micro)', letterSpacing: 'var(--tracking-micro)', textTransform: 'uppercase', color: 'var(--ink-400)' }}>{meta}</span>}
          </div>
        )}
      </div>
    </a>
  );
}
