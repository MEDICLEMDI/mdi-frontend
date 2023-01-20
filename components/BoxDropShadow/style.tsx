import { StyleSheet } from "react-native";

const Style = (color, offset, opacity, radius, elevation) => StyleSheet.create({
    boxWrap: {
        padding: 20,
        backgroundColor: '#FFF',

        shadowColor: color,
        shadowOffset: {
            width: offset[0],
            height: offset[1],
        },
        shadowOpacity: opacity,
        shadowRadius: radius,
        elevation: elevation,
    },
})

export default Style;