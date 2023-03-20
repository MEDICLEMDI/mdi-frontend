import React from 'react';
import { useTranslation } from 'react-i18next';
import style from './style';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import Header from '@/components/Header';
import MedicleButton from '@/components/buttons/MedicleButton';

const FindAccount = ({ navigation }) => {
  const { t } = useTranslation();
  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} />
      <ScrollView style={style.content}></ScrollView>
      <MedicleButton
        // disabled={true}
        text={t('findAccount.next')}
        buttonStyle={style.signUpButton}
      />
    </SafeAreaView>
  );
};

export default FindAccount;
