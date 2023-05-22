import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    containerWrap: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    containerOffset: {
        paddingHorizontal: 25,
    },
    button: {
        flex: 1,
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 20,
    },
    bottomButton: {
        paddingVertical: 15 ,
    },
    elementOffset: {
        marginHorizontal: 25,
        marginBottom: 20,
    },
    rowOffsetLarge: {
        marginVertical: 8,
    },
    rowOffset: {
        marginVertical: 4,
    },
    tabButton: {
        paddingBottom: 10,
        marginBottom: 20,
        marginRight: 15,
    },
    walletInfoWrap: {
        padding: 0,
        overflow: 'hidden',
        backgroundColor: Colors.Medicle.Primary,
        borderRadius: 28,
    },
    walletInfoWrapBG: {
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
    walletDeleteButton: {
        borderWidth: 0,
        backgroundColor: Colors.Medicle.Primary,
    },
    inputGap: {
        marginVertical: 8
    },
    pickerWrap: {
        borderRadius: 8,
        overflow: 'hidden',
    },
    picker: {
        backgroundColor: Colors.Medicle.Gray.Light,
    },
    input: {
        borderWidth: 1,
        borderColor: Colors.Medicle.Gray.Standard,
        backgroundColor: '#FFFFFF'
    },
    feeInput: {
        marginLeft: 8,
    },
    hr: {
        marginVertical: 12,
    },
    transactionHash: {
        marginVertical: 8,
    },
    transactionBalance: {
        textAlign: 'right',
    },
    warningWrap: {
        marginHorizontal: 30,
    },
    warning: {
        fontSize: 14,
    },
    warningHilight: {
        color: Colors.Medicle.Font.Red,
    },
    sendModalWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.Medicle.ModalBackground,
    },
    sendModal: {
        width: 320,
        borderRadius: 10,
        marginHorizontal: 20,
        backgroundColor: '#FFF',
        overflow: 'hidden',
    },
    sendModalHeader: {
        textAlign: 'center',
        marginVertical: 20,
    },
    sendOffset: {
        paddingHorizontal: 20,
    },
    sendAmount: {
        marginTop: 10,
        textAlign: 'right',
    },
    sendModalButtonWrap: {
        marginTop: 30,
    },
    sendModalButton: {
        flex: 1,
        paddingVertical: 15,
    },
    sendModalCancelButton: {
        backgroundColor: Colors.Medicle.Gray.Standard,
    },
    historyWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})