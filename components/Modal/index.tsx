import {Modal, View, Text, TouchableOpacity, SafeAreaView} from "react-native";
import * as React from "react";
import style from "./style";
import {useTranslation} from "react-i18next";

const TestModal = ({ active, closeHandler }) => {
    const { t } = useTranslation();

    return (
        <Modal
            animationType="fade"
            visible={active}
            transparent={true}
            onRequestClose={() => {
                closeHandler()
            }}
        >
            <View style={style.modalWrap}>
                <View style={style.modalContent}>
                    <Text style={style.modalTitle}>{t('comingSoon')}</Text>
                    <TouchableOpacity style={style.closeBtn} onPress={() => closeHandler()}>
                        <Text style={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 14}}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )

}

export default TestModal;