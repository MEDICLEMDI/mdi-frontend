import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import MedicleButton from '@/buttons/MedicleButton';
import Header from '@/components/Header';
import { MedicleInput } from '@/components/inputs';
import { Colors } from '@/constants/theme';
import Icon from '@/icons';
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
          <Icon name="userCircle" />
          <View style={{ marginLeft: 15 }}>
            <Text style={USER_NAME_FONT}>UserName</Text>
            <Text style={USER_EMAIL_FONT}>userEmail@email.com</Text>
          </View>
        </View>
        <View style={style.contentWrap}>
          {/* Input Wrap */}
          <View style={style.inputGroup}>
            <View style={style.row}>
              <Text style={style.title}>비밀번호</Text>
              <MedicleButton
                onPress={() => console.log()}
                text={'변경'}
                buttonStyle={style.buttonStyle}
              />
            </View>
          </View>

          <View style={style.inputGroup}>
            <View style={style.row}>
              <Text style={style.title}>주소</Text>
              <MedicleButton
                onPress={() => console.log()}
                text={'변경'}
                buttonStyle={style.buttonStyle}
              />
            </View>
            <MedicleInput
              style={style.input}
              direction="column"
              placeholder={t('input.postCodePlaceholder')}
            />
            <MedicleInput
              style={style.input}
              placeholder={t('input.addressPlaceholder')}
            />
            <MedicleInput
              style={style.input}
              placeholder={t('input.addressDetailPlaceholder')}
            />
          </View>

          <View style={style.inputGroup}>
            <View style={style.row}>
              <Text style={style.title}>전화번호</Text>
              <MedicleButton
                onPress={() => console.log()}
                text={'변경'}
                buttonStyle={style.buttonStyle}
              />
            </View>
            <MedicleInput
              direction="column"
              // label={<Text>{t('input.phone')}</Text>}
              placeholder={t('input.phonePlaceholder')}
            />
          </View>
        </View>
      </ScrollView>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={style.modal}>
          <View style={style.modalContainer}>
            <View style={{ paddingHorizontal: 20 }}>
              <View style={style.modalHeader}>
                <View style={style.modalHeaderCenter}>
                  <Text style={style.modalTitle}>경고</Text>
                </View>
                <TouchableOpacity
                  style={style.modalHeaderRight}
                  onPress={handleCloseModal}>
                  <Image style={style.modalCloseButton} source={Close} />
                </TouchableOpacity>
              </View>
              <View style={style.modalContent}>
                <Text>
                  기존 로그인했던 계정과 다른 계정 입니다. 로그인을 계속
                  진행할시 기존 계정의 지갑이 사라집니다. 기존 계정의 지갑
                  니모닉넘버를 저장하지 않으셨다면, 기존 지갑을 다시 찾을수
                  없으니 주의 하시길 바랍니다.
                </Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 'auto' }}>
              <MedicleButton
                textStyle={style.modalCancelText}
                buttonStyle={style.modalCancelButton}
                text="취소"
                onPress={handleCloseModal}
              />
              <MedicleButton
                buttonStyle={style.modalCheckButton}
                text="로그인"
                onPress={() => {
                  handleSignIn();
                  handleCloseModal();
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default EditProfile;
