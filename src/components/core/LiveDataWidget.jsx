import React from 'react';
/** Live location + weather + clock strip (navbar utility widget). Fetches open-meteo; graceful fallback. */
export function LiveDataWidget({ city = 'Madrid, Spain', lat = 40.4168, lon = -3.7038, inverse = true, showClock = true, compact = false, style }) {
  const [temp, setTemp] = React.useState(null);
  const [time, setTime] = React.useState('');
  React.useEffect(() => {
    let alive = true;
    fetch('https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon + '&current=temperature_2m')
      .then(r => r.json()).then(d => { if (alive && d.current) setTemp(Math.round(d.current.temperature_2m)); })
      .catch(() => { if (alive) setTemp(23); });
    const tick = () => setTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    tick(); const id = setInterval(tick, 1000);
    return () => { alive = false; clearInterval(id); };
  }, [lat, lon]);
  const fg = inverse ? 'var(--ink-inverse)' : 'var(--ink-900)';
  const dim = inverse ? 'var(--ink-inverse-dim)' : 'var(--ink-400)';
  const item = { display: 'inline-flex', alignItems: 'center', gap: 8, font: 'var(--text-label)', letterSpacing: 'var(--tracking-label)', textTransform: 'uppercase', color: fg };
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: compact ? 14 : 24, ...style }}>
      <span style={item}>
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><circle cx="6" cy="6" r="4.5" fill="none" stroke="var(--accent)" strokeWidth="1" /><circle cx="6" cy="6" r="1.5" fill="var(--accent)" /></svg>
        {city}
      </span>
      {!compact && <span style={item}>
        <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true"><circle cx="6" cy="6" r="2.5" fill="var(--accent)" /><g stroke="var(--accent)" strokeWidth="1">{[0,45,90,135,180,225,270,315].map(a => <line key={a} x1="6" y1="0.5" x2="6" y2="2" transform={'rotate(' + a + ' 6 6)'} />)}</g></svg>
        {temp === null ? '--' : temp + '°C'}
      </span>}
      {showClock && <span className="jr-hide-xs" style={{ ...item, color: dim }}>{time}</span>}
    </div>
  );
}
