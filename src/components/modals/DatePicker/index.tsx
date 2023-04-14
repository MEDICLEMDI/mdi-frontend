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
import { dateZeroFill } from '@/utils/dates';
import { fontStyleCreator } from '@/utils/fonts';

import Calendar from '../../../Calendar';
import style from './style';

interface ModalProps extends ModalBaseProps {
  name: string;
  modalDirection: 'flex-start' | 'center' | 'flex-end';
  dateResponse: React.ComponentState;
  submitEvent: ((event: GestureResponderEvent) => void) | undefined;
  resetEvent: ((event: GestureResponderEvent) => void) | undefined;
  date: any;
}

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
  date,
}: ModalProps) => {
  const [datePickerVisible, setDatePickerVisible] = React.useState(false);
  const [dateType, setDateType] = React.useState('');
  const [datePicker, setDatePicker] = React.useState({ from: '', to: '' });
  const monthCondition = [
    { label: '1년', value: 0 },
    { label: '6개월', value: 1 },
    { label: '3개월', value: 2 },
    { label: '1개월', value: 3 },
    { label: '1주일', value: 4 },
  ];

  const FONT_WHITE = fontStyleCreator({
    color: Colors.Medicle.White,
    weight: 'bold',
    size: 12,
  });

  React.useEffect(() => {
    setDatePickerVisible(false);
    setDateType('');
    setDatePicker(date);
  }, [visible]);

  React.useEffect(() => {
    dateResponse(datePicker);
  }, [datePicker]);

  const dataPickerHandler = (type: string) => {
    setDatePickerVisible(true);
    setDateType(type);
  };

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
              paddingBottom: Platform.OS === 'ios' ? 30 : 10,
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
                  <Text>1년</Text>
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
                {monthCondition.map(({ label, value }, key) => (
                  <TouchableOpacity style={style.monthItem} key={key}>
                    <Text>{label}</Text>
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
