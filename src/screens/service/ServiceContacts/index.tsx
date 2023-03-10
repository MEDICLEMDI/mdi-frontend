import { useIsFocused } from '@react-navigation/native';
import * as React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';

import { CustomCheckbox } from '@/components/common';
import Header from '@/components/Header';
import TopLabelInput from '@/components/inputs/MedicleInput';
import { Colors } from '@/constants/theme';
import { fontStyleCreator } from '@/utils/fonts';

import style from './style';

export default () => {
  const { t } = useTranslation();
  const isFocus = useIsFocused();

  const FONT_GRAY = fontStyleCreator({
    color: Colors.Medicle.Font.Gray.Standard,
  });
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
            style={[style.input]}
            placeholder={t('input.namePlaceholder')}
          />
          <TopLabelInput
            label={t('input.company')}
            style={[style.input]}
            placeholder={t('input.companyPlaceholder')}
          />
          <TopLabelInput
            label={t('input.phone')}
            style={[style.input]}
            placeholder={t('input.phonePlaceholder')}
          />
          <TopLabelInput
            label={t('input.comment')}
            placeholder={t('input.commentPlaceholder')}
            style={[style.textArea, style.input]}
            editable={true}
            multiline={true}
            numberOfLines={4}
          />
        </View>

        {/* Checkbox Wrap */}
        <View>
          <View style={style.agreeComment}>
            <Text style={[FONT_GRAY]}>
              {t('input.agreementDescription')}
            </Text>
          </View>
          <CustomCheckbox
            selected={docAgree.doc1}
            onPress={() => checkboxListener('doc1')}>
            <Text style={[style.checkBoxLabel, FONT_GRAY]}>
              {t('input.doc1')}
            </Text>
            <Text style={[style.detail, FONT_GRAY]}>
              {t('input.detail')}
            </Text>
          </CustomCheckbox>
          <CustomCheckbox
            selected={docAgree.doc2}
            onPress={() => checkboxListener('doc2')}>
            <Text style={[style.checkBoxLabel, FONT_GRAY]}>
              {t('input.doc2')}
            </Text>
            <Text style={[style.detail, FONT_GRAY]}>
              {t('input.detail')}
            </Text>
          </CustomCheckbox>
        </View>
      </View>
      <TouchableOpacity
        style={style.confirmButton}
        onPress={() => console.log('Contact')}>
        <Text style={[FONT_WHITE]}>{t('input.confirm')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
