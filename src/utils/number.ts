import { getNumberFormatSettings } from 'react-native-localize';

export const { decimalSeparator, groupingSeparator: thousandSeparator } =
  getNumberFormatSettings();

/**
 * @param amount Number to be truncated
 * @param decimals Number of digits after the decimal point. If null, returns integer part
 * @returns Returns a string representing a number in fixed-point notation.
 * Based on https://stackoverflow.com/a/11818658
 */
export function truncate(amount: number, decimals?: number): string {
  var re = new RegExp('^-?\\d+(?:.\\d{0,' + (decimals || -1) + '})?');
  const match = amount.toString().match(re);
  return match![0];
}

export function parseLocaleNumber(stringNumber: string) {
  return Number(
    stringNumber
      .replace(new RegExp(`\\${thousandSeparator}`, 'g'), '')
      .replace(new RegExp(`\\${decimalSeparator}`), '.')
  );
}

export function toFixedLocale(value: number, numDigits: number): string {
  const standardFixedString = value.toFixed(numDigits);

  if (decimalSeparator === ',') {
    return standardFixedString.replace('.', ',');
  } else {
    return standardFixedString; // Locale matches JavaScript default
  }
}