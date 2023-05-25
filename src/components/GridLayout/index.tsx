import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {
  Dimensions,
  FlatList,
  FlatListProps, GestureResponderEvent, StyleProp, TextStyle, View, ViewStyle,
} from 'react-native';
import { ItemBox, ItemCircle } from "@/components/GridLayout/items";

export const deviceWidthCalculator = ({
  padding = 0,
  gap = 0,
  numColumns
}:{
  padding?:number,
  gap?:number,
  numColumns: number
}) => {
  return (Dimensions.get('window').width - ((padding + gap) * 2)) / numColumns;
}

/**
 * GridLayout
 * @param {number} numColumns
 * @param {StyleProp<ViewStyle>} style
 * @param {any} data
 * @param {React.ReactNode} renderItem
 * @comment FlatList를 사용하여 기본 그리드 레이아웃을 생성합니다. 단 FlatList로 구성되어 ScrollView에서는 
 * 스크롤 중첩 이슈로 정상동작을 하지 않기 때문에 ScrollView 내부에 해당 컴포넌트가 필요한 경우 아래의 ScrollViewGrid를 사용합니다.
 */
export const GridLayout = ({
  numColumns,
  style,
  data,
  renderItem,
}: FlatListProps<any>) => {
  return (
    <FlatList
      style={style}
      numColumns={numColumns}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      data={data}
      renderItem={renderItem}
    />
  );
};

/**
 * ScrollViewGrid
 * @param {any} data
 * @param {'box' | 'circle' | 'loadingBox'} renderItem - 'box' | 'circle' | 'loadingBox'
 * @param {StyleProp<ViewStyle>} itemStyle
 * @param {{key: number, color: string}} itemSelected
 * @param {string} itemBackground
 * @param {StyleProp<ViewStyle>} iconStyle
 * @param {{ fill?: string, stroke?: string }} iconColor
 * @param {StyleProp<TextStyle>} textStyle
 * @param {StyleProp<ViewStyle>} columnWrapperStyle
 * @param {number} gap
 * @param {number} padding
 * @param {number} numColumns
 * @param {Function} onPress
 * @comment SrollView에서 그리드 레이아웃이 필요한경우 해당 컴포넌트를 사용하여 구성 할 수있습니다.
 * 'box', 'circle'로 아이템의 형태를 선택하여 구성합니다. box형태의 예시는 홈 화면에서 확인이 가능하며, circle형태는 마이페이지에서 확인이 가능합니다.
 */
export const  ScrollViewGrid = ({
  data,
  renderItem,
  itemStyle,
  itemSelected,
  itemBackground,
  iconStyle,
  iconColor,
  textStyle,
  columnWrapperStyle,
  gap = 0,
  padding = 0,
  numColumns = 1,
  onPress,
} : {
  readonly data: any;
  readonly renderItem: 'box' | 'circle';
  onPress?: Function;
  itemStyle?: StyleProp<ViewStyle>;
  itemSelected?: {key: number, color: string};
  itemBackground?: string;
  iconStyle?: StyleProp<ViewStyle>;
  iconColor?: { fill?: string, stroke?: string };
  textStyle?: StyleProp<TextStyle>;
  columnWrapperStyle?: StyleProp<ViewStyle>;
  gap?: number;
  padding?: number;
  numColumns?: number;
}) => {
  const size = deviceWidthCalculator({padding: padding, gap: gap, numColumns: numColumns})
  const ItemType = (item, key) => {
    const isItemSelected = itemSelected !== undefined && itemSelected?.key === key;
    const background = isItemSelected ? itemSelected?.color : itemBackground;
    const defaultItemBoxStyle = {
      width: size,
      marginVertical: gap / 2,
      backgroundColor: background,
      overFlow: 'hidden',
    };
    const defaultItemCircleStyle = {
      width: size,
      height: size,
      backgroundColor: background,
      overFlow: 'hidden',
    }
    const defaultTextStyle: TextStyle = {
      maxWidth: size,
      textAlign: 'center',
      paddingHorizontal: renderItem === 'box' ? 10 : 0 ,
    }

    switch (renderItem){
      case 'box':
        return (
          <ItemBox
            key={key}
            index={key}
            item={item}
            onPress={onPress}
            iconStyle={iconStyle}
            iconColor={iconColor}
            textStyle={[textStyle, defaultTextStyle]}
            style={[
              itemStyle,
              defaultItemBoxStyle,
          ]} />
        )
      case 'circle':
        return (
          <ItemCircle
            key={key}
            index={key}
            item={item}
            onPress={onPress}
            iconStyle={iconStyle}
            iconColor={iconColor}
            textStyle={[textStyle, defaultTextStyle]}
            circleStyle={[
              itemStyle,
              defaultItemCircleStyle,
            ]}
            style={{
                alignItems: 'center',
                marginVertical: gap / 2,
              }
          }/>
        )
    }
  }

  return (
    <View style={[
      columnWrapperStyle,
      {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: padding,
      }
    ]}>
      {data.map((item, key) => (
        ItemType(item, key)
      ))}
    </View>
  )
}
