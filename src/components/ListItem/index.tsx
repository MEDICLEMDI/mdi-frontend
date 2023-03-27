import {Text, View, Image, ImageProps, TouchableOpacity, GestureResponderEvent} from "react-native";
import BoxDropShadow from "@/components/BoxDropShadow";
import * as React from "react";
import Icon from "@/icons";
import style from './style';
import {fontStyleCreator} from "@/utils/fonts";
import {Colors} from "@/constants/theme";

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
  const DISCOUNT_FONT = fontStyleCreator({
    size: 14,
    weight: 'bold',
    color: Colors.Medicle.Orange,
  })
  const ITEM_PRICE_FONT = fontStyleCreator({
    size: 18,
    weight: 'bold',
    color: Colors.Medicle.Font.Brown.Dark,
  })
  const DESCRIPTION_FONT = fontStyleCreator({
    size: 10,
    color: Colors.Medicle.Font.Gray.Standard,
  });
  const ITEM_TITLE_FONT = fontStyleCreator({
    size: 10,
    color: Colors.Medicle.Font.Brown.Dark,
  })

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
              <Text style={DESCRIPTION_FONT}>{type}</Text>
              <Text style={ITEM_TITLE_FONT}>{location} | {label}</Text>
              <Text style={ITEM_TITLE_FONT}>{description}</Text>
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
                  <Text style={DISCOUNT_FONT}>{discount}%</Text>
                )
              }
              <View style={style.priceWrap}>
                <Text style={ITEM_PRICE_FONT}>{price}</Text>
                <Text style={DESCRIPTION_FONT}>&nbsp;VAT포함</Text>
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
