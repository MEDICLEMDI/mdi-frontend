import * as React from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageProps,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import BoxDropShadow from '@/components/BoxDropShadow';
import {
  DARK_GRAY_10,
  DARK_GRAY_BOLD_18,
  ORANGE_BOLD_10,
  ORANGE_BOLD_14,
  STANDARD_GRAY_10,
} from '@/constants/theme';
import Icon from '@/icons';

import style from './style';

/**
 * ListItem
 * @comment 메디클에서 사용하는 리스트에 기본적으로 사용되는 공용 리스트 아이템 컴포넌트입니다.
 * 백엔드에서 전달받는 상품, 병원 정보등의 데이터를 기준으로 작성되었습니다. 기본적으로 이미지, 가격, 설명등을 포함하고 있습니다.
 */
const ListItem = ({
  image,
  type,
  location,
  locationDetail,
  label,
  description,
  discount,
  price,
  like = false,
  onPress,
  likeOnpress,
}: {
  image?: string;
  like?: boolean;
  review?: string;
  type?: string;
  location?: string;
  locationDetail?: string;
  label?: string;
  description?: string;
  discount?: number;
  price?: string | undefined;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
  likeOnpress?: ((event: GestureResponderEvent) => void) | undefined;
}) => {
  return (
    <BoxDropShadow style={{ marginBottom: 10, marginHorizontal: 25 }}>
      <TouchableOpacity onPress={onPress} style={style.itemWrap}>
        {image ? (
          <Image
            style={style.imageBox}
            source={{ uri: image }}
            resizeMode="contain"
          />
        ) : (
          <View style={style.imageBox} />
        )}
        <View style={{ flex: 1 }}>
          {price ? (
            <>
              <Text style={STANDARD_GRAY_10}>{type}</Text>
              <Text style={DARK_GRAY_10}>
                {location} | {label}
              </Text>
              <Text style={DARK_GRAY_10}>{description}</Text>
            </>
          ) : (
            <>
              <Text>{label}</Text>
              <Text>
                {location} | {locationDetail}
              </Text>
            </>
          )}
          <View style={style.itemFooter}>
            <View>
              {Number(discount) !== 0 && (
                <Text style={ORANGE_BOLD_14}>{discount}%</Text>
              )}
              <View style={style.priceWrap}>
                <Text style={DARK_GRAY_BOLD_18}>{price}</Text>
                <Text style={STANDARD_GRAY_10}>&nbsp;VAT포함</Text>
              </View>
            </View>
            <View>
              <TouchableOpacity onPress={likeOnpress}>
                {like === true ? (
                  <Icon name="heart" fill="#EDDFCC" />
                ) : (
                  <Icon name="heart" stroke="#CECECE" />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </BoxDropShadow>
  );
};

export default ListItem;
