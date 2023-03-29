import {Text, View, Image, ImageProps, TouchableOpacity, GestureResponderEvent} from "react-native";
import BoxDropShadow from "@/components/BoxDropShadow";
import * as React from "react";
import Icon from "@/icons";
import style from './style';
import {fontStyleCreator} from "@/utils/fonts";
import {Colors} from "@/constants/theme";
import {
  PRODUCT_INFO_BROWN,
  PRODUCT_INFO_GRAY,
  PRODUCT_PRICE_DISCOUNT_LARGE,
  PRODUCT_PRICE_LARGE
} from "@/constants/fonts";

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
}:{
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
    <BoxDropShadow style={{ marginBottom: 10, }}>
      <TouchableOpacity onPress={onPress} style={style.itemWrap}>
        {image
          ? <Image style={style.imageBox} source={{ uri: image }} resizeMode='cover' />
          : <View style={style.imageBox}></View>
        }
        <View style={{ flex: 1 }}>
          {
            price
            ?
            <>
              <Text style={PRODUCT_INFO_GRAY}>{type}</Text>
              <Text style={PRODUCT_INFO_BROWN}>{location} | {label}</Text>
              <Text style={PRODUCT_INFO_BROWN}>{description}</Text>
            </>
            :
            <>
              <Text>{label}</Text>
              <Text>{location} | {locationDetail}</Text>
            </>
          }
          <View style={style.itemFooter}>
            <View>
              {
                Number(discount) !== 0 && (
                  <Text style={PRODUCT_PRICE_DISCOUNT_LARGE}>{discount}%</Text>
                )
              }
              <View style={style.priceWrap}>
                <Text style={PRODUCT_PRICE_LARGE}>{price}</Text>
                <Text style={PRODUCT_INFO_GRAY}>&nbsp;VAT포함</Text>
              </View>
            </View>
            <View>
              <TouchableOpacity>
                {
                  like
                  ?<Icon name="heart" fill='#EDDFCC'/>
                  :<Icon name="heart" stroke='#CECECE'/>
                }
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </BoxDropShadow>
  )
}

export default ListItem;
