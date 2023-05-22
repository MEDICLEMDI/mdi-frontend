export const delay = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export function uniqueConcat(a, b) {
  return [...new Set([...a, ...b])];
}

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

export const convertNumberLocale = price => {
  if (typeof price === 'number') {
    return price.toLocaleString('en-US') + '원';
  }
  if (typeof price === 'string') {
    return Number(price).toLocaleString('en-US') + '원';
  }
};
