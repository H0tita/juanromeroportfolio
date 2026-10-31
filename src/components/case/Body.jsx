import React from 'react';
/** Editorial paragraphs from content data: string, or { lead, text } for a bold lead-in. */
export const Body = ({ items }) => items.map((p, i) => (
  <p key={i} style={{ margin: i ? '14px 0 0' : 0 }}>
    {typeof p === 'string' ? p : <><strong style={{ color: 'var(--ink-900)', fontWeight: 600 }}>{p.lead}</strong> {p.text}</>}
  </p>
));
