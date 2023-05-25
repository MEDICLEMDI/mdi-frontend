import {
  Image,
  ImageURISource,
  Pressable,
  PressableProps,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

import search from '@/assets/images/ic_search.png';
import Icon from '@/icons';

import style from './style';

type props = {
  press: PressableProps;
  icon: ImageURISource;
  input: TextInputProps;
};

/**
 * InputIcon
 * @comment 아이콘이 포함되어있는 입력폼
 */
const InputIcon = ({ onPress, placeholder, icon }) => {
  return (
    <View style={style.inputWrap}>
      <TextInput placeholder={placeholder} autoFocus={false} />

      <Pressable onPress={onPress}>
        <Icon name={icon} />
      </Pressable>
    </View>
  );
};

export default InputIcon;
