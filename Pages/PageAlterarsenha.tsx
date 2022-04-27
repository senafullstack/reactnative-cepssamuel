import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Card, Button } from "react-native-elements";

import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  TouchableOpacity,
} from "react-native";
import Globais from "../Configs/Globais";
import CalendarioNovo from "./CalendarioNovo";
export default ({ navigation, titulo }) => {
  const [email, setemail] = useState(Globais.emailusuario);
  const [senha, setsenha] = useState("");
  const [repetirsenha, setrepetirsenha] = useState("");
  const [dados, setDados] = useState([]);
  const [temerro, settemErro] = useState(false);
  const [mensagem, setmensagem] = useState("");

  var dadosFormdata = new FormData();
  dadosFormdata.append("username", email);
  dadosFormdata.append("password", senha);

  var requestPost = {
    method: "POST",
    headers: new Headers({
      Authorization: "Bearer " + Globais.token,
    }),
    body: dadosFormdata,
  };

  function logincandidato() {
    var url = Globais.url + "v1/alterarsenha/" + Globais.codigousuario;

    fetch(url, requestPost)
      .then((resp) => resp.json())
      .then((json) => {
        let dadosretorno = json.data.data;
        //  console.log(json);

        if (dadosretorno.error == "Unauthorized") {
          settemErro(true);

          setmensagem(dadosretorno.info);
        } else {
          //  Alert.alert("Senha alterada com sucesso!!");
          navigation.navigate("AppInicio");
        }
      })
      .catch((e) => {
        Alert.alert("Erro ao conectar o servidor");
      })
      .finally(() => {
        //alert("fim");
      });
  }

  return (
    <ScrollView>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 5,
        }}
      >
        <Image
          style={estilos.image}
          source={require("../assets/images/logo.png")}
        />

        <Card containerStyle={{ width: "90%", borderRadius: 10 }}>
          <Card.Title style={{ color: "#43C1C4" }}>Alterar Senha</Card.Title>
          <Card.Divider />
          <Input
            onChangeText={(texto) => {
              setemail(texto);
            }}
            style={{ color: "#F38DAD" }}
            value={email}
            placeholder="Email"
            leftIcon={{ type: "font-awesome", name: "user", color: "#F38DAD" }}
          />

          <Input
            secureTextEntry={true}
            placeholder="Nova Senha"
            value={senha}
            style={{ color: "#F38DAD" }}
            onChangeText={(texto) => {
              setsenha(texto);
            }}
            leftIcon={<Icon name="lock" size={24} color="#F38DAD" />}
          />
          <Input
            secureTextEntry={true}
            placeholder="Repetir Senha"
            value={repetirsenha}
            style={{ color: "#F38DAD" }}
            onChangeText={(texto) => {
              setrepetirsenha(texto);
            }}
            leftIcon={<Icon name="lock" size={24} color="#F38DAD" />}
          />
          <Button
            buttonStyle={{ backgroundColor: "#5BA3D9" }}
            onPress={() => logincandidato()}
            icon={<Icon name="arrow-right" size={18} color="white" />}
            title="Alterar Senha"
          />
          {temerro ? (
            <View
              style={{
                width: "100%",
                height: 15,
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: "red",
                }}
              >
                {mensagem}
              </Text>
            </View>
          ) : (
            <View></View>
          )}

          <Button
            onPress={() => navigation.navigate("AppInicio")}
            title={"Voltar"}
          />
        </Card>
      </View>
    </ScrollView>
  );
};

const estilos = StyleSheet.create({
  image: {
    width: "90%",
    height: Globais.percentualaltura(40),
    resizeMode: "contain",
  },
});
