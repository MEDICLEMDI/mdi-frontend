export const dentist = t => {
  return [
    { icon: 'implant', name: t('category.implant') },
    { icon: 'crown', name: t('category.crown') },
    { icon: 'cavity', name: t('category.cavity') },
    { icon: 'scaling', name: t('category.scaling') },
    { icon: 'denture', name: t('category.denture') },
    { icon: 'tmj', name: t('category.tmj') },
    { icon: 'whitening', name: t('category.whitening') },
    { icon: 'braces', name: t('category.braces') },
    { icon: 'laminate', name: t('category.laminate') },
  ];
};

export const dermatology = t => {
  return [
    { icon: 'skin', name: t('category.skin') },
    { icon: 'face', name: t('category.face') },
    { icon: 'eyes', name: t('category.eyes') },
    { icon: 'nose', name: t('category.nose') },
    { icon: 'mouse', name: t('category.lip') },
    { icon: 'forehead', name: t('category.forehead') },
    { icon: 'chest', name: t('category.chest') },
    { icon: 'back', name: t('category.bodyline') },
    { icon: 'waxing', name: t('category.hair1') },
    { icon: 'hair', name: t('category.hair2') },
    { icon: 'tooth', name: t('category.teeth') },
    { icon: 'ear', name: t('category.ear') },
    { icon: 'yzone', name: t('category.yzone') },
    { icon: 'etc', name: t('category.etc') },
    { icon: 'etc', name: '' },
  ];
};

export const profileMenus = t => {
  return [
    {
      icon: 'coin',
      name: t('menus.point'),
      route: 'Point',
      header: t('menus.header.point'),
    },
    {
      icon: 'book',
      name: t('menus.receipt'),
      route: 'Receipt',
      header: t('menus.header.receipt'),
    },
    {
      icon: 'heart',
      name: t('menus.subscribe'),
      route: 'Subscribe',
      header: t('menus.header.subscribe'),
    },
    {
      icon: 'notePlus',
      name: t('menus.chart'),
      route: 'Chart',
      header: t('menus.header.chart'),
    },
    {
      icon: 'hospital',
      name: t('menus.medicalState'),
      route: 'MedicalState',
      header: t('menuss.header.medicalState'),
    },
    {
      icon: 'faq',
      name: t('menus.faq'),
      route: 'FAQ',
      header: t('menus.header.faq'),
    },
    {
      icon: 'exchange',
      name: t('menus.exchange'),
      route: 'Exchange',
      header: t('menus.header.exchange'),
    },
    {
      icon: 'community',
      name: t('menus.community'),
      route: 'Community',
      header: t('menus.header.community'),
    },
    {
      icon: 'settings',
      name: t('menus.settings'),
      route: 'serviceSettings',
      header: t('menus.header.settings'),
    },
  ];
};
