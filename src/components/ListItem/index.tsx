import {Text, View, Image, ImageProps, TouchableOpacity, GestureResponderEvent} from "react-native";
import BoxDropShadow from "@/components/BoxDropShadow";
import * as React from "react";
import Icons from "@/icons";
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
  price?: string;
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
              <Text>{type}</Text>
              <Text>{location} | {label}</Text>
              <Text>{description}</Text>
            </>
            :
            <>
              <Text>{label}</Text>
              <Text>{location} | {locationDetail}</Text>
            </>
          }
          <View style={style.itemFooter}>
            <View>
              <Text style={{ fontWeight: 'bold', fontSize: 14 }}>{discount}%</Text>
              <View style={style.priceWrap}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{price}</Text>
                <Text>VAT포함</Text>
              </View>
            </View>
            <View>
              <TouchableOpacity>
                {
                  like
                  ?<Icons name="heart" />
                  :<Icons name="heart" />
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
