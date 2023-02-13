import { Image, Text, View } from 'react-native';

import ImageSlide_1 from '@/assets/images/ImageSlide_1.png';

import style from './style';
import { fontStyleCreator } from "@/utils/fonts";
import { Colors } from "@/constants/theme";

const ImageSlide = () => {
  const SLIDE_IMAGE_LENGTH_FONT = fontStyleCreator({
    color: Colors.Medicle.Font.Gray.Light,
    size: 11,
  });
  const SLIDE_IMAGE_INDEX_FONT = fontStyleCreator({
    color: Colors.Medicle.Font.White,
    size: 11,
  });
  return (
    <View>
      {/*<View style={style.imageItem} />*/}
      <Image
        source={ImageSlide_1}
        resizeMode="contain"
        style={style.imageItem}
      />
      <View style={style.imageSlideIndex}>
        <Text style={SLIDE_IMAGE_INDEX_FONT}>{1}</Text>
        <Text style={SLIDE_IMAGE_LENGTH_FONT}> / {1}</Text>
      </View>
    </View>
  );
};

export default ImageSlide;
