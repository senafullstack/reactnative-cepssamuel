import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icone from "../Configs/Icone";
export default ({ navigation, titulo }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        height: 50,
        backgroundColor: "#ed3237",
      }}
    >
      <View
        style={{
          flex: 0.2,
          alignContent: "",
          justifyContent: "center",
          marginLeft: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icone color="#fff" estilo={{ FontSize: 12 }} name="bars" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 0.8,
          alignContent: "flex-start",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 20, fontFamily: "Porkys" }}>
          {titulo}
        </Text>
      </View>
    </View>
  );
};
