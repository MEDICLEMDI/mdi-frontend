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
  buttonRoute: Routes;
  headerText?: string;
  navigation: any;
  readonly children?: React.ReactNode;
}

const ResultPage = (props: ResultProps) => {
  const { t } = useTranslation();
  const { navigation, buttonRoute } = props;
  return (
    <SafeAreaView style={style.mainContainer}>
      <Header goBack={false} title={props.headerText && props.headerText} />
      <View style={style.contents}>
        <Image source={ResultImage} style={style.image} />
        <Text style={style.resultText}>{props.resultText}</Text>
        {props.children && props.children}
      </View>
      <MedicleButton
        text={props.buttonText}
        buttonStyle={{
          height: 50,
        }}
        onPress={() => {
          navigation.navigate(buttonRoute);
        }}
      />
    </SafeAreaView>
  );
};

export default ResultPage;
