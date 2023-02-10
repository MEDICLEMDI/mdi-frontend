import { StyleSheet } from 'react-native';

import { fontMaker } from '@/utils/fonts';

import { MEDIUM, REGULAR, SEMIBOLD } from './fonts';

export const Colors = {
  ActionBlue: '#3574F4',
  WarningYellow: '#F3AD41',
  Medicle: {
    White: '#FFFFFF',
    Black: '#15161C',
    Beige: '#E7E1D5',
    Font: {
      Grey: {
        Light: '#B5B5B5',
        Standard: '#989898',
        Dark: '#666666',
      },
    },
    Grey: {
      Light: '#E8E8E8',
      Standard: '#989898',
      Dark: '#454545',
    },
    Input: '#F2F2F2',
    InputText: '#989898',
    DisabledBtn: '#989898',
  },
  Black: {
    Primary: '#15161C',
    Secondary: '#1E1F27',
    Pure: '#000000',
    PrimaryTransparent: '#15161C00',
  },
  White: {
    Pure: '#FFFFFF',
    Primary: '#E1E8FD',
    Secondary: '#7A7E8B',
  },
  Gray: {
    Primary: '#33343A',
    Secondary: '#23242A',
    Tertiary: '#292929',
    Pure: '#616571',
  },
  Rainbow: {
    Red: '#FB5DC3',
    Yellow: '#FDB943',
    Blue: '#36C3E9',
    Purple: '#CF6ED3',
    Green: '#09DF66',
    Teal: '#05DCC8',
  },
  Red: '#FF453A',
  Divider: {
    1: '#3A3B40',
    2: '#737377',
  },
  Toast: {
    Success: ['#4A763B', '#54AA46'],
    Error: ['#9D2F4A', '#EC4765'],
    Info: ['#2F539D', '#477DEC'],
  },
};

export const Rainbow = {
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 1,
    y: 1,
  },
  colors: ['rgba(1, 1, 1, 0.0)', 'rgba(1, 1, 1, 0.0)'],
};

export const TransparentGradient = {
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 1,
    y: 1,
  },
  colors: ['transparent', 'transparent'],
};

export const DisabledRainbow = {
  start: {
    x: 0,
    y: 0,
  },
  end: {
    x: 1,
    y: 1,
  },
  colors: [
    'rgba(255, 231, 1, 0.2)',
    'rgba(250, 81, 211, 0.2)',
    'rgba(16, 217, 237, 0.2)',
    'rgba(82, 255, 83, 0.2)',
  ],
};

// TODO: Remove styles that doesnt match with the style guide in figma, and remove colors
export const FontStyles = StyleSheet.create({
  Medicle: fontMaker({ size: 16, weight: MEDIUM, color: Colors.Medicle.Black }),
  Base: fontMaker({ size: 14, weight: REGULAR }),
  Title: fontMaker({ size: 22, weight: SEMIBOLD, color: Colors.Medicle.Black }),
  Title2: fontMaker({
    size: 24,
    weight: SEMIBOLD,
    color: Colors.White.Primary,
  }),
  Normal: fontMaker({ size: 16, weight: MEDIUM, color: Colors.Medicle.Black }),
  NormalGray: fontMaker({
    size: 16,
    weight: REGULAR,
    color: Colors.White.Secondary,
  }),
  Small: fontMaker({
    size: 14,
    weight: MEDIUM,
    color: Colors.White.Primary,
  }),
  SmallGray: fontMaker({
    size: 14,
    weight: REGULAR,
    color: Colors.White.Secondary,
  }),
  Smaller: fontMaker({
    size: 12,
    weight: REGULAR,
    color: Colors.White.Primary,
  }),
  SmallerGray: fontMaker({
    size: 12,
    weight: MEDIUM,
    color: Colors.White.Secondary,
  }),
  Headline1: fontMaker({ size: 28, weight: SEMIBOLD }),
  Headline2: fontMaker({ size: 24, weight: REGULAR }),
  Subtitle1: fontMaker({
    size: 20,
    weight: SEMIBOLD,
    color: Colors.White.Primary,
  }),
  profileTitle: fontMaker({
    size: 20,
    weight: SEMIBOLD,
    color: Colors.Medicle.Black,
  }),
  Subtitle2: fontMaker({
    size: 18,
    weight: SEMIBOLD,
    color: Colors.White.Primary,
  }),
  ModalTitle: fontMaker({
    size: 18,
    weight: SEMIBOLD,
    color: Colors.Medicle.Black,
  }),
  Subtitle3: fontMaker({
    size: 16,
    weight: SEMIBOLD,
    color: Colors.White.Secondary,
  }),
  Body1: fontMaker({ size: 17, weight: REGULAR }),
  Body2: fontMaker({ size: 17, weight: MEDIUM }),
  Button: fontMaker({ size: 20, weight: SEMIBOLD, color: Colors.White.Pure }),
  Caption: fontMaker({ size: 14, weight: MEDIUM }),
  Overline: fontMaker({ size: 10, weight: REGULAR }),
});
