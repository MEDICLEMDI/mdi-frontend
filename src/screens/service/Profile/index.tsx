import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Close from '@/assets/images/close.png';
import BoxDropShadow from '@/components/BoxDropShadow';
import MedicleButton from '@/components/buttons/MedicleButton';
import { ScrollViewGrid } from '@/components/GridLayout';
import Header from '@/components/Header';
import { MedicleInput } from '@/components/inputs';
import { myPageMenus } from '@/constants/menus';
import { Colors } from '@/constants/theme';
import Icon from '@/icons';
import Routes from '@/navigation/Routes';

import style from './style';

const Profile = ({ navigation }) => {
  const { t, i18n } = useTranslation();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [passwordErrMessage, setPasswordErrMessage] = React.useState<
    string | undefined
  >(undefined);
  const [passwordVaild, setPasswordVaild] = React.useState(false);
  const [password, setPassword] = React.useState<string | undefined>(undefined);
  const [user, setUser] = React.useState();

  const numColumns = 3;
  const menuPadding = 50;
  const gap = 30;

  React.useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    const user_ = await AsyncStorage.getItem('@User');
    setUser(JSON.parse(user_));
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setPassword(undefined);
    setPasswordVaild(false);
  };

  const handlePasswordOnChageText = (text: string) => {
    setPasswordErrMessage(undefined);
    setPasswordVaild(text.length > 7);
    setPassword(text);
  };

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={false} title={t('header.profile')} />
      <ScrollView>
        <View style={style.contentWrap}>
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
            style={style.profileWrap}>
            <View style={style.profileNameWrap}>
              <Icon name="userCircle" />
              <Text style={style.name}>{user?.name}</Text>
            </View>

            <TouchableOpacity
              onPress={() => navigation.navigate(Routes.POINT_CHARGE)}>
              <View style={style.pointBtn}>
                <Icon name="mdiIcon" />
                <Text style={{ marginHorizontal: 10 }}>
                  {t('profile.myPoint')}
                </Text>
                <Text>0 P</Text>
                <Icon name="arrowRight" />
              </View>
            </TouchableOpacity>
          </BoxDropShadow>

          <TouchableOpacity
            style={style.editProfileBtn}
            // onPress={() => navigation.navigate(Routes.EDIT_PROFILE)}
            onPress={() => {
              setModalVisible(true);
            }}>
            <Text>{t('profile.editProfile')}</Text>
            <Icon name="arrowRight" />
          </TouchableOpacity>
        </View>
        <ScrollViewGrid
          itemStyle={style.itemStyle}
          itemBackground={Colors.Medicle.Brown.Light}
          numColumns={numColumns}
          padding={menuPadding}
          iconColor={{ stroke: Colors.Medicle.Brown.SemiDark }}
          gap={gap}
          data={myPageMenus(t)}
          onPress={({ route }) => navigation.navigate(route)}
          renderItem="circle"
        />
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCloseModal}>
        <View style={style.modalContainer}>
          <View style={style.modal}>
            <View style={style.modalPaddingLayer}>
              <View style={style.modalHeader}>
                <TouchableOpacity
                  style={style.modalHeaderRight}
                  onPress={handleCloseModal}>
                  <Image style={style.modalCloseButton} source={Close} />
                </TouchableOpacity>
              </View>

              <View style={style.modalTextLayer}>
                <View style={style.textTop}>
                  {/* <Image source={Warning} style={style.warningImage} /> */}
                  <Text style={style.warningTitle}>비밀번호 확인</Text>
                </View>
              </View>
              <View style={style.passwordLayer}>
                <Text style={{ marginBottom: 10 }}>
                  {t('wallet.setting.password')}
                </Text>
                <MedicleInput
                  placeholder={t('wallet.setting.password')}
                  onChangeText={(text: string) => {
                    handlePasswordOnChageText(text);
                  }}
                  errText={passwordErrMessage && passwordErrMessage}
                  password={true}
                />
              </View>
            </View>
            <MedicleButton
              text={'내 정보 확인'}
              buttonStyle={style.deleteButton}
              disabled={!passwordVaild}
              onPress={() => {
                handleCloseModal();
                // handleDeleteWallet();
              }}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Profile;
