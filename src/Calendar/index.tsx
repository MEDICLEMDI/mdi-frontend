import Icon from "@/icons";
import {Colors} from "@/constants/theme";
import CalendarPicker from "react-native-calendar-picker";
import * as React from "react";
import {dateZeroFill} from "@/utils/dates";

const Calendar = ({
  date,
  dateResponse,
  dateType,
}:{
  date: {from: string, to?: string};
  dateResponse: React.ComponentState;
  dateType: string;
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
  const month = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  return (
    <CalendarPicker
      onDateChange={moment => dataPickerListener(moment)}
      previousComponent={<Icon name="arrowLeft" />}
      nextComponent={<Icon name="arrowRight" />}
      selectedDayTextColor={Colors.Medicle.White}
      selectedDayColor="#FFB61B"
      textStyle={{ color: Colors.Medicle.Font.Gray.Dark }}
      weekdays={week}
      months={month}
      width={310}
      height={310}
    />
  )
}

export default Calendar;
