import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Braces,
  Car,
  Check,
  ChefHat,
  ChevronDown,
  ClipboardList,
  Cloud,
  CodeXml,
  Copy,
  Cpu,
  CreditCard,
  Database,
  GitBranch,
  Globe,
  HeartHandshake,
  Image,
  Layers,
  LayoutDashboard,
  Lock,
  Mail,
  MessagesSquare,
  Moon,
  Printer,
  Rocket,
  Scissors,
  Send,
  Server,
  ShoppingCart,
  Sun,
  Terminal,
  Workflow,
  Wrench,
  type IconNode,
} from 'lucide';

// Lucide dropped brand icons, so the GitHub mark is kept here in the same line style.
const Github: IconNode = [
  [
    'path',
    {
      d: 'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4',
    },
  ],
  ['path', { d: 'M9 18c-4.51 2-5-2-7-2' }],
];

const set = {
  arrowRight: ArrowRight,
  arrowUpRight: ArrowUpRight,
  bot: Bot,
  braces: Braces,
  car: Car,
  check: Check,
  chefHat: ChefHat,
  chevronDown: ChevronDown,
  clipboardList: ClipboardList,
  cloud: Cloud,
  codeXml: CodeXml,
  copy: Copy,
  cpu: Cpu,
  creditCard: CreditCard,
  database: Database,
  gitBranch: GitBranch,
  github: Github,
  globe: Globe,
  heartHandshake: HeartHandshake,
  image: Image,
  layers: Layers,
  layoutDashboard: LayoutDashboard,
  lock: Lock,
  mail: Mail,
  messagesSquare: MessagesSquare,
  moon: Moon,
  printer: Printer,
  rocket: Rocket,
  scissors: Scissors,
  send: Send,
  server: Server,
  shoppingCart: ShoppingCart,
  sun: Sun,
  terminal: Terminal,
  workflow: Workflow,
  wrench: Wrench,
} satisfies Record<string, IconNode>;

export type IconName = keyof typeof set;

/** One set and one stroke in the interface. The backdrop draws the same icons large and thin. */
export function icon(name: IconName, size = 16, stroke = 1.5): string {
  const body = set[name]
    .map(([tag, attrs]) => {
      const a = Object.entries(attrs)
        .map(([k, v]) => `${k}="${v}"`)
        .join(' ');
      return `<${tag} ${a}/>`;
    })
    .join('');
  return `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${body}</svg>`;
}
