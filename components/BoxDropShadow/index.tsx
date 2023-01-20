import { View } from 'react-native';
import style from './style';

const BoxDropShadow = ({ color, offset, opacity, radius, elevation, viewStyle, children }) => {
    return (
        <View style={[style(color, offset, opacity, radius, elevation).boxWrap, viewStyle]}>
            {children}
        </View>
    )
}

export default  BoxDropShadow;