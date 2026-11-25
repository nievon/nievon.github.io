import type { L, Lang } from './types';

export const ui = {
  docTitle: {
    ru: 'Никита (nievon) — fullstack-разработчик, backend',
    en: 'Nikita (nievon) — fullstack developer, backend',
  },
  docDescription: {
    ru: 'Никита (nievon) — fullstack-разработчик с фокусом на backend: серверная логика, API, CRM-связки и платёжные интеграции на аутсорсинге.',
    en: 'Nikita (nievon) is a fullstack developer focused on backend: server logic, APIs, CRM links and payment integrations, working as an outsourced contractor.',
  },
  skip: { ru: 'К содержимому', en: 'Skip to content' },

  navProjects: { ru: 'Проекты', en: 'Projects' },
  navServices: { ru: 'Услуги', en: 'Services' },
  navStack: { ru: 'Стек', en: 'Stack' },
  navContacts: { ru: 'Контакты', en: 'Contact' },
  navLabel: { ru: 'Разделы страницы', en: 'Page sections' },
  langLabel: { ru: 'Язык интерфейса', en: 'Interface language' },
  themeToLight: { ru: 'Включить светлую тему', en: 'Switch to light theme' },
  themeToDark: { ru: 'Включить тёмную тему', en: 'Switch to dark theme' },
  githubLabel: { ru: 'GitHub, профиль nievon', en: 'GitHub profile, nievon' },

  heroRole: {
    ru: 'Fullstack-разработчик с фокусом на backend',
    en: 'Fullstack developer focused on backend',
  },
  heroLead: {
    ru: 'Делаю сайты, Telegram-ботов и приложения **под ключ**: от разработки до запуска и обслуживания. Беру на себя серверную логику, связки с CRM и эквайринг.',
    en: 'I build websites, Telegram bots and apps **end to end**: from development to launch and maintenance. I handle the server logic, CRM links and payment acquiring.',
  },
  heroPrimary: { ru: 'Смотреть кейсы', en: 'See the projects' },
  heroSecondary: { ru: 'Обсудить проект', en: 'Discuss a project' },
  factsTitle: { ru: 'Коротко', en: 'At a glance' },
  factExperience: { ru: 'Опыт', en: 'Experience' },
  factExperienceValue: { ru: '3+ года в разработке', en: '3+ years in development' },
  factEducation: { ru: 'Образование', en: 'Education' },
  factEducationValue: { ru: 'Информационные технологии', en: 'Information technology' },
  factStack: { ru: 'Стек', en: 'Stack' },
  factFormat: { ru: 'Формат', en: 'Format' },
  factFormatValue: { ru: 'Аутсорсинг', en: 'Outsourcing' },
  factCode: { ru: 'Код', en: 'Code' },

  projectsTitle: { ru: 'Проекты', en: 'Projects' },
  projectsLead: {
    ru: 'В каждом кейсе: что было нужно бизнесу, что я сделал и что это дало.',
    en: 'Each case covers what the business needed, what I did and what it changed.',
  },
  storyProblem: { ru: 'Задача', en: 'The problem' },
  storySolution: { ru: 'Что сделал', en: 'What I did' },
  storyOutcome: { ru: 'Что это дало', en: 'What it changed' },
  confidential: {
    ru: 'Проект под NDA, детали не раскрываю',
    en: 'Under NDA, details are not disclosed',
  },
  more: { ru: 'Подробнее', en: 'More' },
  zoom: { ru: 'Открыть крупнее', en: 'View larger' },
  zoomOf: { ru: 'Открыть скриншот крупнее: {name}', en: 'View the screenshot larger: {name}' },
  zoomClose: { ru: 'Закрыть', en: 'Close' },
  photoSlot: { ru: 'Место для фото проекта', en: 'Project photo goes here' },
  viewTech: { ru: 'Технические детали', en: 'Technical details' },
  opensInNewTab: { ru: 'откроется в новой вкладке', en: 'opens in a new tab' },

  servicesTitle: { ru: 'Что я могу разработать для вашего бизнеса', en: 'What I can build for your business' },
  servicesLead: {
    ru: 'Чаще всего ко мне приходят за сайтом или Telegram-ботом. Остальное обсуждаем.',
    en: 'Most clients come for a website or a Telegram bot. The rest we discuss.',
  },
  servicesCase: { ru: 'Пример:', en: 'Example:' },
  servicesCases: { ru: 'Примеры:', en: 'Examples:' },

  stackTitle: { ru: 'Навыки и стек', en: 'Skills and stack' },
  stackLead: {
    ru: 'Нажмите на технологию, чтобы увидеть, в каких проектах она использована.',
    en: 'Select a technology to see which projects use it.',
  },
  stackUsedIn: { ru: '{name} — в проектах:', en: '{name} is used in:' },
  stackNoCase: {
    ru: '{name} — использую в работе, среди опубликованных кейсов его нет',
    en: '{name}: I use it in my work, but none of the published cases include it',
  },
  stackReset: { ru: 'Сбросить', en: 'Clear' },
  stackHint: { ru: 'Технология не выбрана', en: 'No technology selected' },

  navAbout: { ru: 'Обо мне', en: 'About' },
  aboutTitle: { ru: 'Обо мне', en: 'About me' },
  aboutLead: {
    ru: 'Я Никита, fullstack-разработчик с фокусом на backend. **Больше трёх лет** делаю для бизнеса сайты, интернет-магазины, панели управления и Telegram-ботов.',
    en: 'I am Nikita, a fullstack developer focused on backend. For **more than three years** I have been building websites, online stores, admin panels and Telegram bots for businesses.',
  },
  aboutApproach: {
    ru: 'Мне важно, чтобы заказчик понимал, за что платит. Поэтому я объясняю решения простым языком, называю срок и стоимость до начала работы и показываю результат по частям.',
    en: 'It matters to me that a client understands what they are paying for. So I explain decisions in plain language, name the timeline and price before work starts, and show the result part by part.',
  },
  aboutStack: {
    ru: 'Основной стек: PHP и Laravel, Python, SQL. Работаю с 1С-Битрикс и WordPress, подключаю эквайринг и CRM. Образование: информационные технологии.',
    en: 'My main stack is PHP and Laravel, Python and SQL. I work with 1C-Bitrix and WordPress, and connect payment acquiring and CRMs. My education is in information technology.',
  },
  aboutClearTitle: { ru: 'Говорю понятно', en: 'Plain language' },
  aboutClearText: {
    ru: 'Объясняю без терминов, что делаю и зачем это бизнесу.',
    en: 'I explain what I am doing and why the business needs it, without jargon.',
  },
  aboutTurnkeyTitle: { ru: 'Делаю под ключ', en: 'End to end' },
  aboutTurnkeyText: {
    ru: 'От разработки до запуска и обслуживания, один исполнитель на весь проект.',
    en: 'From development to launch and maintenance, one person for the whole project.',
  },
  aboutHonestTitle: { ru: 'Без сюрпризов', en: 'No surprises' },
  aboutHonestText: {
    ru: 'Срок и стоимость известны до старта, результат виден по частям.',
    en: 'The timeline and price are known before the start, and the result is visible part by part.',
  },

  processTitle: { ru: 'Как выстроена работа', en: 'How the work is organised' },
  processLead: {
    ru: 'Делаю проекты под ключ: от разработки до установки и обслуживания сайта или приложения.',
    en: 'I take projects end to end: from development to deployment and maintenance of the site or app.',
  },
  processEstimate: { ru: 'Оценка', en: 'Estimate' },
  processEstimateText: {
    ru: 'Разбираю задачу, задаю вопросы и называю срок и стоимость до начала работы.',
    en: 'I go through the task, ask questions and give a timeline and price before work starts.',
  },
  processStages: { ru: 'Разработка', en: 'Development' },
  processStagesText: {
    ru: 'Делю работу на части с результатом, который можно проверить. Каждую часть показываю отдельно.',
    en: 'I split the work into parts with a result you can check. Each part is shown on its own.',
  },
  processLaunch: { ru: 'Установка и запуск', en: 'Deployment and launch' },
  processLaunchText: {
    ru: 'Разворачиваю сайт или приложение на сервере, настраиваю домен и проверяю, что всё работает у реальных пользователей.',
    en: 'I deploy the site or app to the server, set up the domain and check that everything works for real users.',
  },
  processSupport: { ru: 'Обслуживание', en: 'Maintenance' },
  processSupportText: {
    ru: 'После запуска остаюсь на связи: слежу за работой, исправляю ошибки и дорабатываю проект по мере роста.',
    en: 'After launch I stay in touch: I keep an eye on the system, fix bugs and extend the project as it grows.',
  },
  processHandover: { ru: 'Передача кода', en: 'Code handover' },
  processHandoverText: {
    ru: 'Код остаётся в репозитории заказчика, вместе с инструкцией по запуску и деплою.',
    en: 'The code stays in the client’s repository, together with instructions for running and deploying it.',
  },

  contactsTitle: { ru: 'Обсудим вашу задачу', en: 'Let’s talk about your task' },
  contactsCta: { ru: 'Написать в Telegram', en: 'Message me on Telegram' },
  contactsLead: {
    ru: 'Опишите задачу в двух-трёх предложениях. Отвечу и уточню детали.',
    en: 'Describe the task in two or three sentences. I will reply and ask about the details.',
  },
  copy: { ru: 'Скопировать', en: 'Copy' },
  copied: { ru: 'Скопировано', en: 'Copied' },
  copyFailed: { ru: 'Не удалось скопировать', en: 'Could not copy' },
  copyOf: { ru: 'Скопировать: {value}', en: 'Copy {value}' },
  print: { ru: 'Сохранить как PDF', en: 'Save as PDF' },
} satisfies Record<string, L>;

let lang: Lang = document.documentElement.lang === 'en' ? 'en' : 'ru';

export const getLang = (): Lang => lang;

export function setLang(next: Lang): void {
  lang = next;
  document.documentElement.lang = next;
  try {
    localStorage.setItem('lang', next);
  } catch {
    /* storage unavailable */
  }
}

/** Pick the current language, filling `{name}` placeholders. */
export function t(s: L, vars?: Record<string, string | number>): string {
  let out = s[lang];
  if (vars) for (const [k, v] of Object.entries(vars)) out = out.replace(`{${k}}`, String(v));
  return out;
}

/** Escape text, then turn **phrase** into emphasis. Used for the few lines a lead should not miss. */
export function rich(s: string): string {
  return esc(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

/** Escape text for use in HTML templates. */
export function esc(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}
