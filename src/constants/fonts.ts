import { StringObject } from '@/interfaces/general';
import {fontStyleCreator} from "@/utils/fonts";
import {Colors} from "@/constants/theme";

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

export const PRODUCT_GROUP = fontStyleCreator({
  size: 12,
  color: Colors.Medicle.Font.Brown.Dark,
});
export const PRODUCT_COMPANY = fontStyleCreator({
  size: 16,
  weight: 'bold',
  color: Colors.Medicle.Font.Brown.Dark,
});
export const PRODUCT_INFO_BROWN = fontStyleCreator({
  size: 10,
  color: Colors.Medicle.Font.Brown.Dark,
});
export const PRODUCT_PRICE = fontStyleCreator({
  size: 16,
  weight: 'bold',
  color: Colors.Medicle.Font.Brown.Dark,
});
export const PRODUCT_PRICE_LARGE = fontStyleCreator({
  size: 18,
  weight: 'bold',
  color: Colors.Medicle.Font.Brown.Dark,
});
export const PRODUCT_PRICE_DISCOUNT = fontStyleCreator({
  size: 12,
  weight: 'bold',
  color: Colors.Medicle.Orange,
})
export const PRODUCT_PRICE_DISCOUNT_LARGE = fontStyleCreator({
  size: 14,
  weight: 'bold',
  color: Colors.Medicle.Orange,
})
export const PRODUCT_INFO_GRAY = fontStyleCreator({
  size: 10,
  color: Colors.Medicle.Font.Gray.Standard,
});
export const PRODUCT_REVIEW_COUNT = fontStyleCreator({
  size: 10,
  weight: 'bold',
  color: Colors.Medicle.Orange,
})
