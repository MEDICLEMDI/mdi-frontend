import * as React from 'react';
import { ActivityIndicator, Dimensions, GestureResponderEvent, Image, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import style from './style';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Config from 'react-native-config';

interface ImageSliderProp {
  uri: string;
  onPress?: (((event: GestureResponderEvent) => void) & (() => void)) | undefined;
}

/**
 * ImageSlider
 * @param {ImageSliderProp[]} data {uri: string; onPress?: (((event: GestureResponderEvent) => void) & (() => void)) | undefined;}
 * @comment ImageSliderProp[]의 형태로 설정된 배열의 uri를 기준으로 이미지 슬라이더 생성 각 이미지에 onPress이벤트를 할당가능
 */
function ImageSlider({ data }: { data:ImageSliderProp[] }) {
  const width = Dimensions.get('window').width;
  const [slideIndex, setSlideIndex] = React.useState(1);
  const { IMAGESERVER_PREFIX } = Config;

  return (
    <View style={{ flex: 1 }}>
      {data.length > 0 
      ?
      <>
        <Carousel
          loop
          width={width}
          height={width / 3}
          autoPlay={true}
          data={data}
          scrollAnimationDuration={1000}
          autoPlayInterval={5000}
          onSnapToItem={(index) => setSlideIndex(index+1)}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={item.onPress}>
              {
                item.uri === "0" || item.uri === undefined
                ?
                <View style={{ 
                  height: width / 3, 
                  width: width, 
                  justifyContent: 'center', 
                  alignItems: "center",
                  backgroundColor: "#EFEFEF"
                }}>
                  <Text>등록된 이미지가 없습니다.</Text>
                </View>
                :
                <Image 
                  key={index} 
                  source={{ uri: `${IMAGESERVER_PREFIX}${item.uri}` }} 
                  style={{ width: width, height: width / 3 }} 
                  resizeMode="contain"
                />

              }
            </TouchableOpacity>
          )}
        />
        <View style={style.imageSlideIndex}>
          <Text style={{ color: '#FFF' }}>{slideIndex} / {data.length}</Text>
        </View>
      </>
      :
      <View style={{ height: width / 3, width: width, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
      }
    </View>
  );
}

export default ImageSlider;