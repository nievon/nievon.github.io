import { icon, type IconName } from '../icons';

interface Mark {
  icon: IconName;
  /** Horizontal position, percent of the viewport width. */
  x: number;
  /** Starting vertical position, percent of the viewport height. Marks below 100 enter as the page scrolls. */
  y: number;
  size: number;
  /** How far the mark travels per pixel scrolled. Larger is nearer and faster. */
  depth: number;
  /** Degrees turned per 1000px scrolled. */
  turn: number;
  accent?: boolean;
}

// Symbols of the work: code, servers, data, payments, messengers. They sit in the
// page margins, large and faint, and drift past at different speeds as the page scrolls.
const marks: Mark[] = [
  { icon: 'codeXml', x: 4, y: 16, size: 96, depth: 0.18, turn: -8 },
  { icon: 'server', x: 91, y: 12, size: 72, depth: 0.3, turn: 6 },
  { icon: 'database', x: 88, y: 62, size: 112, depth: 0.22, turn: -5, accent: true },
  { icon: 'braces', x: 7, y: 74, size: 64, depth: 0.36, turn: 10 },
  { icon: 'terminal', x: 93, y: 112, size: 80, depth: 0.4, turn: -6 },
  { icon: 'gitBranch', x: 3, y: 128, size: 104, depth: 0.28, turn: 7 },
  { icon: 'cloud', x: 86, y: 158, size: 96, depth: 0.34, turn: 4 },
  { icon: 'creditCard', x: 6, y: 182, size: 72, depth: 0.44, turn: -9, accent: true },
  { icon: 'send', x: 92, y: 214, size: 64, depth: 0.48, turn: 12 },
  { icon: 'cpu', x: 4, y: 236, size: 88, depth: 0.4, turn: -5 },
  { icon: 'globe', x: 89, y: 262, size: 104, depth: 0.42, turn: 6 },
  { icon: 'workflow', x: 8, y: 292, size: 72, depth: 0.5, turn: -7, accent: true },
  { icon: 'layers', x: 91, y: 318, size: 80, depth: 0.52, turn: 8 },
  { icon: 'bot', x: 5, y: 344, size: 96, depth: 0.54, turn: -6 },
];

export function backdrop(): string {
  return marks
    .map(
      (m) =>
        `<span class="mark${m.accent ? ' is-accent' : ''}" style="left:${m.x}%; top:${m.y}vh; --d:${m.depth}; --r:${m.turn / 1000}">${icon(m.icon, m.size, 1)}</span>`,
    )
    .join('');
}
