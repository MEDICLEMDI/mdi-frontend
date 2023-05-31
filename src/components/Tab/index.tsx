import * as React from 'react';
import {
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { Colors } from '@/constants/theme';
import { fontStyleCreator } from '@/utils/fonts';
import { FlatList } from 'react-native-gesture-handler';

const SELECTED_TAB_FONT = fontStyleCreator({
  size: 14,
  weight: 'bold',
  color: Colors.Medicle.Font.Gray.Dark,
});
const TAB_FONT = fontStyleCreator({
  size: 14,
  color: Colors.Medicle.Font.Gray.Standard,
});
const defaultStyle = {
  borderBottomWidth: 3,
  borderBottomColor: Colors.Medicle.Brown.Standard,
};

/**
 * Tab
 * @param {any[]} data - 텝 구성 데이터 { id: number, label: string } or { id: number, name: string } 두가지 데이터 형태를 모두 지원합니다.
 * @param {string} index - 선택된 탭 인덱스
 * @param {StyleProp<ViewStyle>} tabStyle - 탭 스타일
 * @param {StyleProp<ViewStyle>} buttonStyle - 탭 버튼 스타일
 * @param {StyleProp<TextStyle>;} textStyle - 탭 텍스트 스타일
 * @param {[TextStyle, StyleProp<ViewStyle>]} tabSelectedStyle - 선택된 탭의 스타일
 * @param {React.ComponentState} response - 반환할 React state
 * @param {boolean} useScrollIndex - 스크롤 이동할 탭의 인덱스
 * @comment 탭구성 컴포넌트 입니다. 메디클에서 사용되는 기본 탭은 해당 컴포넌트로 구성되었습니다.
 * 기본적인 탭 기능만 제공하며 각 페이지에 맞게 기능을 커스터마이징 하여 사용합니다.
 */
const Tab = ({
  data,
  index,
  tabStyle,
  buttonStyle,
  textStyle = TAB_FONT,
  tabSelectedStyle = [SELECTED_TAB_FONT, defaultStyle],
  response,
  useScrollIndex = false,
}: {
  readonly data: any[];
  readonly index: number;
  readonly tabStyle?: StyleProp<ViewStyle>;
  readonly buttonStyle?: StyleProp<ViewStyle>;
  readonly textStyle?: StyleProp<TextStyle>;
  readonly tabSelectedStyle?: [TextStyle, StyleProp<ViewStyle>];
  response?: React.ComponentState;
  useScrollIndex?: boolean;
}) => {
  const selected_style_text = tabSelectedStyle[0];
  const selected_style_tab = tabSelectedStyle[1];

  const flatListRef = React.useRef<FlatList>(null);
  const [tabBuilder, setTabBuilder] = React.useState<any[]>([]);

  // React.useEffect(() => {
  //   scrollIndex();
  // }, [])
  
  React.useEffect(() => {
    scrollIndex();
  }, [index])

  // 만약 탭이 좌우로 또는 상하로 긴 경우 설정된 탭의 인덱스 번호까지 자동으로 스크롤
  const scrollIndex = () => {

    const tabSorting = [];
    for (const tab of data) {
      const key = data.indexOf(tab);
      // 상품 메뉴 추가시 발생하는 배열의 out of range 문제로 추가된 코드입니다.
      // 배열 자체의 인덱스와 데이터베이스에서 전달받은 pk(PrimaryKey) 인덱스를 분리하여 배열을 재구성합니다
      tabSorting.push({ id: key + 1, pk: tab.id, name: tab.name ? tab.name : tab.label });
    }
    setTabBuilder(tabSorting);

    if(useScrollIndex && tabBuilder.length > 0) {
      const scrollIndex = tabSorting.findIndex((tab) => Number(tab.pk) === Number(index));
      flatListRef.current?.scrollToIndex({ animated: true, viewOffset: 1, index: scrollIndex })
    }
  }
  // 탭의 스크롤이 실패했을 경우 1초 후 다시한번 시도
  const scrollToIndexFail = ({ index }: any) => {
    console.log(`scrollToIndexFail: ${index}`)
    setTimeout(() => {
      flatListRef.current?.scrollToIndex({ animated: true, viewOffset: 1, index: index })
    }, 1000)
  }

  return (
    <View style={tabStyle}>
      <FlatList
        ref={flatListRef}
        onScrollToIndexFailed={scrollToIndexFail}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={tabBuilder}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => response(item.pk)}
            style={[buttonStyle, Number(index) === Number(item.pk) && selected_style_tab]}>
            <Text style={[textStyle, Number(index) === Number(item.pk) && selected_style_text]}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Tab;
