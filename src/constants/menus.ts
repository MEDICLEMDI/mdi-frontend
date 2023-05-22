import Routes from '@/navigation/Routes';


export const myPageMenus = (t) => [
  {
    icon: 'coin',
    name: t('menus.point'),
    route: Routes.POINT,
  },
  {
    icon: 'book',
    name: t('menus.receipt'),
    route: Routes.RECEIPT,
  },
  {
    icon: 'heart',
    name: t('menus.subscribe'),
    route: Routes.SUBSCRIBE,
  },
  {
    icon: 'notePlus',
    name: t('menus.chart'),
    route: Routes.CHART,
  },
  // {
  //   icon: 'hospital',
  //   name: t('menus.medicalState'),
  //   route: Routes.MEDICAL_STATE,
  // },
  {
    icon: 'faq',
    name: t('menus.faq'),
    route: Routes.FAQ,
  },
  {
    icon: 'exchange',
    name: t('menus.exchange'),
    route: Routes.EXCHANGE,
  },
  {
    icon: 'community',
    name: t('menus.community'),
    route: Routes.COMMUNITY,
  },
  {
    icon: 'settings',
    name: t('menus.settings'),
    route: Routes.SERVICE_SETTINGS,
  },
  {
    icon: 'wallet',
    name: '지갑',
    route: Routes.WALLET,
  },
];
