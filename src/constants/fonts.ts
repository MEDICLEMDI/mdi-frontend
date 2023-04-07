import { Colors } from '@/constants/theme';
import { StringObject } from '@/interfaces/general';
import { fontStyleCreator } from '@/utils/fonts';

// FONTS
export const Inter = 'Inter';

// WEIGHTS
export const REGULAR = 'Regular';
export const MEDIUM = 'Medium';
export const SEMIBOLD = 'SemiBold';

const REGULAR_WEIGHT = '400';
const MEDIUM_WEIGHT = '500';
const SEMIBOLD_WEIGHT = '600';

export const weights: StringObject = {
  [REGULAR]: REGULAR_WEIGHT,
  [SEMIBOLD]: SEMIBOLD_WEIGHT,
  [MEDIUM]: MEDIUM_WEIGHT,
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
