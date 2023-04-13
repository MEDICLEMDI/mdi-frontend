import Routes from '@/navigation/Routes';
import i18n from "@/config/i18n";

export const tabs = (t) => [
  { label: t('category.dental') },
  // { label: t('category.cosmetic') },
]

export const dentist = (t) => [
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

export const subscribe = (t) => [
  { name: t('category.implant'), route: Routes.HOSPITAL },
  { name: t('category.crown'), route: Routes.HOSPITAL },
  { name: t('category.cavity'), route: Routes.HOSPITAL },
  { name: t('category.scaling'), route: Routes.HOSPITAL },
  { name: t('category.denture'), route: Routes.HOSPITAL },
  { name: t('category.tmj'), route: Routes.HOSPITAL },
  { name: t('category.whitening'), route: Routes.HOSPITAL },
  { name: t('category.braces'), route: Routes.HOSPITAL },
  { name: t('category.laminate'), route: Routes.HOSPITAL },
  { name: '병원', route: Routes.HOSPITAL },
];

export const dermatology = (t) => [
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
  { icon: '', name: '', route: '' },
];
