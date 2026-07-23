import React from 'react';

/**
 * Contact section — ported from the DS landing (ui_kits/landing/index.html).
 * Inverse (dark) block: intro + direct email on the left, a contact form on
 * the right. The form is prototype-only: submitting flips to a local "sent"
 * confirmation — there is NO backend wired yet (see loose ends in the memory
 * note). Bilingual copy via `t`; `L` is the shared HUD micro-label style.
 */
export function ContactSection({ t, L }) {
  const [sent, setSent] = React.useState(false);
  const Li = { ...L, color: 'var(--ink-inverse-dim)' };
  const field = { width: '100%', boxSizing: 'border-box', padding: '14px 16px', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 0, font: 'var(--text-body-sm)', color: 'var(--ink-900)', outline: 'none', fontFamily: 'var(--font-sans)' };
  const submit = (e) => { e.preventDefault(); setSent(true); };
  return (
    <section id="contact" data-screen-label="Contact" style={{ background: 'var(--bg-dark)', padding: '72px var(--page-margin, 64px) 88px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32 }}>
        <span style={{ ...L, color: 'var(--accent)' }}>JR.CONTACT — CHANNEL</span>
        <span style={{ ...Li, display: 'inline-flex', alignItems: 'center', gap: 8 }}><span style={{ width: 8, height: 8, background: 'var(--status-active)', animation: 'jr-blink 1.2s steps(2,start) infinite' }} />CHANNEL OPEN</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(280px, 1fr) minmax(320px, 1.4fr)', gap: 56, alignItems: 'start' }}>
        <div>
          <h2 style={{ margin: 0, font: 'var(--text-h2)', color: 'var(--ink-inverse)' }}>{t.contactTitle}</h2>
          <p style={{ margin: '20px 0 0', font: 'var(--text-body)', color: 'var(--ink-inverse-dim)', maxWidth: '42ch' }}>{t.contactIntro}</p>
          <p style={{ margin: '14px 0 0', font: 'var(--text-body)', color: 'var(--ink-inverse-dim)' }}>{t.contactAlt}<br /><a href="mailto:hello@juanromeroportfolio.com" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: 15 }}>hello@juanromeroportfolio.com</a></p>
          <div style={{ display: 'flex', gap: 24, marginTop: 40, paddingTop: 20, borderTop: '1px solid rgba(241,247,244,0.18)' }}>
            <span style={Li}>LAT 40.4168</span><span style={Li}>LON -3.7038</span><span style={Li}>UTC+2</span>
          </div>
        </div>
        <div style={{ border: '1px solid rgba(241,247,244,0.25)', padding: 24 }}>
          {sent ? (
            <div style={{ padding: '48px 24px', textAlign: 'center' }}>
              <div style={{ ...L, color: 'var(--accent)', marginBottom: 12 }}>TRANSMISSION SENT</div>
              <div style={{ font: 'var(--text-body)', color: 'var(--ink-inverse)' }}>{t.contactSent}</div>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={Li}>{t.fEmail}</label>
                  <input required type="email" style={field} placeholder="you@company.com" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={Li}>{t.fSubject}</label>
                  <input type="text" style={field} placeholder="REC.SUBJECT" />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label style={Li}>{t.fMessage}</label>
                <textarea required rows={7} style={{ ...field, resize: 'vertical' }} placeholder="..." />
              </div>
              <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginTop: 6 }}>
                <button type="submit" style={{ padding: '14px 24px', background: 'var(--accent)', color: '#0E1F19', border: 'none', borderRadius: 0, font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', cursor: 'pointer' }}>{t.fSubmit} {'↗'}</button>
                <a href={t.linkedin || '#'} style={{ ...Li, color: 'var(--ink-inverse)', textDecoration: 'none' }}>LINKEDIN {'↗'}</a>
              </div>
            </form>
          )}
        </div>
      </div>
      <style>{'@keyframes jr-blink{to{visibility:hidden}}'}</style>
    </section>
  );
}
