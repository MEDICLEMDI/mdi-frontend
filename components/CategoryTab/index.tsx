import * as React from 'react';
import { View, Text, TouchableOpacity } from "react-native";

import style from "./style";
import GridList from "../GridList";
import {useEffect} from "react";
const CategoryTab = ({ tabs, onPress }) => {
    const [tabIndex, setTabIndex] = React.useState(0);
    const [category, setCategory] = React.useState([]);

    useEffect(() => {
        initialize();
    }, [tabs])

    // Tab category data initialize
    const initialize = () => {
        if(tabs.length > 0) setCategory(tabs[0].data);
    }

    const tabChangeHandler = (tab: any, index: number) => {
        setTabIndex(index);
        setCategory(tab.data);
    }

    const TabList = (
        tabs.map((tab, key) => (
            <TouchableOpacity key={key} disabled={key === tabIndex} onPress={() => tabChangeHandler(tab, key)}>
                <View style={key === tabIndex ? style.active : null}>
                    <Text style={[style.tabButton, key === tabIndex ? style.active : null]}>{tab.name}</Text>
                </View>
            </TouchableOpacity>
        )
    ));

    return (
        <View>
            <View style={style.tabButtonWrap}>
                {TabList}
            </View>
            <GridList data={category} onPress={onPress}/>
        </View>
    )
}

export default CategoryTab