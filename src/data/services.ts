import type { IconName } from '../icons';
import type { L } from '../types';

export interface Service {
  id: string;
  icon: IconName;
  title: L;
  /** What the business gets, in plain words. */
  text: L;
  /** Visible cases that show this kind of work; may be empty. */
  projectIds: string[];
}

// Order matters: the first rows are what clients ask for most.
export const services: Service[] = [
  {
    id: 'sites',
    icon: 'globe',
    title: { ru: 'Сайты', en: 'Websites' },
    text: {
      ru: 'Сайт компании, каталог или интернет-магазин под ключ. Вы сами меняете разделы, цены и программы без разработчика и видите, откуда приходят заявки.',
      en: 'A company site, a catalogue or an online store, delivered end to end. You change sections, prices and programmes without a developer and see where requests come from.',
    },
    projectIds: ['natura', 'swageda', 'ecommerce'],
  },
  {
    id: 'telegram',
    icon: 'send',
    title: { ru: 'Telegram-боты и мини-приложения', en: 'Telegram bots and mini apps' },
    text: {
      ru: 'Бот или мини-приложение внутри Telegram: клиент получает то же, что на сайте, не выходя из мессенджера.',
      en: 'A bot or a mini app inside Telegram: the customer gets what the site offers without leaving the messenger.',
    },
    projectIds: ['swageda', 'natura'],
  },
  {
    id: 'backend',
    icon: 'server',
    title: { ru: 'Серверная часть и API', en: 'Server side and APIs' },
    text: {
      ru: 'Каталог, поиск, личные кабинеты, API для сайта или приложения. Страницы открываются быстро, даже когда данных много.',
      en: 'Catalogue, search, account areas, an API for a site or an app. Pages open quickly even when there is a lot of data.',
    },
    projectIds: ['swageda'],
  },
  {
    id: 'payments',
    icon: 'creditCard',
    title: { ru: 'Онлайн-оплата на сайте', en: 'Online payments on your site' },
    text: {
      ru: 'Подключу корзину и приём платежей: покупатель оформляет заказ и оплачивает его прямо на сайте.',
      en: 'I add a cart and payment providers: the buyer places an order and pays for it right on the site.',
    },
    projectIds: ['ecommerce'],
  },
  {
    id: 'crm',
    icon: 'workflow',
    title: { ru: 'Связка сайта с CRM и другими сервисами', en: 'Your site linked to a CRM and other services' },
    text: {
      ru: 'Заявки и брони с сайта сразу попадают в CRM, а статусы возвращаются на сайт. Данные не приходится вводить дважды.',
      en: 'Requests and bookings from the site land in the CRM right away, and statuses come back to the site. Nobody enters the same data twice.',
    },
    projectIds: ['car-rental'],
  },
  {
    id: 'panel',
    icon: 'layoutDashboard',
    title: { ru: 'Панель управления под ваши процессы', en: 'An admin panel shaped to your processes' },
    text: {
      ru: 'Клиенты, заказы или подопечные, задачи и права сотрудников в одном месте. Нужные данные уходят на сайт автоматически.',
      en: 'Customers, orders or beneficiaries, tasks and staff access rights in one place. The data you choose goes to the site automatically.',
    },
    projectIds: ['charity-crm'],
  },
  {
    id: 'other',
    icon: 'messagesSquare',
    title: { ru: 'Другое, по согласованию', en: 'Something else, by agreement' },
    text: {
      ru: 'Если вашей задачи нет в списке, опишите её. Скажу, возьмусь ли, и во что это обойдётся.',
      en: 'If your task is not on the list, describe it. I will say whether I can take it on and what it would cost.',
    },
    projectIds: [],
  },
];
