import Postcode from '@actbase/react-daum-postcode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Close from '@/assets/images/close.png';
import MedicleButton from '@/buttons/MedicleButton';
import api from '@/components/Api';
import Header from '@/components/Header';
import { MedicleInput } from '@/components/inputs';
import ResultModal from '@/components/ResultModal';
import { Colors } from '@/constants/theme';
import Icon from '@/icons';
import Routes from '@/navigation/Routes';
import { fontStyleCreator } from '@/utils/fonts';

import style from './style';
import { ErrorCode } from '@/constants/error';

export interface User {
  name?: string;
  email?: string;
  post_number?: string;
  address1?: string;
  address2?: string;
}

export interface Address {
  post_number?: string;
  address1?: string;
  address2?: string;
}
const EditAddress = ({ navigation }) => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();
  const [user, setUser] = React.useState<User | undefined>(undefined);
  const [addressModal, setAddressModal] = React.useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [originAddress, setOriginAddress] = React.useState<
    Address | undefined
  >();
  const [result, setResult] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>(undefined);

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
            name: _user.name,
            email: _user.email,
          });
          setOriginAddress({
            ...originAddress,
            post_number: _user.post_number,
            address1: _user.address,
            address2: _user.address2,
          });
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchUser();
  }, []);

  React.useEffect(() => {
    const addressValid =
      user &&
      originAddress &&
      (user?.post_number !== originAddress?.post_number ||
        user?.address1 !== originAddress?.address1 ||
        user?.address2 !== originAddress?.address2);

    setButtonDisabled(addressValid! && user.address2 !== '');
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

  const handleEditAddress = async () => {
    try {
      const request = {
        post_number: user?.post_number!,
        address1: user?.address1!,
        address2: user?.address2!,
      };
      const response = await api.editAddress(request);

      console.log(response);
      if (response.result) {
        await AsyncStorage.setItem('@User', JSON.stringify(response.data.user));
        setResult(true);
      } else {
        throw 'err';
      }
    } catch (err) {
      console.error(err);
      setError(ErrorCode[101]);
    }
  };

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
            <Text style={style.title}>주소 변경</Text>
            <View style={style.changeLayer}>
              <MedicleInput
                value={user?.post_number}
                direction="row"
                placeholder={t('signUp.address1')}
                editable={false}
                clearButton={false}
                inputButtonNode={
                  <MedicleButton
                    buttonStyle={style.addressSearchButton}
                    text={t('signUp.addressSearch')}
                    onPress={() => {
                      setAddressModal(true);
                    }}
                  />
                }
              />
              <MedicleInput
                value={user?.address1}
                placeholder={t('signUp.address2')}
                style={style.mt10}
                editable={false}
                clearButton={false}
              />
              <MedicleInput
                value={user?.address2}
                onChangeText={text =>
                  setUser({
                    ...user,
                    address2: text,
                  })
                }
                placeholder={t('signUp.address3')}
                style={style.mt10}
              />
            </View>
            <MedicleButton
              text="변경하기"
              buttonStyle={style.changeButton}
              disabled={!buttonDisabled}
              onPress={handleEditAddress}
            />
            {error && <Text style={style.resultErrorMessage}>{error}</Text>}
          </View>
        </View>

        {addressModal && (
          <Modal animationType="fade" transparent={true} visible={addressModal}>
            <View style={style.addressModalContainer}>
              <View style={style.addressModal}>
                <View style={style.addressModalHeader}>
                  <Text style={style.addressModalTitle}>
                    {t('signUp.addressModal')}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setAddressModal(false);
                    }}>
                    <Image source={Close} style={style.addressModalClose} />
                  </TouchableOpacity>
                </View>
                <Postcode
                  style={style.postCode}
                  jsOptions={{ animation: true }}
                  onSelected={data => {
                    console.log(data);
                    setUser({
                      ...user,
                      address1: `${data.sido} ${data.roadAddress.slice(
                        data.sido.length + 1
                      )}`,
                      post_number: data.zonecode.toString(),
                      address2: '',
                    });
                    setAddressModal(false);
                  }}
                  onError={() => {
                    console.log('에러');
                  }}
                />
              </View>
            </View>
          </Modal>
        )}
        <ResultModal
          visible={result}
          buttonText="확인"
          resultText="변경이 완료되었습니다."
          onPress={() => {
            setResult(false);
            navigation.navigate(Routes.EDIT_PROFILE);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditAddress;
