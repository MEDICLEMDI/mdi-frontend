import Icon from "@/components/icons";
import { Row } from "@/components/layout";
import { Colors } from "@/constants/theme";
import { GestureResponderEvent, Text, TouchableOpacity, View } from "react-native";
import style from "./style";
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