import {Platform, StyleSheet} from "react-native";

export default StyleSheet.create({
    inputWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        marginVertical: 20,
        marginHorizontal: 25,
        paddingHorizontal: 20,
        paddingVertical: Platform.OS === 'ios' ? 10 : 0,
        borderRadius: 10,
    },
    ic_search: {
        width: 18,
        height: 18,
    }
})