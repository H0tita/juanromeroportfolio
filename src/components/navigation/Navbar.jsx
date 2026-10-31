import React from 'react';
import { LiveDataWidget } from '../core/LiveDataWidget.jsx';
/**
 * Portfolio navbar: dark utility bar (live data + language) + main nav with mint active block.
 * Below 768px the inline links collapse into a MENU toggle that opens a stacked panel
 * (visibility handled by the .jr-only-desktop / .jr-only-mobile utilities in global.css).
 */
export function Navbar({ items = ['Work', 'Brand Book', 'About Me', 'Contact'], active = 'Work', onNavigate, lang = 'ESP', onLangChange, scrolled = false, showUtilityBar = true, logoSrc = 'assets/logo-color.svg', city = 'Madrid, Spain' }) {
  const [hovered, setHovered] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  const go = (e, label) => { e.preventDefault(); setOpen(false); onNavigate && onNavigate(label); };
  const labelFont = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', textDecoration: 'none' };

  const link = (label) => {
    const isActive = label === active, isHover = label === hovered;
    return (
      <a key={label} href="#" onClick={(e) => go(e, label)}
        onMouseEnter={() => setHovered(label)} onMouseLeave={() => setHovered(null)}
        style={{ position: 'relative', padding: '22px 18px', ...labelFont, color: isActive ? 'var(--ink-900)' : isHover ? 'var(--accent-ink)' : 'var(--ink-600)', transition: 'color var(--dur-fast) var(--ease-hud)' }}>
        {label}
        <span style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 3, background: 'var(--accent)', transform: isActive || isHover ? 'scaleX(1)' : 'scaleX(0)', opacity: isActive ? 1 : 0.5, transformOrigin: 'left', transition: 'transform var(--dur-med) var(--ease-hud)' }} />
      </a>
    );
  };

  const mobileLink = (label) => {
    const isActive = label === active;
    return (
      <a key={label} href="#" onClick={(e) => go(e, label)}
        style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px var(--page-margin, 20px)', borderTop: '1px solid var(--line-faint)', ...labelFont, color: isActive ? 'var(--ink-900)' : 'var(--ink-600)', background: isActive ? 'var(--accent-tint)' : 'transparent' }}>
        <span style={{ width: 3, alignSelf: 'stretch', background: isActive ? 'var(--accent)' : 'transparent' }} />
        {label}
      </a>
    );
  };

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 50 }}>
      {showUtilityBar && !scrolled && (
        <div style={{ background: 'var(--bg-dark)', padding: '10px var(--page-margin, 64px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
          <LiveDataWidget city={city} inverse />
          <div style={{ font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', color: 'var(--ink-inverse)', whiteSpace: 'nowrap' }}>
            {['ESP', 'ENG'].map((l, i) => (
              <span key={l} onClick={() => onLangChange && onLangChange(l)} style={{ cursor: 'pointer', color: l === lang ? 'var(--ink-inverse)' : 'var(--ink-inverse-dim)' }}>{i > 0 && <span style={{ color: 'var(--ink-inverse-dim)', margin: '0 8px' }}>|</span>}{l}</span>
            ))}
          </div>
        </div>
      )}
      <nav style={{ background: scrolled || open ? 'rgba(247,250,248,0.96)' : 'var(--bg-1)', backdropFilter: scrolled ? 'blur(8px)' : 'none', borderBottom: '1px solid ' + (scrolled ? 'var(--line-strong)' : 'var(--line)'), padding: '0 var(--page-margin, 64px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', minHeight: 56, transition: 'all var(--dur-med) var(--ease-hud)' }}>
        <a href="/" aria-label="Home" style={{ display: 'flex' }}
          onClick={(e) => {
            setOpen(false);
            if (window.location.pathname !== '/') return;
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            history.replaceState(null, '', '/');
          }}>
          <img src={logoSrc} alt="JR" style={{ height: scrolled ? 26 : 32, transition: 'height var(--dur-med) var(--ease-hud)' }} />
        </a>
        <div className="jr-only-desktop" style={{ display: 'flex', alignItems: 'center' }}>{items.map(link)}</div>
        <button type="button" className="jr-only-mobile" aria-expanded={open} aria-controls="jr-mobile-menu" onClick={() => setOpen((o) => !o)}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 0 10px 12px', background: 'none', border: 'none', cursor: 'pointer', ...labelFont, color: 'var(--ink-900)' }}>
          {open ? 'Close' : 'Menu'}
          <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true" stroke="var(--ink-900)" strokeWidth="1.5">
            {open
              ? <><line x1="3" y1="1" x2="15" y2="13" /><line x1="15" y1="1" x2="3" y2="13" /></>
              : <><line x1="0" y1="2" x2="18" y2="2" /><line x1="0" y1="7" x2="18" y2="7" /><line x1="6" y1="12" x2="18" y2="12" /></>}
          </svg>
        </button>
      </nav>
      {open && (
        <div id="jr-mobile-menu" className="jr-only-mobile" style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--bg-1)', borderBottom: '1px solid var(--line-strong)', boxShadow: 'var(--shadow-pop)' }}>
          {items.map(mobileLink)}
        </div>
      )}
    </div>
  );
}
