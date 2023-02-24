import React, { useState } from 'react';
import { StyleProp, Text, TextStyle, View } from 'react-native';

import style from './style';

// #을 붙히면 줄바꿈
// <strong>문자열<strong> 사이에 있는 문자열은 하이라이트 css가 적용됨
// </strong> 말고 <strong> 여는태그만 두번 사용함
// /Users/nialabs/mdi-frontend/src/screens/service/Wallet/components/Send/index.tsx
// 사용예시 포함되어있음

interface Li {
  text: string;
  textStyle?: StyleProp<TextStyle>;
  highlightStyle?: StyleProp<TextStyle>;
}

const Li = ({ text, textStyle, highlightStyle }: Li) => {
  const textList: string[] = text.split('#');

  return (
    <>
      {textList.map((item, index) => {
        if (item.includes('<strong>')) {
          const parts = item.split('<strong>');
          return (
            <View key={index} style={style.container}>
              <Text style={[textStyle]}>•</Text>
              <Text style={[textStyle, { marginLeft: 5 }]}>
                {parts[0]}
                <Text style={[highlightStyle]}>
                  {parts[1].replace('</strong>', '')}
                </Text>
                {parts[2]}
              </Text>
            </View>
          );
        } else {
          return (
            <View key={index} style={style.container}>
              <Text style={[textStyle]}>•</Text>
              <Text style={[textStyle, { marginLeft: 5 }]}>{item}</Text>
            </View>
          );
        }
      })}
    </>
  );
};

export default Li;
