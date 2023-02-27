import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {
  Dimensions,
  FlatList,
  FlatListProps, GestureResponderEvent, TextStyle, View, ViewStyle,
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

export const GridLayout = ({
  numColumns,
  style,
  renderItem,
  data,
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

export const ScrollViewGrid = ({
  data,
  renderItem,
  itemStyle,
  itemSelected,
  itemBackground,
  iconStyle,
  textStyle,
  columnWrapperStyle,
  gap = 0,
  padding = 0,
  numColumns = 1,
  onPress,
} : {
  readonly data: any[];
  readonly renderItem: 'box' | 'circle' | 'button';
  onPress: Function;
  itemStyle?: ViewStyle | ViewStyle[];
  itemSelected?: {key: number, color: string};
  itemBackground: string;
  iconStyle?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  columnWrapperStyle?: ViewStyle | ViewStyle[];
  gap?: number;
  padding?: number;
  numColumns?: number;
}) => {
  const size = deviceWidthCalculator({padding: padding, gap: gap, numColumns: numColumns});
  const ItemType = (item, key) => {
    const isItemSelected = itemSelected !== undefined && itemSelected?.key === key;
    const background = isItemSelected ? itemSelected?.color : itemBackground;
    const defaultItemBoxStyle = {
      width: size,
      marginVertical: gap / 2,
      backgroundColor: background,
    };
    const defaultItemCircleStyle = {
      width: size,
      height: size,
      backgroundColor: background,
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
            textStyle={textStyle}
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
            textStyle={textStyle}
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
      case 'button':
        return

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
