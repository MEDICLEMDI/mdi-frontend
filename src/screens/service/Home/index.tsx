import React, { useState, useEffect } from "react";
import {useIsFocused} from "@react-navigation/native";
import {useTranslation} from "react-i18next";
import {SafeAreaView, Pressable, View, Text, ScrollView, Image} from 'react-native'
import Icon from '@/icons';

import Header from "@/components/Header";
import ImageSlide from "@/components/ImageSlide";
import InputIcon from "@/components/InputIcon";
import CategoryTab from "@/components/CategoryTab";
import TestModal from "@/components/Modal";

import { dentist, dermatology } from "@/components/Menus";

import style from "./style";

const Home = ({ navigation }) => {
    const { t, i18n } = useTranslation();

    const isFocus = useIsFocused();
    const [tabs, setTabs] = useState<any[]>([]);
    const [active, setActive] = useState(false);

    useEffect(() => {
        initialize();
    } ,[isFocus])

    const initialize = () => {
        setTabs([
            {name: t("category.dental"), data: dentist(t)},
            {name: t("category.cosmetic"), data: dermatology(t)},
        ])
    }

    return (
        <SafeAreaView style={style.container}>
            <Header goBack={false}/>
            <ScrollView horizontal={false}>
                <View>

                    <ImageSlide />

                    <InputIcon onPress={() => console.log('Test')} placeholder={t('home.inputPlaceholder')} icon='search' />

                    <CategoryTab tabs={tabs} onPress={() => setActive(true)} itemStyle={style.itemStyle} type='box'/>

                    <View style={style.eventWrap}></View>
                    <View style={style.listWrap}>
                        <Icon name='refresh' />
                        <Text>{t('comingSoon')}</Text>
                    </View>

                </View>
            </ScrollView>
            <TestModal active={active} closeHandler={() => setActive(false)} />
        </SafeAreaView>
    )
}

export default Home;