import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, SafeAreaView, Text, View } from 'react-native';

import ResultImage from '@/assets/images/result_icon.png';
import Routes from '@/navigation/Routes';

import MedicleButton from '../buttons/MedicleButton';
import Header from '../Header';
import style from './style';

interface ResultProps {
  resultText: string;
  buttonText: string;
  buttonDisabled: boolean;
  headerText?: string;
  navigation: any;
  readonly children?: React.ReactNode;
  onPress?: () => void;
}

const ResultPage = (props: ResultProps) => {
  return (
    <SafeAreaView style={style.mainContainer}>
      <Header goBack={false} title={props.headerText && props.headerText} />
      <View style={style.contents}>
        <Image source={ResultImage} style={style.image} />
        <Text style={style.resultText}>{props.resultText}</Text>
        <View style={style.children}>{props.children && props.children}</View>
      </View>
      <MedicleButton
        text={props.buttonText}
        buttonStyle={{
          height: 50,
        }}
        disabled={!props.buttonDisabled}
        onPress={props.onPress}
      />
    </SafeAreaView>
  );
};

export default ResultPage;
