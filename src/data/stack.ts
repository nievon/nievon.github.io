import type { StackGroup } from '../types';

// Projects reference these ids in data/projects.ts.
// An item is shown when a visible project uses it or when it is marked `core`.
// Every shown item is a button; one with no visible project says so when selected.
export const stack: StackGroup[] = [
  {
    id: 'backend',
    title: { ru: 'Backend', en: 'Backend' },
    items: [
      { id: 'php', name: 'PHP' },
      { id: 'laravel', name: 'Laravel' },
      { id: 'python', name: 'Python', core: true },
      { id: 'rest', name: 'REST API' },
      { id: 'sanctum', name: 'Sanctum' },
      { id: 'queues', name: 'Queues' },
      { id: 'pest', name: 'Pest' },
      { id: 'fastapi', name: 'FastAPI' },
    ],
  },
  {
    id: 'data',
    title: { ru: 'Базы данных и кэш', en: 'Databases and cache' },
    items: [
      { id: 'sql', name: 'SQL', core: true },
      { id: 'postgres', name: 'PostgreSQL' },
      { id: 'redis', name: 'Redis' },
    ],
  },
  {
    id: 'integrations',
    title: { ru: 'Интеграции и оплаты', en: 'Integrations and payments' },
    items: [
      { id: 'yandex-pay', name: 'Yandex Pay' },
      { id: 'ozon-pay', name: 'OzonPay' },
      { id: 'bitrix24', name: 'Bitrix24' },
      { id: 'crm-sync', name: 'CRM sync' },
      { id: 'external-api', name: 'External APIs' },
      { id: 'telegram', name: 'Telegram Bot API / Mini Apps' },
      { id: 'utm', name: 'UTM tracking' },
    ],
  },
  {
    id: 'cms',
    title: { ru: 'CMS и e-commerce', en: 'CMS and e-commerce' },
    items: [
      { id: 'bitrix', name: '1C-Bitrix' },
      { id: 'wordpress', name: 'WordPress' },
      { id: 'wp-plugins', name: 'WordPress plugins' },
    ],
  },
  {
    id: 'frontend',
    title: { ru: 'Frontend', en: 'Frontend' },
    items: [
      { id: 'js', name: 'JavaScript' },
      { id: 'ts', name: 'TypeScript', core: true },
      { id: 'astro', name: 'Astro SSR' },
      { id: 'html-css', name: 'HTML / CSS', core: true },
    ],
  },
  {
    id: 'infra',
    title: { ru: 'Инфраструктура', en: 'Infrastructure' },
    items: [
      { id: 'git', name: 'Git', core: true },
      { id: 'cicd', name: 'CI/CD' },
      { id: 'docker', name: 'Docker' },
      { id: 'seo', name: 'SEO / analytics' },
      { id: 'hardening', name: 'Hardening' },
    ],
  },
];
