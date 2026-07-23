import React from 'react';
import { LiveDataWidget } from '../core/LiveDataWidget.jsx';
/** Portfolio navbar: dark utility bar (live data + language) + main nav with mint active block. */
export function Navbar({ items = ['Work', 'Brand Book', 'About Me', 'Contact'], active = 'Work', onNavigate, lang = 'ESP', onLangChange, scrolled = false, showUtilityBar = true, logoSrc = 'assets/logo-color.svg', city = 'Madrid, Spain' }) {
  const [hovered, setHovered] = React.useState(null);
  const link = (label) => {
    const isActive = label === active, isHover = label === hovered;
    return (
      <a key={label} href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate(label); }}
        onMouseEnter={() => setHovered(label)} onMouseLeave={() => setHovered(null)}
        style={{ position: 'relative', padding: '22px 18px', font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', textDecoration: 'none', color: isActive ? 'var(--ink-900)' : isHover ? 'var(--accent-ink)' : 'var(--ink-600)', transition: 'color var(--dur-fast) var(--ease-hud)' }}>
        {label}
        <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 3, background: 'var(--accent)', transform: isActive || isHover ? 'scaleX(1)' : 'scaleX(0)', opacity: isActive ? 1 : 0.5, transformOrigin: 'left', transition: 'transform var(--dur-med) var(--ease-hud)' }} />
      </a>
    );
  };
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 50 }}>
      {showUtilityBar && !scrolled && (
        <div style={{ background: 'var(--bg-dark)', padding: '10px var(--page-margin, 64px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <LiveDataWidget city={city} inverse />
          <div style={{ font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', color: 'var(--ink-inverse)' }}>
            {['ESP', 'ENG'].map((l, i) => (
              <span key={l} onClick={() => onLangChange && onLangChange(l)} style={{ cursor: 'pointer', color: l === lang ? 'var(--ink-inverse)' : 'var(--ink-inverse-dim)' }}>{i > 0 && <span style={{ color: 'var(--ink-inverse-dim)', margin: '0 8px' }}>|</span>}{l}</span>
            ))}
          </div>
        </div>
      )}
      <nav style={{ background: scrolled ? 'rgba(247,250,248,0.92)' : 'var(--bg-1)', backdropFilter: scrolled ? 'blur(8px)' : 'none', borderBottom: '1px solid ' + (scrolled ? 'var(--line-strong)' : 'var(--line)'), padding: '0 var(--page-margin, 64px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all var(--dur-med) var(--ease-hud)' }}>
        <img src={logoSrc} alt="JR" style={{ height: scrolled ? 26 : 32, transition: 'height var(--dur-med) var(--ease-hud)' }} />
        <div style={{ display: 'flex', alignItems: 'center' }}>{items.map(link)}</div>
      </nav>
    </div>
  );
}
