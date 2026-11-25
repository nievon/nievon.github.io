import type { IconName } from './icons';

export type Lang = 'ru' | 'en';

/** A string in both interface languages. */
export type L = Record<Lang, string>;

export interface ProjectLink {
  kind: 'site' | 'repo';
  label: L;
  url: string;
}

export interface Project {
  id: string;
  /** Hidden projects stay in the data but never reach the UI, the stack matrix or any count. */
  visible: boolean;
  featured?: boolean;
  /** A line icon that fits the project's subject. */
  icon: IconName;
  title: L;
  kind: L;
  /** Optional short state, shown only when it says something useful. */
  status?: { tone: 'live' | 'active'; label: L };
  links: ProjectLink[];
  /** Has a photo slot: the image is src/assets/projects/<id>.(jpg|png|webp|avif). */
  photo?: { alt: L };
  /** Full-width card without a photo. */
  wide?: boolean;
  /** The client asked not to disclose details. */
  confidential?: boolean;
  /** One line a client remembers: what changed for the business. */
  hook: L;
  /** Plain-language story for a client outside IT. */
  story: { problem: L; solution: L; outcome: L };
  /** Short engineering note, shown on demand. */
  technicalDetails: { lead: L; points: L[] };
  /** Ids from data/stack.ts. */
  stack: string[];
}

export interface Tech {
  id: string;
  name: string;
  /** Shown even when no visible project uses it. */
  core?: boolean;
}

export interface StackGroup {
  id: string;
  title: L;
  items: Tech[];
}
