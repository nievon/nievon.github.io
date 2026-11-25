import type { Project } from '../types';

const all: Project[] = [
  {
    id: 'swageda',
    icon: 'chefHat',
    visible: true,
    featured: true,
    title: { ru: 'Swageda.ru', en: 'Swageda.ru' },
    kind: { ru: 'Платформа рецептов', en: 'Recipe platform' },
    photo: { alt: { ru: 'Главная страница Swageda.ru', en: 'Swageda.ru home page' } },
    status: { tone: 'live', label: { ru: 'Сайт работает', en: 'Live' } },
    links: [
      { kind: 'site', label: { ru: 'swageda.ru', en: 'swageda.ru' }, url: 'https://swageda.ru' },
      {
        kind: 'repo',
        label: { ru: 'Репозиторий фронтенда', en: 'Frontend repository' },
        url: 'https://github.com/KbrYbk/recipe-frontend',
      },
    ],
    hook: {
      ru: 'Большой сайт рецептов открывается быстро и не теряет посетителей из поиска',
      en: 'A large recipe site that loads fast and keeps its visitors from search',
    },
    story: {
      problem: {
        ru: 'Нужна была платформа рецептов: люди ищут блюда и публикуют свои. Рецептов много, фотографии тяжёлые, а названия со временем меняют, и старые ссылки из поиска перестают работать.',
        en: 'A recipe platform was needed: people search for dishes and publish their own. There are many recipes, the photos are heavy, and titles change over time, so old links from search stop working.',
      },
      solution: {
        ru: 'Разработал платформу сам: каталог и поиск рецептов, публикация рецептов, автоматическое сжатие фотографий при загрузке и память о старых адресах каждого рецепта. Также сделал Telegram-бота и мини-приложение.',
        en: 'I built the platform myself: the recipe catalogue and search, recipe publishing, automatic photo compression at upload, and a record of every old address a recipe has had. I also built a Telegram bot and a mini app.',
      },
      outcome: {
        ru: 'Рецепт легко найти и опубликовать, страницы открываются быстро, фото весят меньше и выглядят так же. **Старая ссылка сама приводит на новую страницу**, посетитель доходит до рецепта.',
        en: 'A recipe is easy to find and to publish, pages open quickly, and photos weigh less while looking the same. **An old link leads to the new page by itself**, so the visitor reaches the recipe.',
      },
    },
    technicalDetails: {
      lead: {
        ru: 'Закрытый backend-API на Laravel 13 и PostgreSQL 16 для отдельного фронтенда на Astro.',
        en: 'A private backend API on Laravel 13 and PostgreSQL 16 behind a separate Astro frontend.',
      },
      points: [
        { ru: 'Версионированный кэш в Redis', en: 'Versioned cache in Redis' },
        {
          ru: 'Конвертация изображений в WebP с защитой от SSRF',
          en: 'Image conversion to WebP with SSRF protection',
        },
        { ru: 'История slug с редиректами 301', en: 'Slug history with 301 redirects' },
        { ru: 'Telegram-бот и мини-приложение', en: 'Telegram bot and mini app' },
      ],
    },
    stack: ['php', 'laravel', 'sql', 'postgres', 'redis', 'sanctum', 'rest', 'astro', 'telegram', 'hardening', 'js', 'html-css', 'seo', 'cicd', 'git'],
  },
  {
    id: 'ecommerce',
    icon: 'shoppingCart',
    visible: true,
    title: {
      ru: 'Интернет-магазин сложной техники',
      en: 'Online store for complex equipment',
    },
    kind: {
      ru: 'Магазин технически сложной продукции',
      en: 'Store for technically complex products',
    },
    confidential: true,
    links: [],
    hook: {
      ru: 'Разработка интернет-магазина, корзины и приёма оплат онлайн',
      en: 'An online store built with a cart and online payments',
    },
    story: {
      problem: {
        ru: 'Нужен был интернет-магазин для технически сложной продукции, с корзиной и оплатой заказа онлайн.',
        en: 'An online store was needed for technically complex products, with a cart and online payment for orders.',
      },
      solution: {
        ru: 'Разработал интернет-магазин на 1С-Битрикс: каталог, корзину, оформление заказа и приём оплат онлайн через Яндекс Пэй и OzonPay.',
        en: 'I built the online store on 1C-Bitrix: the catalogue, the cart, checkout and online payments through Yandex Pay and OzonPay.',
      },
      outcome: {
        ru: 'Покупатель собирает заказ в корзине и **оплачивает его онлайн**. Заявка сразу попадает к менеджеру.',
        en: 'The buyer puts an order together in the cart and **pays for it online**. The request goes straight to a manager.',
      },
    },
    technicalDetails: {
      lead: { ru: 'Интернет-магазин на 1С-Битрикс (PHP).', en: 'An online store on 1C-Bitrix (PHP).' },
      points: [
        { ru: 'Корзина и оформление заказа', en: 'Cart and checkout' },
        { ru: 'Эквайринг Яндекс Пэй и OzonPay', en: 'Yandex Pay and OzonPay acquiring' },
        { ru: 'Передача заявок в Битрикс24', en: 'Request delivery to Bitrix24' },
      ],
    },
    stack: ['php', 'bitrix', 'yandex-pay', 'ozon-pay', 'bitrix24', 'crm-sync', 'hardening', 'rest', 'js', 'html-css', 'seo', 'sql', 'git'],
  },
  {
    id: 'car-rental',
    icon: 'car',
    visible: true,
    title: {
      ru: 'Автопрокат: сайт бронирования и CRM',
      en: 'Car rental: booking site and CRM',
    },
    kind: { ru: 'Сайт бронирования и CRM', en: 'Booking site and CRM' },
    confidential: true,
    links: [],
    hook: {
      ru: 'Клиент бронирует машину сам, бронь сразу видна менеджеру',
      en: 'Customers book a car themselves, and the manager sees the booking at once',
    },
    story: {
      problem: {
        ru: 'Наличие машин и цены уточняли в переписке, а каждую бронь вели в двух местах: на сайте и в CRM.',
        en: 'Availability and prices were settled over messages, and every booking was kept in two places: on the site and in the CRM.',
      },
      solution: {
        ru: 'Связал сайт с учётом автопарка и CRM. На сайте видны свободные машины с ценами на выбранные даты, у клиента есть личный кабинет.',
        en: 'I linked the site to the fleet records and the CRM. The site shows the cars that are free on the chosen dates, with prices, and the customer has an account area.',
      },
      outcome: {
        ru: 'Клиент выбирает даты и **оформляет бронь без менеджера**. Бронь появляется в CRM сама, без переписки и двойного учёта.',
        en: 'The customer picks dates and **books without a manager**. The booking appears in the CRM by itself, with no back-and-forth and no double bookkeeping.',
      },
    },
    technicalDetails: {
      lead: { ru: 'Разработка на PHP и JavaScript.', en: 'Built with PHP and JavaScript.' },
      points: [
        { ru: 'Интеграция внешнего API учёта автопарка', en: 'Integration with an external fleet management API' },
        {
          ru: 'Синхронизация заявок и статусов между сайтом и CRM',
          en: 'Sync of bookings and statuses between the site and the CRM',
        },
        { ru: 'Личный кабинет и админ-панель заказов', en: 'Customer account area and order admin panel' },
      ],
    },
    stack: ['php', 'js', 'html-css', 'external-api', 'crm-sync', 'rest', 'seo', 'git'],
  },
  {
    id: 'charity-crm',
    icon: 'heartHandshake',
    visible: true,
    title: {
      ru: 'Панель управления сайтом и подопечными',
      en: 'Admin panel for a website and its beneficiaries',
    },
    kind: { ru: 'Панель управления и связка с сайтом', en: 'Admin panel linked to a website' },
    wide: true,
    status: { tone: 'live', label: { ru: 'Сайт работает', en: 'Live' } },
    links: [
      {
        kind: 'site',
        label: { ru: 'darmiloserdiya.ru', en: 'darmiloserdiya.ru' },
        url: 'https://darmiloserdiya.ru',
      },
    ],
    hook: {
      ru: 'Сайт и все подопечные управляются из одной гибкой панели',
      en: 'The website and every beneficiary are managed from one flexible panel',
    },
    story: {
      problem: {
        ru: 'Сайт помогает найти помощь детям, которым она нужна. Для него нужна была гибкая панель управления: вести всех подопечных и задачи по ним и из того же места управлять тем, что показывает сайт.',
        en: 'The website helps children in need find support. It needed a flexible admin panel: one place to keep every beneficiary and the tasks around them, and to control what the website shows.',
      },
      solution: {
        ru: 'Участвую в разработке панели, где команда ведёт подопечных и задачи, а у каждого сотрудника свои права. Проверенные данные уходят на сайт автоматически.',
        en: 'I take part in building a panel where the team keeps beneficiaries and tasks, and each staff member has their own access rights. Verified data goes to the website automatically.',
      },
      outcome: {
        ru: 'Команда ведёт подопечных и задачи в одном месте и **не переносит данные на сайт вручную**. На сайт попадает только проверенное, и история ребёнка быстрее доходит до тех, кто готов помочь.',
        en: 'The team keeps beneficiaries and tasks in one place and **no longer copies data to the website by hand**. Only verified records reach the site, and a child’s story gets to people ready to help sooner.',
      },
    },
    technicalDetails: {
      lead: {
        ru: 'Участие в разработке панели управления на Laravel 12.',
        en: 'Part of the team building the admin panel on Laravel 12.',
      },
      points: [
        { ru: 'Разграничение прав и изоляция данных', en: 'Access rights and data isolation' },
        { ru: 'REST API и синхронизация с WordPress', en: 'REST API and synchronisation with WordPress' },
        { ru: 'Автотесты на Pest и CI/CD', en: 'Pest tests and CI/CD' },
      ],
    },
    stack: ['php', 'laravel', 'sql', 'rest', 'queues', 'pest', 'cicd', 'wordpress', 'crm-sync', 'js', 'html-css', 'seo', 'wp-plugins', 'git'],
  },
  {
    id: 'natura',
    icon: 'scissors',
    visible: true,
    title: { ru: 'Студия кройки и шитья «Натура»', en: 'Natura sewing studio' },
    kind: { ru: 'Сайт студии с нуля', en: 'Studio website, built from scratch' },
    photo: { alt: { ru: 'Сайт студии «Натура»', en: 'Natura studio website' } },
    status: { tone: 'live', label: { ru: 'Сайт работает', en: 'Live' } },
    links: [
      {
        kind: 'site',
        label: { ru: 'naturastudio.ru', en: 'naturastudio.ru' },
        url: 'https://naturastudio.ru',
      },
    ],
    hook: {
      ru: 'Студия сама меняет курсы на сайте и видит, какая реклама приводит учеников',
      en: 'The studio edits its own courses and sees which ads bring students in',
    },
    story: {
      problem: {
        ru: 'Студии был нужен сайт, который команда обновляет без разработчика, и понимание, откуда приходят заявки на обучение.',
        en: 'The studio needed a site its team could update without a developer, and a way to know where enrolment requests come from.',
      },
      solution: {
        ru: 'Сделал сайт с нуля: курсы, галерея работ и заявки на обучение. У каждой заявки отмечен рекламный канал, с которого пришёл человек. Для студии также сделал Telegram-бота и мини-приложение.',
        en: 'I built the site from scratch: courses, a gallery of student work and enrolment requests. Each request is tagged with the ad channel the person came from. I also built a Telegram bot and a mini app for the studio.',
      },
      outcome: {
        ru: '**Команда сама меняет программы и галерею.** По заявкам видно, какие рекламные каналы приводят учеников.',
        en: '**The team edits programmes and the gallery on its own.** The requests show which ad channels bring students in.',
      },
    },
    technicalDetails: {
      lead: { ru: 'Сайт на WordPress (PHP).', en: 'A WordPress site (PHP).' },
      points: [
        { ru: 'Кастомная тема и собственные плагины', en: 'A custom theme and custom plugins' },
        { ru: 'UTM-трекинг заявок', en: 'UTM tracking of requests' },
        { ru: 'SEO, аналитика и защита директорий', en: 'SEO, analytics and directory protection' },
        { ru: 'Telegram-бот и мини-приложение', en: 'Telegram bot and mini app' },
      ],
    },
    stack: ['php', 'wordpress', 'wp-plugins', 'html-css', 'telegram', 'utm', 'seo', 'hardening', 'rest', 'js', 'cicd', 'git'],
  },
  {
    id: 'chatvix',
    icon: 'bot',
    visible: true,
    title: { ru: 'Chatvix AI', en: 'Chatvix AI' },
    kind: {
      ru: 'Запись клиентов и продажи в мессенджерах',
      en: 'Bookings and sales in messengers',
    },
    photo: { alt: { ru: 'Интерфейс Chatvix AI', en: 'Chatvix AI interface' } },
    status: { tone: 'active', label: { ru: 'В развитии', en: 'In development' } },
    links: [],
    hook: {
      ru: 'Клиентов записывают на визит круглосуточно, прямо в мессенджере',
      en: 'Customers get booked for a visit around the clock, right in their messenger',
    },
    story: {
      problem: {
        ru: 'Автосервисам, клиникам и салонам пишут в мессенджеры в любое время. Пока администратор занят или не на смене, клиент уходит к другим.',
        en: 'Car workshops, clinics and salons get messages at any hour. While the administrator is busy or off shift, the customer goes elsewhere.',
      },
      solution: {
        ru: 'Платформа с диспетчером на базе ИИ: он отвечает в мессенджерах и на сайте, считает цену по каталогу, находит свободное время и записывает на визит.',
        en: 'A platform with an AI dispatcher: it answers in messengers and on the website, prices the job from the catalogue, finds a free slot and books the visit.',
      },
      outcome: {
        ru: '**Клиент получает ответ и запись сразу.** Когда нужен человек, диалог переходит к оператору.',
        en: '**The customer gets an answer and a booking straight away.** When a person is needed, the conversation goes to an operator.',
      },
    },
    technicalDetails: {
      lead: {
        ru: 'Backend на FastAPI и кабинет на Next.js, всё запускается в Docker.',
        en: 'A FastAPI backend and a Next.js dashboard, all running in Docker.',
      },
      points: [
        { ru: 'LangChain и LangGraph для логики диспетчера', en: 'LangChain and LangGraph for the dispatcher logic' },
        { ru: 'PostgreSQL 16 с pgvector, Redis', en: 'PostgreSQL 16 with pgvector, Redis' },
        {
          ru: 'Каналы: WhatsApp Cloud API, Telegram, VK, Instagram Direct',
          en: 'Channels: WhatsApp Cloud API, Telegram, VK, Instagram Direct',
        },
      ],
    },
    stack: ['python', 'fastapi', 'postgres', 'redis', 'docker', 'ts', 'rest', 'js', 'html-css', 'seo'],
  },
];

/** The only list the UI may read. A project with `visible: false` stays out of everything. */
export const projects: Project[] = all.filter((p) => p.visible);
