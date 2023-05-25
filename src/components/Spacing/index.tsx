import React from "react";
import {View} from "react-native";

/**
 * Spacing
 * @comment 여백 공간 컴포넌트
 */
const Spacing = ({ size }:{ size: number }) => {
  return <View style={{ width: size }} />;
}

export default Spacing;
