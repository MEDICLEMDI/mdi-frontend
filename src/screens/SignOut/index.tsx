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
import Accordion from "@/components/Accordion";

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
      <Header goBack={true} title={t('setting.signOut')} />
      <View style={style.container}>
        <Accordion>
          <Accordion.Header>
            <Text style={[SIGNOUT_ALERT_FONT_HEADER, { marginBottom: 5 }]}>
              유의사항
            </Text>
            <Text style={SIGNOUT_ALERT_FONT_DESCRIPT}>
              회원 탈퇴 전에 꼭 확인하세요.
            </Text>
          </Accordion.Header>
          <Accordion.Body>
            <Text style={{ padding: 10 }}>
              {
                `[회원탈퇴 유의사항]
                
[탈퇴 이후 포인트 사용 불가능]
회원탈퇴 이후에는 포인트 사용이 불가능합니다. 회원탈퇴 전, 사용 가능한 포인트가 있다면 반드시 사용해야 하며, 사용하지 않은 포인트는 회원탈퇴 이후 소멸됩니다.

...`}
            </Text>
          </Accordion.Body>
        </Accordion>
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
