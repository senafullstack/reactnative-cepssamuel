// Import Libraries for making header component
import React from "react";
import { View } from "react-native";

const CardBanner = (props) => (
  <View style={[styles.containerStyle, props.style]}>{props.children}</View>
);

const styles = {
  containerStyle: {
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: "#ddd",
    marginTop: 10,
  },
};

export { CardBanner };
