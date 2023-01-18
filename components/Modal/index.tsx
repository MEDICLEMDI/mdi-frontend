import {Modal, View, Text, TouchableOpacity, SafeAreaView} from "react-native";
import * as React from "react";
import style from "./style";

const TestModal = ({ active, closeHandler }) => {

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
                    <Text style={style.modalTitle}>해당 서비스는 아직 준비중이에요.</Text>
                    <TouchableOpacity style={style.closeBtn} onPress={() => closeHandler()}>
                        <Text style={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 14}}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )

}

export default TestModal;