import * as React from 'react';
import {SafeAreaView, Pressable, View, Text } from 'react-native'

import Header from "../../components/Header";
import ImageSlide from "../../components/ImageSlide";
import InputIcon from "../../components/InputIcon";
import GridList from "../../components/GridList";
import CategoryTab from "../../components/CategoryTab";

import { dentist, dermatology } from "../../components/Category";
import search from "../../assets/images/ic_search.png";

import { getBackendActor } from '../../lib/actor'
const Home = () => {
    const [category, setCategory] = React.useState([]);

    React.useEffect(() => {
        setCategory(dentist);
    }, [])

    return (
        <SafeAreaView style={{backgroundColor: '#FFF'}}>
            <Header />
            <View>
                <ImageSlide />
                <InputIcon onPress={() => console.log('Test')} placeholder="궁금한 시술, 병원 이름을 검색해주세요." icon={search}/>
            </View>
            <CategoryTab tabs={['치과', '성형외과 피부과']}/>
            <GridList data={category}/>
        </SafeAreaView>
    )
}


export default Home;