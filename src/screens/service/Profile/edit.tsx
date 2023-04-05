import AsyncStorage from '@react-native-async-storage/async-storage';
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

export interface User {
  name?: string;
  email?: string;
  post_number?: string;
  address1?: string;
  address2?: string;
  phone?: string;
}
const EditProfile = () => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();
  const [user, setUser] = React.useState<User | undefined>(undefined);

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('@User');
        if (userData) {
          let _user = JSON.parse(userData);
          setUser({
            ...user,
            post_number: _user.post_number,
            address1: _user.address,
            address2: _user.address2,
            phone: _user.phone,
            name: _user.name,
            email: _user.email,
          });
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchUser();
  }, []);

  React.useEffect(() => {
    console.log(user);
  }, [user]);

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
            <Text style={USER_NAME_FONT}>{user?.name}</Text>
            <Text style={USER_EMAIL_FONT}>{user?.email}</Text>
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
              value={user?.post_number}
              direction="column"
              editable={false}
              clearButton={false}
              placeholder={t('input.postCodePlaceholder')}
            />
            <MedicleInput
              style={style.input}
              value={user?.address1}
              editable={false}
              clearButton={false}
              placeholder={t('input.addressPlaceholder')}
            />
            <MedicleInput
              style={style.input}
              value={user?.address2}
              editable={false}
              clearButton={false}
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
              editable={false}
              value={user?.phone}
              clearButton={false}
              // label={<Text>{t('input.phone')}</Text>}
              placeholder={t('input.phonePlaceholder')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
