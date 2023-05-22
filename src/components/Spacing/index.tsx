import React from "react";
import {View} from "react-native";

const Spacing = ({ size }:{ size: number }) => {
  return <View style={{ width: size }} />;
}

export default Spacing;
