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
  TouchableOpacity,
} from "react-native";
import Globais from "../Configs/Globais";
export default ({ navigation, titulo }) => {
  const [email, setemail] = useState("20120074");
  const [senha, setsenha] = useState("klgjoa");
  const [dados, setDados] = useState([]);
  const [temerro, settemErro] = useState(false);
  const [mensagem, setmensagem] = useState("");

  var dadosFormdata = new FormData();
  dadosFormdata.append("username", email);
  dadosFormdata.append("password", senha);

  var requestPost = {
    method: "POST",
    body: dadosFormdata,
  };

  function logincandidato() {
    var url = Globais.url + "loginmatricula";

    fetch(url, requestPost)
      .then((resp) => resp.json())
      .then((json) => {
        let dadosretorno = json;

        if (dadosretorno.error == "Unauthorized") {
          settemErro(true);

          setmensagem("Usuário ou senha incorretos");
        } else {
          let dados = dadosretorno.success;
          console.log(dados);
          Globais.nomeusuario = dados.aluno;
          Globais.emailusuario = dados.email;
          Globais.logado = true;
          Globais.turma = dados.turma;
          Globais.serie = dados.serie;
          Globais.id_matricula = dados.id_matricula;
          Globais.turno = dados.turno;
          Globais.curso = dados.curso;
          Globais.matricula = dados.matricula;
          Globais.codigousuario = dados.id_usuario;
          Globais.token = dados.access_token.accessToken;
          // console.log(dadosretorno.success.access_token.accessToken);
          Globais.fotousuario = dados.foto;
          Globais.ArmazenarJson("dadoslogin", dados);
          setDados(json.login);

          navigation.navigate("AppInicio");
        }
      })
      .catch((e) => {
        alert("erro" + e);
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
          <Card.Title style={{ color: "#43C1C4", fontFamily: "Porkys" }}>
            Bem vindo(a)
          </Card.Title>
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
            placeholder="Senha"
            value={senha}
            style={{ color: "#F38DAD" }}
            onChangeText={(texto) => {
              setsenha(texto);
            }}
            leftIcon={<Icon name="lock" size={24} color="#F38DAD" />}
          />
          <Button
            buttonStyle={{ backgroundColor: "#5BA3D9" }}
            onPress={() => logincandidato()}
            icon={<Icon name="arrow-right" size={18} color="white" />}
            title="Entrar"
          />
          {temerro ? (
            <View
              style={{
                width: "100%",
                height: 35,
                alignContent: "center",
                alignItems: "center",
                backgroundColor: "#5BA3D9",
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
