import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, Text, View } from 'react-native';

import api from '@/components/Api';
import MedicleButton from '@/components/buttons/MedicleButton';
import Header from '@/components/Header';
import Hr from '@/components/Hr';
import { MedicleInput } from '@/components/inputs';
import eventEmitter from '@/utils/eventEmitter';

import style from './style';

export default () => {
  const { t } = useTranslation();
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [word, setWord] = useState<string>('');

  React.useEffect(() => {
    if (word === '확인하였습니다' || word === '확인하였습니다.') {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  }, [word]);

  const resetStorage = async () => {
    await AsyncStorage.removeItem('@User_id');
    await AsyncStorage.removeItem('@AuthKey');
    await AsyncStorage.removeItem('@RefreshKey');
    await AsyncStorage.removeItem('@User');
  };

  const handleLogOut = async () => {
    try {
      const data = await api.signOut();
      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      await resetStorage();
      eventEmitter.emit('loggedOut');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header goBack={true} title={t('setting.logOut')} />
      <View style={style.container}>
        <Text style={style.title}>유의사항</Text>
        <Text style={style.subTitle}>로그아웃 전에 꼭 확인하세요.</Text>
        <Text style={style.content}>
          {
            '코인 지갑은 icp네트워크 기반의 지갑으로\n메디클앱 외부 icp 지갑이 사용 가능한 어디서든\n사용할수 있음으로 사용자의 지갑정보를 저장하지 \n않습니다.\n로그아웃시 계정에 연결된 지갑의 연결이 해제됨으로 꼭, 지갑의 비밀키를 개인 보관 하시길 부탁드립니다.\n(지갑 -> 지갑설정 -> 보안정보 -> 비밀복구구문공개)\n다시 로그인 하실경우 지갑 불러오기 기능을 이용하여\n지갑은 연결할수 있습니다.'
          }
        </Text>
      </View>
      <View style={{ marginTop: 'auto' }}>
        {/* <Hr color="#F2F2F2" thickness={12} />
        <View style={{ paddingHorizontal: 30, marginBottom: 20 }}>
          <Text style={{ marginTop: 10, marginBottom: 10 }}>
            {"유의사항을 모두 확인하신 후 '확인하였습니다' \n를 입력해주세요."}
          </Text>
          <MedicleInput
            placeholder="확인하였습니다."
            onChangeText={(text: string) => {
              setWord(text);
            }}
            value={word}
          />
        </View> */}
        <MedicleButton
          text="로그아웃"
          buttonStyle={{ height: 50 }}
          onPress={handleLogOut}
        />
      </View>
    </SafeAreaView>
  );
};
