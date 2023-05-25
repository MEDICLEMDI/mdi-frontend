import { Colors } from "@/constants/theme";

/**
 * 커스텀 폰트 생성
 * @param options 
 * @returns 
 */
export const fontStyleCreator = (options: {
  color?: string | undefined;
  size?: number | undefined;
  weight?: 'bold' | 'normal' | undefined;
}) => {
  const { color, size, weight } = options;
  return {
    color: color === undefined ? Colors.Medicle.Black : color,
    fontSize: size === undefined ? 14 : size,
    fontWeight: weight === undefined ? 'normal' : weight,
  };
};
