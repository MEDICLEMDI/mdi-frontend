import { SafeAreaView, View, Text, Image } from 'react-native';
import style from "./style";

import logo from "../../assets/images/ic_logo.png"
import left_arrow from "../../assets/images/ic_arrow_left.png";
import alarm from "../../assets/images/ic_alarm.png";

const Header = () => {

    return (
        <View style={style.headerWrap}>
            <Image source={left_arrow} style={style.ic_left_arrow}/>
            <Image source={logo} style={style.logo}/>
            <Image source={alarm} style={style.ic_alarm}/>
        </View>
    );
}

export default Header;