import React from 'react';
import { SOCIAL } from '../../lib/social.js';
import { FORMSPREE_ID, CONTACT_EMAIL } from '../../lib/contact.js';

/**
 * Contact section — ported from the DS landing (ui_kits/landing/index.html).
 * Inverse (dark) block: intro + direct email on the left, a contact form on the right.
 * The form posts to Formspree (src/lib/contact.js). States: idle → sending → sent | error.
 * It never fakes success: without a Formspree ID, or if the request fails, it shows an error
 * with the direct email and keeps what the person typed. `_gotcha` is Formspree's honeypot.
 * Bilingual copy via `t`; `L` is the shared HUD micro-label style.
 */
export function ContactSection({ t, L }) {
  const [status, setStatus] = React.useState('idle');
  const Li = { ...L, color: 'var(--ink-inverse-dim)' };
  const field = { width: '100%', boxSizing: 'border-box', padding: '14px 16px', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 0, font: 'var(--text-body-sm)', color: 'var(--ink-900)', outline: 'none', fontFamily: 'var(--font-sans)' };

  const submit = async (e) => {
    e.preventDefault();
    if (!FORMSPREE_ID) { setStatus('error'); return; }
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/' + FORMSPREE_ID, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(e.currentTarget),
      });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };
  const sending = status === 'sending';

  return (
    <section id="contact" data-screen-label="Contact" style={{ background: 'var(--bg-dark)', padding: '72px var(--page-margin, 64px) 88px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32 }}>
        <span style={{ ...L, color: 'var(--accent)' }}>JR.CONTACT — CHANNEL</span>
        <span style={{ ...Li, display: 'inline-flex', alignItems: 'center', gap: 8 }}><span style={{ width: 8, height: 8, background: 'var(--status-active)', animation: 'jr-blink 1.2s steps(2,start) infinite' }} />CHANNEL OPEN</span>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 56, alignItems: 'flex-start' }}>
        <div style={{ flex: '1 1 280px', minWidth: 0 }}>
          <h2 style={{ margin: 0, font: 'var(--text-h2)', color: 'var(--ink-inverse)' }}>{t.contactTitle}</h2>
          <p style={{ margin: '20px 0 0', font: 'var(--text-body)', color: 'var(--ink-inverse-dim)', maxWidth: '42ch' }}>{t.contactIntro}</p>
          <p style={{ margin: '14px 0 0', font: 'var(--text-body)', color: 'var(--ink-inverse-dim)' }}>{t.contactAlt}<br /><a href={'mailto:' + CONTACT_EMAIL} style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: 15 }}>{CONTACT_EMAIL}</a></p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 24px', marginTop: 40, paddingTop: 20, borderTop: '1px solid rgba(241,247,244,0.18)' }}>
            <span style={Li}>LAT 40.4168</span><span style={Li}>LON -3.7038</span><span style={Li}>UTC+2</span>
          </div>
        </div>
        <div style={{ flex: '1.4 1 320px', minWidth: 0, border: '1px solid rgba(241,247,244,0.25)', padding: 24 }}>
          {status === 'sent' ? (
            <div role="status" style={{ padding: '48px 24px', textAlign: 'center' }}>
              <div style={{ ...L, color: 'var(--accent)', marginBottom: 12 }}>TRANSMISSION SENT</div>
              <div style={{ font: 'var(--text-body)', color: 'var(--ink-inverse)' }}>{t.contactSent}</div>
            </div>
          ) : (
            // method/action are the no-JS fallback (submit before hydration): POST keeps the data
            // out of the URL, and with an ID the browser posts straight to Formspree.
            <form onSubmit={submit} method="POST" action={FORMSPREE_ID ? 'https://formspree.io/f/' + FORMSPREE_ID : undefined} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: 14 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label htmlFor="cf-email" style={Li}>{t.fEmail}</label>
                  <input id="cf-email" name="email" required type="email" autoComplete="email" style={field} placeholder="you@company.com" />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label htmlFor="cf-subject" style={Li}>{t.fSubject}</label>
                  <input id="cf-subject" name="_subject" type="text" style={field} placeholder="REC.SUBJECT" />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <label htmlFor="cf-message" style={Li}>{t.fMessage}</label>
                <textarea id="cf-message" name="message" required rows={7} style={{ ...field, resize: 'vertical' }} placeholder="..." />
              </div>
              <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: 'none' }} />
              {status === 'error' && (
                <p role="alert" style={{ margin: 0, padding: '12px 14px', border: '1px solid var(--status-alert)', font: 'var(--text-body-sm)', color: 'var(--ink-inverse)' }}>
                  {t.contactError} <a href={'mailto:' + CONTACT_EMAIL} style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>{CONTACT_EMAIL}</a>
                </p>
              )}
              <div style={{ display: 'flex', gap: 20, alignItems: 'center', marginTop: 6 }}>
                <button type="submit" disabled={sending} style={{ padding: '14px 24px', background: 'var(--accent)', color: '#0E1F19', border: 'none', borderRadius: 0, font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', cursor: sending ? 'wait' : 'pointer', opacity: sending ? 0.6 : 1 }}>
                  {sending ? t.contactSending : t.fSubmit + ' ↗'}
                </button>
                <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" style={{ ...Li, color: 'var(--ink-inverse)', textDecoration: 'none' }}>LINKEDIN {'↗'}</a>
              </div>
            </form>
          )}
        </div>
      </div>
      <style>{'@keyframes jr-blink{to{visibility:hidden}}'}</style>
    </section>
  );
}
