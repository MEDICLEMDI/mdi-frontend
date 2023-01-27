import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    contentWrap: {
        paddingHorizontal: 30,
    },
    balanceWrap: {
        alignItems: 'flex-start',
        paddingHorizontal: 25,
        paddingVertical: 20,
        borderRadius: 28,
        backgroundColor: '#E3D0B6',
    },
    symbolWrap: {
        flexDirection: 'row',
        marginBottom: 15,
        alignItems: 'center'
    },
    symbolText: {
        fontSize: 16,
        marginLeft: 10,
        color: '#443927',
    },
    balance: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#706148',
        marginBottom: 20,
    },
    toKrwWrap: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 50,
        backgroundColor: '#00000030',
    },
    toKrwText: {
        textAlign: 'center',
        fontSize: 12,
        color: '#FFFFFF'
    },
    searchTx: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
        paddingVertical: 20,
    },
    transactionBox: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E8E8E8',
    },
    historyHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    transactionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    transactionHash: {
        marginVertical: 10,
        color: '#443927',
        fontSize: 12,
    }
});