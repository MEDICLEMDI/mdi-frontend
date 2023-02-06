import {TextInput, Pressable, View, Image, PressableProps, TextInputProps, ImageURISource} from 'react-native'
import style from "./style";

import search from "@/assets/images/ic_search.png";
import Icon from "@/icons";

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
            <TextInput placeholder={placeholder} autoFocus={false}/>
            <Pressable onPress={onPress}>
                <Icon name={icon} />
            </Pressable>
        </View>
    )
}

export default InputIcon;