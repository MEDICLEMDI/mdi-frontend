import { Buffer } from 'buffer';

export const delay = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export function bufferToBase64(buf) {
  return Buffer.from(buf.buffer).toString('base64');
}

export function base64ToBuffer(base64) {
  return Buffer.from(base64, 'base64');
}

export function uniqueConcat(a, b) {
  return [...new Set([...a, ...b])];
}

export const convertPrice = (price) => {
  if(price === undefined) return 0;

  if(Number(price) < 10000) {
    return `${price.toLocaleString()}원`;
  }
  const priceLength = price.toString().length;
  const convertPrice = price.toString().substring(0, (priceLength - 4));
  return `${convertPrice.toLocaleString()}만원`;
}
