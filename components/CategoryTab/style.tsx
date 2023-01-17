import { StyleSheet } from "react-native";

export default StyleSheet.create({
    tabButtonWrap: {
        height: 30,
        paddingHorizontal: 30,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    tabButton: {
        paddingHorizontal: 10,
        fontSize: 16,
        color: '#989898',
    },
    active: {
        fontWeight: 'bold',
        color: '#000',
        paddingBottom: 10,
        borderWidth: 1,
    }

})