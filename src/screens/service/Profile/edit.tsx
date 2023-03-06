import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, Text, View } from "react-native";

import MedicleButton from '@/buttons/MedicleButton';
import Header from '@/components/Header';
import { MedicleInput } from '@/components/inputs';
import { Colors } from '@/constants/theme';
import Icons from '@/icons';
import { fontStyleCreator } from '@/utils/fonts';

import style from './style';
const EditProfile = () => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();

  const USER_NAME_FONT = fontStyleCreator({
    color: Colors.Medicle.Font.Brown.Dark,
    size: 16,
    weight: 'bold',
  });
  const USER_EMAIL_FONT = fontStyleCreator({
    color: Colors.Medicle.Font.Gray.Dark,
    size: 10,
  });

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('header.editProfile')} />
      <ScrollView horizontal={false}>
        <View style={[style.contentWrap, style.profileHeader]}>
          <Icons name="userCircle" />
          <View style={{ marginLeft: 15 }}>
            <Text style={USER_NAME_FONT}>UserName</Text>
            <Text style={USER_EMAIL_FONT}>userEmail@email.com</Text>
          </View>
        </View>
        <View style={style.contentWrap}>
          {/* Input Wrap */}
          <View style={style.inputGroup}>
            <MedicleInput
              style={style.input}
              label={<Text>{t('input.password')}</Text>}
              placeholder={t('input.resetPasswordPlaceholder')}
            />
            <MedicleInput style={style.input} placeholder={t('input.resetPasswordConfirmPlaceholder')} />
            <MedicleButton
              onPress={() => console.log()}
              text={t('button.change')}
              buttonStyle={[style.inputButton]}
            />
          </View>

          <View style={style.inputGroup}>
            <MedicleInput
              style={style.input}
              direction="column"
              label={<Text>{t('input.address')}</Text>}
              placeholder={t('input.postCodePlaceholder')}
            />
            <MedicleInput style={style.input} placeholder={t('input.addressPlaceholder')} />
            <MedicleInput style={style.input} placeholder={t('input.addressDetailPlaceholder')} />
            <MedicleButton
              onPress={() => console.log()}
              text={t('button.addressChange')}
              buttonStyle={[style.inputButton]}
            />
          </View>

          <View style={style.inputGroup}>
            <MedicleInput
              direction="column"
              label={<Text>{t('input.phone')}</Text>}
              placeholder={t('input.phonePlaceholder')}
            />
            <MedicleButton
              onPress={() => console.log()}
              text={t('button.submit')}
              buttonStyle={[style.inputButton]}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
