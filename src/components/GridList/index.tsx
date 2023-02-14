import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import Icon from '@/icons';

import style from './style';
const BoxGrid = ({ item, size, onPress, itemStyle }: any) => (
  <TouchableOpacity onPress={onPress} disabled={item.name === ''}>
    <View
      style={[
        item.name === '' ? style.gridItemEmpty : itemStyle,
        style.gridItemBox,
        { width: size, height: size },
      ]}>
      {item.name === '' ? null : (
        <Icon name={item.icon} color={'#000000'} style={style.gridItemIcon} />
      )}
      <Text>{item.name}</Text>
    </View>
  </TouchableOpacity>
);

const CircleGrid = ({ item, size, onPress, itemStyle }: any) => (
  <TouchableOpacity onPress={onPress} style={style.circleWrap}>
    <View
      style={[
        item.name === '' ? style.gridItemEmpty : itemStyle,
        style.gridItemCircle,
        { width: 65, height: 65 },
      ]}>
      {/*<Image style={[{width: 30, height: 30}]} source={item.name === '' ? 0 : item.icon} resizeMode='cover'/>*/}
      <Icon name={item.icon} />
    </View>
    <Text>{item.name}</Text>
  </TouchableOpacity>
);

const GridList = ({ data, itemStyle, type }: any) => {
  const [containerWidth, setContainerWidth] = React.useState(0);

  const navigation = useNavigation();
  const margins = 45 * 2;
  const numColumns = 3;
  const itemSize = (containerWidth - margins) / numColumns;

  const pageRoute = route => {
    navigation.navigate(route);
  };

  return (
    <View
      style={style.gridWrap}
      onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}>
      {type === 'circle'
        ? data.map((item, key) => (
            <CircleGrid
              key={key}
              item={item}
              size={itemSize}
              onPress={() => pageRoute(item.route)}
              itemStyle={itemStyle}
            />
          ))
        : data.map((item, key) => (
            <BoxGrid
              key={key}
              item={item}
              size={itemSize}
              onPress={() => pageRoute(item.route)}
              itemStyle={itemStyle}
            />
          ))}
    </View>
  );
};

export default GridList;
