import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';

import { CustomCheckbox } from '@/components/common';
import Header from '@/components/Header';
import { Colors } from '@/constants/theme';

import style from './style';
import { fontStyleCreator } from "@/utils/fonts";

interface TopLabelInputProps extends TextInputProps {
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
        clearButtonMode="always"
        enablesReturnKeyAutomatically={true}
        // android settings
        disableFullscreenUI={true}
      />
    </View>
  );
};
export default () => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();

  const FONT_GRAY = fontStyleCreator({ color: Colors.Medicle.Grey.Standard });
  const FONT_WHITE = fontStyleCreator({ color: Colors.Medicle.White });

  const [docAgree, setDocAgree] = React.useState({
    doc1: false,
    doc2: false,
  });

  useEffect(() => {
    setDocAgree({
      doc1: false,
      doc2: false,
    });
  }, [isFocus]);

  const checkboxListener = (type: string) => {
    if (type === 'doc1') {
      setDocAgree({ ...docAgree, doc1: docAgree.doc1 ? false : true });
    }
    if (type === 'doc2') {
      setDocAgree({ ...docAgree, doc2: docAgree.doc2 ? false : true });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header goBack={true} title={t('setting.contact')} />
      <View style={style.container}>
        {/* Input Wrap */}
        <View>
          <TopLabelInput
            label={t('input.name')}
            placeholder={t('input.namePlaceholder')}
          />
          <TopLabelInput
            label={t('input.company')}
            placeholder={t('input.companyPlaceholder')}
          />
          <TopLabelInput
            label={t('input.phone')}
            placeholder={t('input.phonePlaceholder')}
          />
          <TopLabelInput
            label={t('input.comment')}
            placeholder={t('input.commentPlaceholder')}
            style={{ minHeight: 80, paddingTop: 15, textAlignVertical: 'top' }}
            editable={true}
            multiline={true}
            numberOfLines={4}
          />
        </View>

        {/* Checkbox Wrap */}
        <View>
          <View style={style.agreeComment}>
            <Text style={[FONT_GRAY]}>
              {t('serviceContact.agreementDescription')}
            </Text>
          </View>
          <CustomCheckbox
            selected={docAgree.doc1}
            onPress={() => checkboxListener('doc1')}>
            <Text style={[style.checkBoxLabel, FONT_GRAY]}>
              {t('serviceContact.doc1')}
            </Text>
            <Text style={[style.detail, FONT_GRAY]}>
              {t('serviceContact.detail')}
            </Text>
          </CustomCheckbox>
          <CustomCheckbox
            selected={docAgree.doc2}
            onPress={() => checkboxListener('doc2')}>
            <Text style={[style.checkBoxLabel, FONT_GRAY]}>
              {t('serviceContact.doc2')}
            </Text>
            <Text style={[style.detail, FONT_GRAY]}>
              {t('serviceContact.detail')}
            </Text>
          </CustomCheckbox>
        </View>
      </View>
      <TouchableOpacity
        style={style.confirmButton}
        onPress={() => console.log('Contact')}>
        <Text style={[FONT_WHITE, ]}>{t('serviceContact.confirm')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
