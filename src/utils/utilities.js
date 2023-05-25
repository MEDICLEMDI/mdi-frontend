/**
 * 함수 지연실행
 * @param {*} ms 
 * @returns 
 */
export const delay = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * 두개의 배열 합집합
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
export function uniqueConcat(a, b) {
  return [...new Set([...a, ...b])];
}

/**
 * 단위 format
 * @param {*} price 
 * @returns 
 */
export const convertPrice = price => {
  if (price === undefined) {
    return 0;
  }

  if (Number(price) < 10000) {
    return `${price.toLocaleString()}원`;
  }
  const priceLength = price.toString().length;
  const _convertPrice = price.toString().substring(0, priceLength - 4);
  return `${Number(_convertPrice).toLocaleString('en-US')}만원`;
};

/**
 * 단위 format
 * @param {*} price 
 * @returns 
 */
export const convertNumberLocale = (price) => {
  if (typeof price === 'number') {
    return price.toLocaleString('en-US') + '원';
  }
  if (typeof price === 'string') {
    return Number(price).toLocaleString('en-US') + '원';
  }
};
