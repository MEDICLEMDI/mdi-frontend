import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import BoxDropShadow from '@/components/BoxDropShadow';
import { CustomCheckbox } from '@/components/common';
import Header from '@/components/Header';
import CustomModal from '@/components/Modals/Modal';
import { Colors } from '@/constants/theme';
import Icons from '@/icons';
import { fontStyleCreator } from '@/utils/fonts';

import style from './style';

export default () => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();
  const [signOutAgree, setSignOutAgree] = React.useState(false);

  const SIGNOUT_BUTTON_FONT = fontStyleCreator({
    color: signOutAgree ? Colors.Medicle.Font.Gray.Dark : Colors.Medicle.White,
    weight: 'bold',
    size: 12,
  });
  const SIGNOUT_ALERT_FONT_HEADER = fontStyleCreator({
    color: Colors.Medicle.Font.Gray.Dark,
    weight: 'bold',
    size: 14,
  });
  const SIGNOUT_ALERT_FONT_DESCRIPT = fontStyleCreator({
    color: Colors.Medicle.Font.Gray.Standard,
    size: 12,
  });
  const BOLD = fontStyleCreator({
    weight: 'bold',
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header goBack={true} title={t('setting.sighOut')} />
      <View style={style.container}>
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
          style={[style.signOutWrap, { opacity: 0.99 }]}>
          <View>
            <Text style={[SIGNOUT_ALERT_FONT_HEADER, { marginBottom: 5 }]}>
              유의사항
            </Text>
            <Text style={SIGNOUT_ALERT_FONT_DESCRIPT}>
              회원 탈퇴 전에 꼭 확인하세요.
            </Text>
          </View>
          <Icons name="arrowDown" />
        </BoxDropShadow>
        <View style={[style.flexDirection, style.pointWrap]}>
          <Text>보유 포인트</Text>
          <Text style={BOLD}>{0}원</Text>
        </View>
      </View>
      <View style={style.bottomContent}>
        <View style={[style.flexDirection, style.alertWrap]}>
          <CustomCheckbox
            selected={signOutAgree}
            onPress={() => setSignOutAgree(!signOutAgree)}>
            <Text style={style.alertText}>
              유의사항을 모두 확인하였으며, 회원 탈퇴시 쿠폰, 포인트 소멸에
              동의합니다.
            </Text>
          </CustomCheckbox>
        </View>
        <TouchableOpacity
          disabled={!signOutAgree}
          style={[
            style.signOutButton,
            {
              backgroundColor: signOutAgree
                ? Colors.Medicle.Primary
                : Colors.Medicle.Gray.Standard,
            },
          ]}>
          <Text style={SIGNOUT_BUTTON_FONT}>계정 삭제하기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
