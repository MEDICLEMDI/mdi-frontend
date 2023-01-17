import * as React from 'react';
import { View, Text, Pressable } from "react-native";

import style from "./style";
const CategoryTab = ({ tabs }) => {
    const [tabIndex, setTabIndex] = React.useState(0);

    const TabList = (
        tabs.map((tab, key) => (
            <Pressable key={key} disabled={key === tabIndex} onPress={() => setTabIndex(key)}>
                <Text style={[style.tabButton, key === tabIndex ? style.active : null]}>{tab}</Text>
            </Pressable>
        )
    ));

    return (
        <View style={style.tabButtonWrap}>
            {TabList}
        </View>
    )
}

export default CategoryTab