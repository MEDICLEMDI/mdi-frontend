import * as React from 'react';
import { Image, Text, TouchableOpacity, View } from "react-native";

import style from './style';
import {useNavigation} from "@react-navigation/native";
const BoxGrid = ({item, size, onPress, itemStyle}) => (
    <TouchableOpacity onPress={onPress}>
        <View style={[item.name === '' ? style.gridItemEmpty : style.gridItemBox, itemStyle, { width: size, height: size }]}>
            <Image style={[style.gridItemIcon, {width: 28, height: 28}]} source={item.name === '' ? 0 : item.icon} resizeMode='contain'/>
            <Text>{item.name}</Text>
        </View>
    </TouchableOpacity>
)

const CircleGrid = ({item, size, onPress, itemStyle}) => (
    <TouchableOpacity onPress={onPress} style={style.circleWrap}>
        <View style={[item.name === '' ? style.gridItemEmpty : style.gridItemCircle, itemStyle, { width: 65, height: 65 }]}>
            <Image style={[{width: 30, height: 30}]} source={item.name === '' ? 0 : item.icon} resizeMode='cover'/>
        </View>
        <Text>{item.name}</Text>
    </TouchableOpacity>
)

const GridList = ({data, onPress, itemStyle, type}) => {
    const [containerWidth, setContainerWidth] = React.useState(0);

    const navigation = useNavigation();
    const margins = 45 * 2;
    const numColumns = 3;
    const itemSize = (containerWidth - margins) / numColumns;

    const pageRoute = (route) => {
        navigation.navigate(route);
    }

    return (
        <View style={style.gridWrap} onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}>
            {
                type === 'circle'
                ?
                data.map((item, key) => (
                    <CircleGrid key={key} item={item} size={itemSize} onPress={() => pageRoute(item.route)} itemStyle={itemStyle}/>
                ))
                :
                data.map((item, key) => (
                    <BoxGrid key={key} item={item} size={itemSize} onPress={onPress} itemStyle={itemStyle}/>
                ))
            }
        </View>
    )
}

export default GridList;