import { StyleSheet } from "react-native";

export default StyleSheet.create({
    gridWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'flex-start',
        marginVertical: 10,
    },
    gridItem: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F3F1EB',
        borderRadius: 10,
        margin: 20/2,
    },
    gridItemEmpty: {
        margin: 20/2,
    },
    gridItemIcon: {
        width: 22,
        height: 22,
        marginBottom: 20,
    }
})