import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  TextBase,
  TextInputProps
} from "react-native";
import style from "./style";
import Header from "@/components/Header";


import {useTranslation} from "react-i18next";
import {useIsFocused} from "@react-navigation/native";
import Icons from "@/icons";

interface TopLabelInputProps extends TextInputProps{
  label: string;

}

const TopLabelInput = (props: TopLabelInputProps) => {
  return (
    <View style={style.inputWrap}>
      <Text>{props.label}</Text>
      <TextInput
        placeholder={props.placeholder}
        editable={props.editable}
        multiline={props.multiline}
        numberOfLines={props.numberOfLines}
        style={[props.style, style.inputStyle]}

        // ios settings
        clearButtonMode='always'
        enablesReturnKeyAutomatically={true}

        // android settings
        disableFullscreenUI={true}
      />
    </View>
  )
}
export default () => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();

  return (
    <SafeAreaView style={style.container}>
      <Header goBack={true} title={t('setting.contact')}/>
      <ScrollView horizontal={false} style={style.contentWrap}>
        <TopLabelInput label={t('input.name')} placeholder={t('input.namePlaceholder')}/>
        <TopLabelInput label={t('input.company')} placeholder={t('input.companyPlaceholder')} />
        <TopLabelInput label={t('input.phone')} placeholder={t('input.phonePlaceholder')} />
        <TopLabelInput
          label={t('input.comment')}
          placeholder={t('input.commentPlaceholder')}
          style={{ minHeight: 80, paddingTop: 15, textAlignVertical: 'top' }}
          editable={true}
          multiline={true}
          numberOfLines={4}
        />

        <View>
          <Text></Text>
          <View>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}