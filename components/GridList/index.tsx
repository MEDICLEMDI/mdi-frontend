import * as React from 'react';
import {FlatList, FlatListProps, Image, Text, View} from "react-native";

import style from './style';
const Grid = ({item, value}) => (
    <View style={[item.name === '' ? style.gridItemEmpty : style.gridItem, { width: value, height: value }]}>
        <Image style={style.gridItemIcon} source={item.name === '' ? 0 : item.icon} resizeMode='contain'/>
        <Text>{item.name}</Text>
    </View>
)


const GridList = ({data}) => {
    const [containerWidth, setContainerWidth] = React.useState(0);

    const margins = 45 * 2;
    const numColumns = 3;

    return (
        <View style={style.gridWrap} onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}>
        {
            data.map((item, key) => (
                <Grid key={key} item={item} value={(containerWidth - margins) / numColumns}/>
            ))
        }
        </View>
    )
}

export default GridList;