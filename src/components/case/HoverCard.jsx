import React from 'react';
/**
 * Card surface with the shared hover state: background tints to mint and the
 * ProjectCard corner brackets appear. The border stays neutral on purpose.
 */
const Bracket = ({ pos, on }) => (
  <span aria-hidden="true" style={{ position: 'absolute', width: 12, height: 12, ...pos, borderColor: 'var(--accent)', borderStyle: 'solid', borderWidth: 0, opacity: on ? 1 : 0, transition: 'opacity var(--dur-fast) var(--ease-hud)', pointerEvents: 'none',
    ...(pos.top != null && pos.left != null && { borderTopWidth: 2, borderLeftWidth: 2 }),
    ...(pos.top != null && pos.right != null && { borderTopWidth: 2, borderRightWidth: 2 }),
    ...(pos.bottom != null && pos.left != null && { borderBottomWidth: 2, borderLeftWidth: 2 }),
    ...(pos.bottom != null && pos.right != null && { borderBottomWidth: 2, borderRightWidth: 2 }) }} />
);

export function HoverCard({ children, style }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{ position: 'relative', background: hover ? 'var(--accent-tint)' : 'var(--bg-1)', border: '1px solid var(--line)', transition: 'background var(--dur-fast) var(--ease-hud)', ...style }}>
      <Bracket on={hover} pos={{ top: -1, left: -1 }} />
      <Bracket on={hover} pos={{ top: -1, right: -1 }} />
      <Bracket on={hover} pos={{ bottom: -1, left: -1 }} />
      <Bracket on={hover} pos={{ bottom: -1, right: -1 }} />
      {children}
    </div>
  );
}
