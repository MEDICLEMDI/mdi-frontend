import * as React from 'react';
import {SafeAreaView, Pressable, View, Text } from 'react-native'

import Header from "../../components/Header";
import ImageSlide from "../../components/ImageSlide";
import InputIcon from "../../components/InputIcon";
import CategoryTab from "../../components/CategoryTab";

import search from "../../assets/images/ic_search.png";

import { getBackendActor } from '../../lib/actor'
import {dentist, dermatology} from "../../components/Category";
import {useIsFocused} from "@react-navigation/native";
const Home = ({ navigation }) => {
    const isFocus = useIsFocused();
    const [tabs, setTabs] = React.useState([]);

    React.useEffect(() => {
        initialize();
    } ,[isFocus])

    const initialize = () => {
        setTabs([
            {name: '치과', data: dentist},
            {name: '성형외과 피부과', data: dermatology},
        ])
    }

    return (
        <SafeAreaView style={{backgroundColor: '#FFF'}}>
            <Header />
            <View>
                <ImageSlide />
                <InputIcon onPress={() => console.log('Test')} placeholder="궁금한 시술, 병원 이름을 검색해주세요." icon={search}/>
            </View>
            <CategoryTab tabs={tabs}/>
        </SafeAreaView>
    )
}


export default Home;