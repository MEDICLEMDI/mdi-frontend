import * as React from 'react';
import {useIsFocused} from "@react-navigation/native";
import {useTranslation} from "react-i18next";
import {SafeAreaView, Pressable, View, Text, ScrollView, Image} from 'react-native'

import Header from "../../components/Header";
import ImageSlide from "../../components/ImageSlide";
import InputIcon from "../../components/InputIcon";
import CategoryTab from "../../components/CategoryTab";
import TestModal from "../../components/Modal";

import Category from "../../components/Category";

import ic_search from "../../assets/images/ic_search.png";
import ic_refresh from "../../assets/images/ic_refresh.png";
import style from "./style";

import { getBackendActor } from '../../lib/actor'

const Home = ({ navigation }) => {
    const { t, i18n } = useTranslation();

    const isFocus = useIsFocused();
    const [tabs, setTabs] = React.useState([]);
    const [active, setActive] = React.useState(false);

    React.useEffect(() => {
        initialize();
    } ,[isFocus])

    const initialize = () => {
        setTabs([
            {name: t("category.dental"), data: Category.dentist(t)},
            {name: t("category.cosmetic"), data: Category.dermatology(t)},
        ])
    }

    return (
        <SafeAreaView style={style.container}>
            <Header />
            <ScrollView horizontal={false}>
                <View>

                    <ImageSlide />

                    <InputIcon onPress={() => console.log('Test')} placeholder={t('home.inputPlaceholder')} icon={ic_search}/>

                    <CategoryTab tabs={tabs} onPress={() => setActive(true)}/>

                    <View style={style.eventWrap}></View>
                    <View style={style.listWrap}>
                        <Image source={ic_refresh} style={{ width: 63, height: 63, marginBottom: 20 }}/>
                        <Text>{t('comingSoon')}</Text>
                    </View>

                </View>
            </ScrollView>
            <TestModal active={active} closeHandler={() => setActive(false)} />
        </SafeAreaView>
    )
}

export default Home;