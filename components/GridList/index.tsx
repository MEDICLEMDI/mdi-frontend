import * as React from 'react';
import {FlatList, FlatListProps, Image, Text, View} from "react-native";

import style from './style';
const Grid = ({item, width}) => (
    <View style={[style.gridItem, { width: width, height: width }]}>
        <Image style={style.gridItemIcon} source={item.icon} />
        <Text>{item.name}</Text>
    </View>
)


const GridList = ({data}) => {
    const [containerWidth, setContainerWidth] = React.useState(0);

    const margins = 45 * 2;
    const numColumns = 3;

    return (
        <FlatList
            style={style.gridWrap}
            data={data}
            onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
            renderItem={({item}) => (<Grid item={item} width={(containerWidth - margins) / numColumns}/>)}
            keyExtractor={(item, index) => index}
            numColumns={3}
            columnWrapperStyle={{
                justifyContent: 'space-between',
                marginBottom: 15,
            }}
            scrollEnabled={false}
        />
    )
}

export default GridList;