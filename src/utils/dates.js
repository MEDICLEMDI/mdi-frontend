import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';

export const formatDate = (date, format) => {
  dayjs.extend(advancedFormat);
  return dayjs(date).format(format);
};

export const formatLongDate = date => {
  dayjs.extend(customParseFormat);
  return dayjs(date).format('MMM Do, YYYY');
};

export const dateZeroFill = date => {
  return date.toString().padStart(2, '0');
};

export const dateSetup = (value=0, type='day') => {
  dayjs.extend(utc);
  const format = 'YYYY-MM-DD'
  const toDay = dayjs(new Date()).utc(true);
  const startDay = toDay.clone().subtract(value, type).format(format);
  const endDay = toDay.clone().format(format);
  return { from: startDay, to: endDay };
};

export const compareDate = (date) => {
  dayjs.extend(utc);
  const startDate = dayjs(date.from).utc(true);;
  const endDate = dayjs(date.to).utc(true);;

  if(startDate < endDate) {
    return { from: date.from, to: date.to }
  } else {
    return { from: date.to, to: date.from }
  }
}