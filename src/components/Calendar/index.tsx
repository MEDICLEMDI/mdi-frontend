import * as React from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import { Colors } from '@/constants/theme';
import Icon from '@/icons';
import { dateZeroFill } from '@/utils/dates';

/**
 * Calendar
 * @param {string} date - 설정된 날짜의 from, to
 * @param {string} dateResponse - 데이터를 반환할 react state
 * @param {string} dateType - "from" | "to" 선언된 날짜 타입에 맞추어 state에 할당할 때 사용
 * @param {string} textColor
 * @param {string} initialDate - 초기화 할 기본 날짜
 * @param {Date} minDate - 선택 가능한 최소 날짜
 * @param {Date} maxDate - 선택 가능한 최대 날짜
 * @comment 메디클에서 사용하는 기본 달력 컴포넌트입니다. react-native-calendar-picker 패키지를 사용하여 작성되었습니다.
 */
const Calendar = ({
  date,
  dateResponse,
  dateType,
  initialDate,
  minDate,
  maxDate,
}: {
  date: { from: string; to?: string };
  dateResponse: React.ComponentState;
  dateType: string;
  initialDate: string;
  minDate?: Date;
  maxDate?: Date;
}) => {

  // 선택된 날짜의 형식을 변환하여 string으로 dateResponse에 설정된 state에 할당합니다.
  const dataPickerListener = (moment: any) => {
    let year = dateZeroFill(moment.year());
    let month = dateZeroFill(moment.month() + 1);
    let day = dateZeroFill(moment.date());

    dateResponse({
      ...date,
      [dateType]: `${year}-${month}-${day}`,
    });
  };

  // 달력 기본 설정입니다.
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const month = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];

  return (
    <CalendarPicker
      onDateChange={moment => dataPickerListener(moment)} // react state
      previousComponent={<Icon name="arrowLeft" />} // 이전 달 이동버튼
      nextComponent={<Icon name="arrowRight" />} // 다음 달 이동 버튼
      selectedDayTextColor={Colors.Medicle.White} // 선택된 날짜의 텍스트 색상
      selectedDayColor="#FFB61B" // 선택된 날짜의 배경 색상
      textStyle={{ color: Colors.Medicle.Font.Gray.Dark }} // 전체 텍스트 스타일
      todayBackgroundColor="#888" // 오늘 날짜의 배경 색상
      minDate={minDate} // 선택 가능한 최소날짜
      maxDate={maxDate} // 선택 가능한 최대날짜
      restrictMonthNavigation={true} // 선택이 불가능한 월로 이동이 불가능하도록
      weekdays={week} // 날짜 표기 설정
      months={month} // 월 표기 설정
      width={310} // 달력 너비
      height={310} // 달력 높이
      initialDate={new Date(initialDate)} // 기본 날짜
    />
  );
};

export default Calendar;
