import * as React from 'react';
import CalendarPicker from 'react-native-calendar-picker';

import { Colors } from '@/constants/theme';
import Icon from '@/icons';
import { dateZeroFill } from '@/utils/dates';

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
  const dataPickerListener = (moment: any) => {
    let year = dateZeroFill(moment.year());
    let month = dateZeroFill(moment.month() + 1);
    let day = dateZeroFill(moment.date());

    dateResponse({
      ...date,
      [dateType]: `${year}-${month}-${day}`,
    });
  };

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
      onDateChange={moment => dataPickerListener(moment)}
      previousComponent={<Icon name="arrowLeft" />}
      nextComponent={<Icon name="arrowRight" />}
      selectedDayTextColor={Colors.Medicle.White}
      selectedDayColor="#FFB61B"
      textStyle={{ color: Colors.Medicle.Font.Gray.Dark }}
      todayBackgroundColor="#888"
      minDate={minDate}
      maxDate={maxDate}
      restrictMonthNavigation={true}
      weekdays={week}
      months={month}
      width={310}
      height={310}
      initialDate={new Date(initialDate)}
    />
  );
};

export default Calendar;
