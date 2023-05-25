import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from 'dayjs/plugin/utc';

export const formatDate = (date, format) => {
  dayjs.extend(advancedFormat);
  return dayjs(date).format(format);
};

/**
 * MMM Do, YYYY 형식 반환
 * @param {*} date 
 * @returns 
 */
export const formatLongDate = date => {
  dayjs.extend(customParseFormat);
  return dayjs(date).format('MMM Do, YYYY');
};

/**
 * 1~9 앞에 0 변환 ex) 1일 => 01일
 * @param {*} date 
 * @returns 
 */
export const dateZeroFill = date => {
  return date.toString().padStart(2, '0');
};

/**
 * 시작일, 종료일 설정
 * @param {*} value 
 * @param {*} type 
 * @returns 
 */
export const dateSetup = (value=0, type='day') => {
  dayjs.extend(utc);
  const format = 'YYYY-MM-DD'
  const toDay = dayjs(new Date()).utc(true);
  const startDay = toDay.clone().subtract(value, type).format(format);
  const endDay = toDay.clone().format(format);
  return { from: startDay, to: endDay };
};

/**
 * 시작일,종료일 검사
 * @param {*} date 
 * @returns 
 */
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