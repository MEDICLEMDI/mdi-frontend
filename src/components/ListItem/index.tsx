import {Platform, Text, View, Image, ImageProps, TouchableOpacity} from "react-native";
import {Colors} from "@/constants/theme";
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
}) => {

  return (
    <BoxDropShadow
      color={
        Platform.OS === 'ios'
          ? Colors.Medicle.Gray.SemiLight
          : Colors.Medicle.Gray.Standard
      }
      offset={[0, 7]}
      elevation={10}
      opacity={0.95}
      radius={10}
      style={style.itemWrap}>
      {image
        ? <Image source={image} />
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
    </BoxDropShadow>
  )
}

export default ListItem;
