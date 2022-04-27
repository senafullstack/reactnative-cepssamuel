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
        <Avatar
          size="xlarge"
          title="LW"
          source={{
            uri: Globais.urladmin + Globais.fotousuario,
          }}
          onPress={() => console.log("asdf!")}
          activeOpacity={0.7}
        />
        <Text style={estilo.titulo}>{Globais.nomeusuario}</Text>
        <Text style={estilo.titulo}>Matrícula: {Globais.matricula}</Text>
        <Text style={estilo.titulo}>Turma: {Globais.turma}</Text>
        <Text style={estilo.titulo}>Série: {Globais.serie}</Text>
        <Text style={estilo.titulo}>Turno: {Globais.serie}</Text>

        {Globais.logado ? (
          <TouchableOpacity onPress={() => limpaacesso()}>
            <Text style={estilo.titulo}>Sair</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate("PageInicioApp")}
          >
            <Text>Login</Text>
          </TouchableOpacity>
        )}
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
