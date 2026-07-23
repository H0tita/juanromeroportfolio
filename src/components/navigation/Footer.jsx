import React from 'react';
/** Inverse footer: logo, nav echo, coordinates, status, credits. */
export function Footer({ items = ['Work', 'Brand Book', 'About Me', 'Contact'], onNavigate, name = 'Juan Romero', role = 'Product Design · Tech · Business', email = 'hello@juanromero.design', linkedin = '#', year = new Date().getFullYear(), logoSrc = 'assets/logo-white.svg' }) {
  const lbl = { font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: 'var(--ink-inverse-dim)' };
  const a = { ...lbl, color: 'var(--ink-inverse)', textDecoration: 'none', cursor: 'pointer' };
  return (
    <footer style={{ background: 'var(--bg-dark)', color: 'var(--ink-inverse)', padding: '48px var(--page-margin, 64px) 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 32, flexWrap: 'wrap', paddingBottom: 32, borderBottom: '1px solid rgba(241,247,244,0.18)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <img src={logoSrc} alt="JR" style={{ height: 36, alignSelf: 'flex-start' }} />
          <div style={{ font: 'var(--text-body-sm)', color: 'var(--ink-inverse)' }}>{name}</div>
          <div style={lbl}>{role}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {items.map(i => <a key={i} href="#" onClick={(e) => { e.preventDefault(); onNavigate && onNavigate(i); }} style={a}>{i}</a>)}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <a href={'mailto:' + email} style={a}>{email}</a>
          <a href={linkedin} style={a}>LinkedIn {'↗'}</a>
          <span style={{ ...lbl, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 8, height: 8, background: 'var(--status-active)', animation: 'jr-blink 1.2s steps(2,start) infinite' }} />OPEN TO WORK
          </span>
          <style>{'@keyframes jr-blink{to{visibility:hidden}}'}</style>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, paddingTop: 20 }}>
        <span style={lbl}>LAT 40.4168 / LON -3.7038 · MADRID, ES</span>
        <span style={lbl}>JR.SYS.{year} · DESIGNED & BUILT BY {name.toUpperCase()}</span>
      </div>
    </footer>
  );
}
