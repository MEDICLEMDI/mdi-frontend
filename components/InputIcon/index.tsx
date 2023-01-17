import {TextInput, Pressable, View, Image, PressableProps, TextInputProps, ImageURISource} from 'react-native'
import style from "./style";

import search from "../../assets/images/ic_search.png";

type props = {
    press: PressableProps;
    icon: ImageURISource;
    input: TextInputProps;

}

const InputIcon = ({
    onPress,
    placeholder,
    icon
}) => {
    return (
        <View style={style.inputWrap}>
            <TextInput placeholder={placeholder}/>
            <Pressable onPress={onPress}>
                <Image source={icon} style={style.ic_search}/>
            </Pressable>
        </View>
    )
}

export default InputIcon;