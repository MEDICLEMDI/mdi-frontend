import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';

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

export const defaultDate = () => {
  const toDay = new Date();
  const year = dateZeroFill(toDay.getFullYear());
  const month = dateZeroFill(toDay.getMonth() + 1);
  const day = dateZeroFill(toDay.getDate());
  const startDate = `${year}-${month}-${day}`;
  const endDate = `${year}-${month}-${day}`;
  return { from: startDate, to: endDate };
};