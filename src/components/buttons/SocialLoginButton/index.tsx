import Icon from "@/components/icons";
import { Row } from "@/components/layout";
import { Colors } from "@/constants/theme";
import { GestureResponderEvent, Text, TouchableOpacity, View } from "react-native";
import style from "./style";

/**
 * SocialLoginButton
 * @param {string} label
 * @param {string} color
 * @param {string} icon
 * @param {string} textColor
 * @param {((event: GestureResponderEvent) => void) | undefined} onPress
 * @comment 소셜 로그인 컴포넌트입니다. 컴포넌트 호출시 설정된 icon에 따라서 소셜 아이콘이 렌더링 됩니다. 
 * 해당 아이콘은 icon 컴포넌트에 선언되어있는 아이콘의 이름을 기준으로 가져옵니다. 만약 존재하지 않는 아이콘을 참조하는경우
 * 에러가 발생하여 페이지 렌더링이 불가능합니다.
 */
export const SocialLoginButton = ({
    label,
    color,
    icon,
    textColor = Colors.Medicle.Font.Gray.Dark,
    onPress,
  }: {
    label: string;
    color: string;
    icon: string;
    textColor?: string;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
  }) => {
    return (
      <TouchableOpacity
        style={[style.socialLoginButton, { backgroundColor: color }]}
        onPress={onPress}>
        <Row align="center" justify="space-between">
          <View style={style.socialLoginButtonIcon}>
            <Icon name={icon} />
          </View>
          <Text style={[style.socialLoginButtonLabel, { color: textColor }]}>
            {label}
          </Text>
        </Row>
      </TouchableOpacity>
    );
  };