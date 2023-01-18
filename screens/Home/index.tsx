import * as React from 'react';
import {useIsFocused} from "@react-navigation/native";

import {SafeAreaView, Pressable, View, Text, ScrollView, Image} from 'react-native'
import Header from "../../components/Header";
import ImageSlide from "../../components/ImageSlide";
import InputIcon from "../../components/InputIcon";
import CategoryTab from "../../components/CategoryTab";

import {dentist, dermatology} from "../../components/Category";

import ic_search from "../../assets/images/ic_search.png";
import ic_refresh from "../../assets/images/ic_refresh.png";
import style from "./style";


import { getBackendActor } from '../../lib/actor'
import TestModal from "../../components/Modal";
const Home = ({ navigation }) => {
    const isFocus = useIsFocused();
    const [tabs, setTabs] = React.useState([]);
    const [active, setActive] = React.useState(false);

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
        <SafeAreaView style={style.container}>
            <Header />
            <ScrollView horizontal={false}>
                <View>

                    <ImageSlide />

                    <InputIcon onPress={() => console.log('Test')} placeholder="궁금한 시술, 병원 이름을 검색해주세요." icon={ic_search}/>

                    <CategoryTab tabs={tabs} onPress={() => setActive(true)}/>

                    <View style={style.eventWrap}></View>
                    <View style={style.listWrap}>
                        <Image source={ic_refresh} style={{ width: 63, height: 63, marginBottom: 20 }}/>
                        <Text>해당 서비스는 아직 준비중이에요.</Text>
                    </View>

                </View>
            </ScrollView>
            <TestModal active={active} closeHandler={() => setActive(false)} />
        </SafeAreaView>
    )
}


export default Home;