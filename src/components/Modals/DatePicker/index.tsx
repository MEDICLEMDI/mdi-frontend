import { Portal } from '@gorhom/portal';
import * as React from 'react';
import {
  GestureResponderEvent,
  Modal,
  ModalBaseProps,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import BoxDropShadow from '@/components/BoxDropShadow';
import { Colors } from '@/constants/theme';
import Icon from '@/icons';
import { compareDate, dateZeroFill } from '@/utils/dates';
import { fontStyleCreator } from '@/utils/fonts';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Calendar from '../../Calendar';
import style from './style';
import { ManipulateType } from 'dayjs';
import { dateSetup } from '@/utils/dates';
import Spacing from '@/components/Spacing';

interface ModalProps extends ModalBaseProps {
  name: string;
  modalDirection: 'flex-start' | 'center' | 'flex-end';
  dateResponse: React.ComponentState;
  submitEvent: ((event: GestureResponderEvent) => void) | undefined;
  resetEvent: ((event: GestureResponderEvent) => void) | undefined;
}

/**
 * DatePicker
 * @param {string} name
 * @param {'flex-start' | 'center' | 'flex-end'} modalDirection - 'flex-start' | 'center' | 'flex-end'
 * @param {React.ComponentState} dateResponse - 날짜 데이터를 반환 받을 React state
 * @param {((event: GestureResponderEvent) => void) | undefined} submitEvent - 확인 버튼 이벤트
 * @param {((event: GestureResponderEvent) => void) | undefined} resetEvent - 초기화 버튼 이벤트
 * @comment 날짜 범위를 선택하여 검색하는 리스트에 적용하는 공용 모달입니다. 내부 달력은 Calancer컴포넌트를 사용하여 구성되어있습니다. 날짜 형식 및 계산은 day.js 라이브러리를 사용하여 작성되었습니다.
 */
const DatePicker = ({
  name,
  animationType,
  onRequestClose,
  visible,
  onShow,
  modalDirection,
  dateResponse,
  submitEvent,
  resetEvent,
}: ModalProps) => {
  const [datePickerVisible, setDatePickerVisible] = React.useState(false);
  const [dateType, setDateType] = React.useState('');
  const [datePicker, setDatePicker] = React.useState({ from: '', to: '' });
  const [selectedDateCondition, setSelectedDateCondition] = React.useState(4);
  const insets = useSafeAreaInsets();
  // 날짜 범위 선택 옵션
  const monthCondition: { label: string, value: number, unit: ManipulateType }[] = [
    { label: '1년', value: 1, unit: 'year' },
    { label: '6개월', value: 6, unit: 'month' },
    { label: '3개월', value: 3, unit: 'month' },
    { label: '1개월', value: 1, unit: 'month' },
    { label: '1주일', value: 1, unit: 'week' },
  ];

  const FONT_WHITE = fontStyleCreator({
    color: Colors.Medicle.White,
    weight: 'bold',
    size: 12,
  });

  // 모달을 호출 할 때마다 데이터를 초기화
  React.useEffect(() => {
    setDatePickerVisible(false);
    setDateType('');
    setSelectedDateCondition(4);

    if (datePicker.to === '') {
      setDatePicker(dateSetup(1, 'week')); // 기본 초기화 날짜 범위를 1주일로 하여 날짜 설정
    } else {
      const compare = compareDate(datePicker);
      setDatePicker(compare);
    }
  }, [visible]);

  React.useEffect(() => {
    dateResponse(datePicker);
  }, [datePicker]);

  const dataPickerHandler = (type: string) => {
    setDatePickerVisible(true);
    setDateType(type);
  };

  const setDateFromCondition = (value: number, unit: ManipulateType | undefined) => {
    const newDate = dateSetup(value, unit);
    setDatePicker(newDate);
  }
  
  if (!visible) {
    return null;
  }

  return (
    <Portal name={name}>
      {visible && (
        <View
          style={{
            opacity: 0.5,
            backgroundColor: '#000',
            flex: 1,
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
          }}
        />
      )}
      <Modal
        animationType={animationType}
        visible={visible}
        transparent={true}
        onRequestClose={onRequestClose}
        onShow={onShow}>
        <View style={{ flex: 1, justifyContent: modalDirection }}>
          <View
            style={{
              backgroundColor: Colors.Medicle.White,
              paddingBottom: Platform.OS === 'ios' ? insets.bottom : 0,
              borderTopRightRadius: 10,
              borderTopLeftRadius: 10,
            }}>
            <View style={{ padding: 20 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text>전체</Text>
                  <Spacing size={4} />
                  <Text>{monthCondition[selectedDateCondition].label}</Text>
                </View>
                <TouchableOpacity onPress={onRequestClose}>
                  <Icon name="close" />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                {monthCondition.map(({ label, value, unit }, key) => (
                  <TouchableOpacity style={[style.monthItem, selectedDateCondition === key ? style.monthItemSelected : null]} key={key} onPress={() => {
                    setSelectedDateCondition(key)
                    setDateFromCondition(value, unit)
                  }}>
                    <Text style={[style.monthText, selectedDateCondition === key ? style.monthTextSelected : null]}>{label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <TouchableOpacity
                  style={[
                    style.datePickerInput,
                    {
                      marginRight: 10,
                      borderWidth: dateType === 'from' ? 1 : 0,
                    },
                  ]}
                  onPress={() => dataPickerHandler('from')}>
                  <Text style={{ flex: 1 }}>{datePicker.from}</Text>
                  <Icon name="calendar" />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    style.datePickerInput,
                    { marginLeft: 10, borderWidth: dateType === 'to' ? 1 : 0 },
                  ]}
                  onPress={() => dataPickerHandler('to')}>
                  <Text style={{ flex: 1 }}>{datePicker.to}</Text>
                  <Icon name="clock" />
                </TouchableOpacity>
              </View>
              {datePickerVisible && (
                <BoxDropShadow
                  color={
                    Platform.OS === 'ios'
                      ? Colors.Medicle.Gray.SemiLight
                      : Colors.Medicle.Gray.Standard
                  }
                  offset={[0, 7]}
                  elevation={10}
                  opacity={0.95}
                  radius={10}
                  style={style.datePickerWrap}>
                  <Calendar
                    date={datePicker}
                    dateResponse={setDatePicker}
                    dateType={dateType}
                    initialDate={dateType === 'to' ? datePicker.to : datePicker.from}
                    maxDate={new Date()}
                  />
                </BoxDropShadow>
              )}
            </View>

            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                onPress={resetEvent}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Colors.Medicle.Gray.Dark,
                  padding: 20,
                }}>
                <Icon name="refresh_s" />
                <Text style={[FONT_WHITE, { marginLeft: 10 }]}>초기화</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={submitEvent}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: Colors.Medicle.Primary,
                  padding: 20,
                }}>
                <Text>적용하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default DatePicker;
