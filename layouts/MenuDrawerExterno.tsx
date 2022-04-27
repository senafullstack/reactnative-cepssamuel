import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Avatar, Badge, Icon, withBadge } from "react-native-elements";
import Globais from "../Configs/Globais";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default ({ navigation }) => {
  function limpaacesso() {
    Globais.limparvariaveis();
    navigation.navigate("PageInicioApp");
  }
  return (
    <View style={{ flexDirection: "column" }}>
      <View
        style={{
          width: "100%",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.navigate("PageQuemSomos")}>
          <Text style={estilo.titulo}>Sobre o CEPS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("PageCalendarioAnual")}
        >
          <Text style={estilo.titulo}>Calendário Anual</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("PageEstruturaPedagogica")}
        >
          <Text style={estilo.titulo}>Estrutura Pedagógica</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("PageDownloads")}>
          <Text style={estilo.titulo}>Downloads</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const estilo = StyleSheet.create({
  titulo: {
    fontSize: 20,
    fontFamily: "Porkys",
    color: "#ed3237",
    fontWeight: "normal",
    lineHeight: 35,
  },
});
