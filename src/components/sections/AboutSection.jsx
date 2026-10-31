import React from 'react';
import { SocialLink } from '../core/SocialLink.jsx';
import { SOCIAL } from '../../lib/social.js';

/**
 * About section — ported from the DS landing (ui_kits/landing/index.html).
 * Framed profile photo (HUD corner brackets) + bio, and an experience
 * grid of "REC" cards. Bilingual copy is injected via `t`; `L` is the
 * shared HUD micro-label style from PortfolioLanding.
 */
const BRACKETS = [
  { top: 0, left: 0, bt: 1, bl: 1 },
  { top: 0, right: 0, bt: 1, br: 1 },
  { bottom: 0, left: 0, bb: 1, bl: 1 },
  { bottom: 0, right: 0, bb: 1, br: 1 },
];

export function AboutSection({ t, L }) {
  return (
    <section id="about" data-screen-label="About Me" style={{ padding: '72px var(--page-margin, 64px) 88px', borderTop: '1px solid var(--line-strong)' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32 }}>
        <span style={{ ...L, color: 'var(--accent-ink)' }}>JR.ABOUT — PROFILE</span>
        <span style={L}>ID.VERIFIED / MADRID, ES</span>
      </div>
      <div style={{ display: 'flex', gap: 48, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', padding: 14, flex: '0 0 auto' }}>
          {BRACKETS.map((p, i) => (
            <span key={i} style={{ position: 'absolute', width: 18, height: 18, top: p.top, left: p.left, right: p.right, bottom: p.bottom, borderTop: p.bt && '2px solid var(--accent)', borderLeft: p.bl && '2px solid var(--accent)', borderRight: p.br && '2px solid var(--accent)', borderBottom: p.bb && '2px solid var(--accent)' }} />
          ))}
          <img src="/foto-perfil.jpg" alt="Juan Romero" style={{ display: 'block', width: 220, height: 260, objectFit: 'cover', border: '1px solid var(--line)', background: 'var(--bg-1)' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <span style={L}>FIG.00</span><span style={L}>REC.PROFILE</span>
          </div>
        </div>
        <div style={{ flex: '1 1 480px', minWidth: 'min(100%, 320px)' }}>
          <h2 style={{ margin: 0, font: 'var(--text-h2)' }}>{t.aboutTitle}</h2>
          <div style={{ ...L, color: 'var(--accent-ink)', marginTop: 12 }}>{t.aboutRole}</div>
          <p style={{ margin: '18px 0 0', font: 'var(--text-body-lg)', color: 'var(--ink-600)', maxWidth: '58ch' }}>{t.aboutBio}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 28 }}>
            <SocialLink network="linkedin" href={SOCIAL.linkedin} label="LinkedIn" />
            <SocialLink network="youtube" href={SOCIAL.youtube} label="YouTube" />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', margin: '56px 0 20px' }}>
        <span style={{ ...L, color: 'var(--accent-ink)' }}>JR.ABOUT — {t.expLabel}</span>
        <span style={L}>03 REC</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 24 }}>
        {t.exp.map((e, i) => (
          <div key={i} style={{ background: 'var(--bg-1)', border: '1px solid var(--line)', padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 8, height: 8, background: e.current ? 'var(--status-active)' : 'var(--status-off)', animation: e.current ? 'jr-blink 1.2s steps(2,start) infinite' : 'none' }} />
              <span style={{ ...L, color: 'var(--ink-900)' }}>REC.{String(i + 1).padStart(3, '0')}</span>
              {e.current && <span style={{ ...L, color: 'var(--accent-ink)' }}>CURRENT</span>}
            </div>
            <div>
              <div style={{ font: 'var(--text-h5)', color: 'var(--ink-900)' }}>{e.company}</div>
              <div style={{ font: 'var(--text-caption)', color: 'var(--accent-ink)', marginTop: 4 }}>{e.role}</div>
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
              {e.bullets.map((b, j) => (
                <li key={j} style={{ font: 'var(--text-body-sm)', color: 'var(--ink-600)', display: 'flex', gap: 10 }}>
                  <span style={{ color: 'var(--accent-ink)', fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: '22px' }}>{'>'}</span>{b}
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px solid var(--line-faint)' }}>
              <span style={L}>{e.period}</span><span style={L}>{e.location}</span>
            </div>
          </div>
        ))}
      </div>
      <style>{'@keyframes jr-blink{to{visibility:hidden}}'}</style>
    </section>
  );
}
