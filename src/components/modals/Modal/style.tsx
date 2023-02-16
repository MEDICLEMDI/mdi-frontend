import { StyleSheet } from "react-native";

export default StyleSheet.create({
    modalWrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#00000080'
    },
    modalContent: {
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#FFFFFF',
        width: 250,
        height: 150,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 14,
        marginTop: 30,
    },
    closeBtn: {
        backgroundColor: '#F77F00',
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 20,
        marginTop: 20,
    }
})