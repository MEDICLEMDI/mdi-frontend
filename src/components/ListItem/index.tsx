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
  DARK_GRAY_10, DARK_GRAY_BOLD_18, ORANGE_BOLD_10, ORANGE_BOLD_14,
  PRODUCT_INFO_BROWN,
  PRODUCT_INFO_GRAY,
  PRODUCT_PRICE_DISCOUNT_LARGE,
  PRODUCT_PRICE_LARGE, STANDARD_GRAY_10,
} from '@/constants/fonts';
import { Colors } from '@/constants/theme';
import Icon from '@/icons';
import { fontStyleCreator } from '@/utils/fonts';

import style from './style';

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
}: {
  image?: ImageProps;
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
}) => {
  return (
    <BoxDropShadow style={{ marginBottom: 10 }}>
      <TouchableOpacity onPress={onPress} style={style.itemWrap}>
        {image ? (
          <Image
            style={style.imageBox}
            source={{ uri: image }}
            resizeMode="cover"
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
              <TouchableOpacity>
                {like ? (
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
