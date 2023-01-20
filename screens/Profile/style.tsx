import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    contentWrap: {
        paddingHorizontal: 30,
    },
    menuItems: {
        backgroundColor: '#FCF4E9',
        borderRadius: 100,
    },
    editProfileBtn: {
        paddingVertical: 5,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    profileWrap: {
        paddingHorizontal: 30,
        height: 75,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#E8E8E8',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    pointBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F2F2F2',
        borderRadius: 20,
        paddingVertical: 4,
        paddingHorizontal: 10,
    },
    profileNameWrap: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icProfile: {
        width: 32,
        height: 32,
        padding: 20,
        marginRight: 15,
        backgroundColor: '#F2F2F2',
        borderRadius: 50
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold'
    },
});