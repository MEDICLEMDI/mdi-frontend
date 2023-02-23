import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {
  Dimensions,
  FlatList,
  FlatListProps, TextStyle, View, ViewStyle,
} from 'react-native';
import { ItemBox } from "@/components/GridLayout/items";
import ItemCircle from "@/components/GridLayout/items/itemCircle";

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
  iconStyle,
  textStyle,
  columnWrapperStyle,
  gap = 0,
  padding = 0,
  numColumns = 1,
} : {
  data: any[];
  renderItem: 'box' | 'circle' | 'button';
  itemStyle?: ViewStyle | ViewStyle[];
  iconStyle?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  columnWrapperStyle?: ViewStyle | ViewStyle[];
  gap?: number;
  padding?: number;
  numColumns?: number;
}) => {
  const size = deviceWidthCalculator({padding: padding, gap: gap, numColumns: numColumns});

  const ItemType = (item) => {


    switch (renderItem){
      case 'box':
        return (
          <ItemBox
          item={item}
          iconStyle={iconStyle}
          textStyle={textStyle}
          style={[
            itemStyle,
            {
              width: size,
              marginVertical: gap / 2,
            }
          ]} />
        )
      case 'circle':
        return (
          <ItemCircle
            item={item}
            iconStyle={iconStyle}
            textStyle={textStyle}
            circleStyle={[
              itemStyle,
              {
                width: size,
                height: size,
              }
            ]}
            style={{
                alignItems: 'center',
                marginVertical: gap / 2,
              }}/>
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
      {data.map((item) => (
        ItemType(item)
      ))}
    </View>
  )
}
