import { fontStyleCreator } from '@/utils/fonts';

export const Colors = {
  ActionBlue: '#3574F4',
  WarningYellow: '#F3AD41',

  Medicle: {
    White: '#FFFFFF',
    Black: '#15161C',
    Primary: '#E7E1D5',
    Orange: '#FFB61B',
    Font: {
      Gray: {
        Light: '#B5B5B5',
        Standard: '#989898',
        SemiDark: '#666666',
        Dark: '#333333',
      },
      Brown: {
        Dark: '#443927',
        Standard: '#97876D',
        Light: '#706148',
      },
      White: '#FFFFFF',
      Black: '#000000',
      Red: '#FF2D2D',
    },
    Gray: {
      Light: '#F2F2F2',
      SemiLight: '#E8E8E8',
      Standard: '#989898',
      Dark: '#454545',
      SemiDark: '#666666',
    },
    Brown: {
      Light: '#FCF4E9',
      SemiLight: '#EDDFCC',
      Standard: '#97876D',
      SemiDark: '#706148',
    },
    Switch: {
      TrackAble: '#FCF4E9',
      TrackEnable: '#F2F2F2',
      thumbAble: '#FFB61B',
      thumbEnable: '#B8BAC1',
    },
    Input: '#F2F2F2',
    InputText: '#989898',
    DisabledBtn: '#989898',

    ModalBackground: '#00000060',
    WarningCard: '#FF2D2D10',
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

export const SECTION_HEADER = fontStyleCreator({
  size: 14,
  weight: 'bold',
  color: Colors.Medicle.Font.Gray.Dark,
});
export const SECTION_CONTENTS = fontStyleCreator({
  size: 11,
  color: Colors.Medicle.Font.Gray.Dark,
});
export const ITEM_INFO_GRAY = fontStyleCreator({
  size: 10,
  color: Colors.Medicle.Font.Gray.Standard,
});

export const DARK_GRAY_10 = fontStyleCreator({
  size: 10,
  color: Colors.Medicle.Font.Gray.Dark,
});
export const DARK_GRAY_12 = fontStyleCreator({
  size: 12,
  color: Colors.Medicle.Font.Gray.Dark,
});
export const DARK_GRAY_14 = fontStyleCreator({
  size: 14,
  color: Colors.Medicle.Font.Gray.Dark,
});

export const DARK_GRAY_BOLD_12 = fontStyleCreator({
  size: 12,
  weight: 'bold',
  color: Colors.Medicle.Font.Gray.Dark,
});
export const DARK_GRAY_BOLD_14 = fontStyleCreator({
  size: 14,
  weight: 'bold',
  color: Colors.Medicle.Font.Gray.Dark,
});
export const DARK_GRAY_BOLD_16 = fontStyleCreator({
  size: 16,
  weight: 'bold',
  color: Colors.Medicle.Font.Gray.Dark,
});
export const DARK_GRAY_BOLD_18 = fontStyleCreator({
  size: 18,
  weight: 'bold',
  color: Colors.Medicle.Font.Gray.Dark,
});

export const STANDARD_GRAY_10 = fontStyleCreator({
  size: 10,
  color: Colors.Medicle.Font.Gray.Standard,
});
export const STANDARD_GRAY_12 = fontStyleCreator({
  size: 12,
  color: Colors.Medicle.Font.Gray.Standard,
});
export const STANDARD_GRAY_14 = fontStyleCreator({
  size: 14,
  color: Colors.Medicle.Font.Gray.Standard,
});

export const LIGHT_GRAY_10 = fontStyleCreator({
  size: 10,
  color: Colors.Medicle.Font.Gray.Light,
});
export const LIGHT_GRAY_12 = fontStyleCreator({
  size: 12,
  color: Colors.Medicle.Font.Gray.Light,
});
export const LIGHT_GRAY_14 = fontStyleCreator({
  size: 14,
  color: Colors.Medicle.Font.Gray.Light,
});
export const LIGHT_GRAY_16 = fontStyleCreator({
  size: 16,
  color: Colors.Medicle.Font.Gray.Light,
});

export const ORANGE_BOLD_10 = fontStyleCreator({
  size: 10,
  weight: 'bold',
  color: Colors.Medicle.Orange,
});
export const ORANGE_BOLD_12 = fontStyleCreator({
  size: 12,
  weight: 'bold',
  color: Colors.Medicle.Orange,
});
export const ORANGE_BOLD_16 = fontStyleCreator({
  size: 16,
  weight: 'bold',
  color: Colors.Medicle.Orange,
});
export const ORANGE_BOLD_14 = fontStyleCreator({
  size: 14,
  weight: 'bold',
  color: Colors.Medicle.Orange,
});

export const WHITE_BOLD_12 = fontStyleCreator({
  size: 12,
  weight: 'bold',
  color: Colors.Medicle.White,
});
