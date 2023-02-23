import Routes from '@/navigation/Routes';
import i18n from "@/config/i18n";

export const tabs = [
  { label: i18n.t('category.dental') },
  { label: i18n.t('category.cosmetic') },
]

export const dentist = [
  { icon: 'implant', name: i18n.t('category.implant'), route: Routes.HOSPITAL },
  { icon: 'crown', name: i18n.t('category.crown'), route: Routes.HOSPITAL },
  { icon: 'cavity', name: i18n.t('category.cavity'), route: Routes.HOSPITAL },
  { icon: 'scaling', name: i18n.t('category.scaling'), route: Routes.HOSPITAL },
  { icon: 'denture', name: i18n.t('category.denture'), route: Routes.HOSPITAL },
  { icon: 'tmj', name: i18n.t('category.tmj'), route: Routes.HOSPITAL },
  { icon: 'whitening', name: i18n.t('category.whitening'), route: Routes.HOSPITAL },
  { icon: 'braces', name: i18n.t('category.braces'), route: Routes.HOSPITAL },
  { icon: 'laminate', name: i18n.t('category.laminate'), route: Routes.HOSPITAL },
];

export const dermatology = [
  { icon: 'skin', name: i18n.t('category.skin'), route: Routes.HOSPITAL },
  { icon: 'face', name: i18n.t('category.face'), route: Routes.HOSPITAL },
  { icon: 'eyes', name: i18n.t('category.eyes'), route: Routes.HOSPITAL },
  { icon: 'nose', name: i18n.t('category.nose'), route: Routes.HOSPITAL },
  { icon: 'mouse', name: i18n.t('category.lip'), route: Routes.HOSPITAL },
  { icon: 'forehead', name: i18n.t('category.forehead'), route: Routes.HOSPITAL },
  { icon: 'chest', name: i18n.t('category.chest'), route: Routes.HOSPITAL },
  { icon: 'back', name: i18n.t('category.bodyline'), route: Routes.HOSPITAL },
  { icon: 'waxing', name: i18n.t('category.hair1'), route: Routes.HOSPITAL },
  { icon: 'hair', name: i18n.t('category.hair2'), route: Routes.HOSPITAL },
  { icon: 'tooth', name: i18n.t('category.teeth'), route: Routes.HOSPITAL },
  { icon: 'ear', name: i18n.t('category.ear'), route: Routes.HOSPITAL },
  { icon: 'yzone', name: i18n.t('category.yzone'), route: Routes.HOSPITAL },
  { icon: 'etc', name: i18n.t('category.etc'), route: Routes.HOSPITAL },
  { icon: '', name: '', route: '' },
];
