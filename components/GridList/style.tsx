import { StyleSheet } from "react-native";

export default StyleSheet.create({
    gridWrap: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'flex-start',
        marginVertical: 10,
    },
    circleWrap: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
    },
    gridItemBox: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    gridItemCircle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 10,
    },
    gridItemEmpty: {
        margin: 10,
        backgroundColor: '#FFFFFF',
    },
    gridItemIcon: {
        marginBottom: 20,
    }
})