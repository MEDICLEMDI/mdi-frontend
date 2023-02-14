import Routes from '@/navigation/Routes';

export const dentist = t => {
  return [
    { icon: 'implant', name: t('category.implant'), route: Routes.HOSPITAL },
    { icon: 'crown', name: t('category.crown'), route: Routes.HOSPITAL },
    { icon: 'cavity', name: t('category.cavity'), route: Routes.HOSPITAL },
    { icon: 'scaling', name: t('category.scaling'), route: Routes.HOSPITAL },
    { icon: 'denture', name: t('category.denture'), route: Routes.HOSPITAL },
    { icon: 'tmj', name: t('category.tmj'), route: Routes.HOSPITAL },
    { icon: 'whitening', name: t('category.whitening'), route: Routes.HOSPITAL },
    { icon: 'braces', name: t('category.braces'), route: Routes.HOSPITAL },
    { icon: 'laminate', name: t('category.laminate'), route: Routes.HOSPITAL },
  ];
};

export const dermatology = t => {
  return [
    { icon: 'skin', name: t('category.skin'), route: Routes.HOSPITAL },
    { icon: 'face', name: t('category.face'), route: Routes.HOSPITAL },
    { icon: 'eyes', name: t('category.eyes'), route: Routes.HOSPITAL },
    { icon: 'nose', name: t('category.nose'), route: Routes.HOSPITAL },
    { icon: 'mouse', name: t('category.lip'), route: Routes.HOSPITAL },
    { icon: 'forehead', name: t('category.forehead'), route: Routes.HOSPITAL },
    { icon: 'chest', name: t('category.chest'), route: Routes.HOSPITAL },
    { icon: 'back', name: t('category.bodyline'), route: Routes.HOSPITAL },
    { icon: 'waxing', name: t('category.hair1'), route: Routes.HOSPITAL },
    { icon: 'hair', name: t('category.hair2'), route: Routes.HOSPITAL },
    { icon: 'tooth', name: t('category.teeth'), route: Routes.HOSPITAL },
    { icon: 'ear', name: t('category.ear'), route: Routes.HOSPITAL },
    { icon: 'yzone', name: t('category.yzone'), route: Routes.HOSPITAL },
    { icon: 'etc', name: t('category.etc'), route: Routes.HOSPITAL },
    { icon: 'etc', name: '', route: '' },
  ];
};

export const profileMenus = (t): any => {
  return [
    {
      icon: 'coin',
      name: t('menus.point'),
      route: Routes.POINT,
      header: t('menus.header.point'),
    },
    {
      icon: 'book',
      name: t('menus.receipt'),
      route: Routes.RECEIPT,
      header: t('menus.header.receipt'),
    },
    {
      icon: 'heart',
      name: t('menus.subscribe'),
      route: Routes.SUBSCRIBE,
      header: t('menus.header.subscribe'),
    },
    {
      icon: 'notePlus',
      name: t('menus.chart'),
      route: Routes.CHART,
      header: t('menus.header.chart'),
    },
    {
      icon: 'hospital',
      name: t('menus.medicalState'),
      route: Routes.MEDICAL_STATE,
      header: t('menuss.header.medicalState'),
    },
    {
      icon: 'faq',
      name: t('menus.faq'),
      route: Routes.FAQ,
      header: t('menus.header.faq'),
    },
    {
      icon: 'exchange',
      name: t('menus.exchange'),
      route: Routes.EXCHANGE,
      header: t('menus.header.exchange'),
    },
    {
      icon: 'community',
      name: t('menus.community'),
      route: Routes.COMMUNITY,
      header: t('menus.header.community'),
    },
    {
      icon: 'settings',
      name: t('menus.settings'),
      route: Routes.SERVICE_SETTINGS,
      header: t('menus.header.settings'),
    },
  ];
};
