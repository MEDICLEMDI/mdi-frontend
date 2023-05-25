import React, { useState } from 'react';
import { StyleProp, Text, TextStyle, View } from 'react-native';

import style from './style';

interface Li {
  text: string;
  textStyle?: StyleProp<TextStyle>;
  highlightStyle?: StyleProp<TextStyle>;
}

/**
 * Li
 * @param {stirng} text - <Text>text</Text>
 * @param {StyleProp<TextStyle>} textStyle
 * @param {StyleProp<TextStyle>} highlightStyle - 비밀번호 입력폼 플래그
 * @comment HTML의 LI 엘리먼트를 기준으로 생성된 컴포넌트입니다.
 * 텍스트의 앞에 #을 붙히면 줄바꿈, <strong>문자열<strong> 사이에 있는 문자열은 하이라이트 css가 적용됨
 * 하나의 Li 컴포넌트에 하나의 <strong>만 사용이 가능합니다.
 * 네이밍 문제로 Hilight로 변경하는 경우 적용된 모든 페이지에 같이 수정행합니다.
 */
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
