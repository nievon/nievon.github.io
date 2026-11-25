export type Theme = 'dark' | 'light';

/** Phone layout. A few blocks render differently there (accordion, tabs). */
export const phone = window.matchMedia('(max-width: 767px)');

export const state = {
  theme: (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light') as Theme,
  /** Projects whose technical details are open. */
  open: {} as Record<string, boolean>,
  /** Cases opened on a phone, where the later ones start folded. */
  unfolded: {} as Record<string, boolean>,
  /** Service rows opened on a phone, where they form an accordion. */
  acc: {} as Record<string, boolean>,
  /** Stack group shown on a phone, where groups are tabs. */
  stackGroup: '',
  /** Technology selected in the stack matrix. */
  tech: null as string | null,
  /** Key of the contact whose copy button was just used, with the outcome. */
  copied: null as { key: string; ok: boolean } | null,
};
