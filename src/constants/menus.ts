import Routes from '@/navigation/Routes';
import i18n from "@/config/i18n";


export const myPageMenus = [
  {
    icon: 'coin',
    name: i18n.t('menus.point'),
    route: Routes.POINT,
    header: i18n.t('menus.header.point'),
  },
  {
    icon: 'book',
    name: i18n.t('menus.receipt'),
    route: Routes.RECEIPT,
    header: i18n.t('menus.header.receipt'),
  },
  {
    icon: 'heart',
    name: i18n.t('menus.subscribe'),
    route: Routes.SUBSCRIBE,
    header: i18n.t('menus.header.subscribe'),
  },
  {
    icon: 'notePlus',
    name: i18n.t('menus.chart'),
    route: Routes.CHART,
    header: i18n.t('menus.header.chart'),
  },
  {
    icon: 'hospital',
    name: i18n.t('menus.medicalState'),
    route: Routes.MEDICAL_STATE,
    header: i18n.t('menuss.header.medicalState'),
  },
  {
    icon: 'faq',
    name: i18n.t('menus.faq'),
    route: Routes.FAQ,
    header: i18n.t('menus.header.faq'),
  },
  {
    icon: 'exchange',
    name: i18n.t('menus.exchange'),
    route: Routes.EXCHANGE,
    header: i18n.t('menus.header.exchange'),
  },
  {
    icon: 'community',
    name: i18n.t('menus.community'),
    route: Routes.COMMUNITY,
    header: i18n.t('menus.header.community'),
  },
  {
    icon: 'settings',
    name: i18n.t('menus.settings'),
    route: Routes.SERVICE_SETTINGS,
    header: i18n.t('menus.header.settings'),
  },
];
