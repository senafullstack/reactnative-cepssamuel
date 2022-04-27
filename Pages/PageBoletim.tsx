import React, { useEffect, useState } from "react";
import { Input, Card, Button } from "react-native-elements";

import {
  View,
  Modal,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  Image,
  Text,
  SafeAreaView,
  ScrollView,
  Pressable,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";

import * as WebBrowser from "expo-web-browser";
import MenuHeader from "../layouts/MenuHeader";

import { obterToken } from "../Configs/Globais";
import Globais from "../Configs/Globais";
import Icone from "../Configs/Icone";

export default ({ navigation, titulo }) => {
  const [dados, setDados] = useState([]);
  const [dadoslogin, setDadoslogin] = useState("");
  const [carregando, setCarregando] = useState(false);
  async function Download(url) {
    await WebBrowser.openBrowserAsync(url);
  }
  async function carregarboletim(token, matricula) {
    var url = Globais.url + "v3/boletim/" + matricula;
    //console.log(url);
    setCarregando(true);
    await fetch(url, {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + token,
      }),
    })
      .then((resp) => resp.json())
      .then((json) => {
        const resultado = json.data.data;
        //console.log(resultado);
        setDados(resultado);
      })
      .catch((e) => {
        alert("erro" + e);
      })
      .finally(() => {
        setCarregando(false);
      });
  }

  useEffect(() => {
    obterToken("dadoslogin").then((resposta) => {
      // console.log(resposta);
      carregarboletim(resposta.access_token.accessToken, resposta.id_matricula);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MenuHeader navigation={navigation} titulo="Boletim" />
      <ScrollView style={styles.scrollView}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>{Globais.nomeusuario}</Text>
          <Text>Matícula: {Globais.matricula}</Text>
          <Card containerStyle={{ width: "95%", borderRadius: 10 }}>
            <View
              style={{
                flexDirection: "row",
                flex: 1,
              }}
            >
              <View style={{ backgroundColor: "#373435", flex: 0.4 }}>
                <Text style={{ color: "white" }}>Marteria</Text>
              </View>
              <View style={{ backgroundColor: "#373435", flex: 0.1 }}>
                <Text style={{ color: "white" }}>N 1</Text>
              </View>
              <View style={{ backgroundColor: "#373435", flex: 0.1 }}>
                <Text style={{ color: "white" }}>N 2</Text>
              </View>
              <View style={{ backgroundColor: "#373435", flex: 0.1 }}>
                <Text style={{ color: "white" }}>N 3</Text>
              </View>
              <View style={{ backgroundColor: "#373435", flex: 0.1 }}>
                <Text style={{ color: "white" }}>N 4</Text>
              </View>
              <View style={{ backgroundColor: "#373435", flex: 0.1 }}>
                <Text style={{ color: "white" }}>N 5</Text>
              </View>
              <View style={{ backgroundColor: "#373435", flex: 0.1 }}>
                <Text style={{ color: "white" }}>N 6</Text>
              </View>
            </View>
            {carregando ? (
              <View
                style={{
                  width: Globais.percentuallargura(85),
                  height: Globais.percentualaltura(85),
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size="large" animating={true} />
              </View>
            ) : (
              dados.map((item, index) => (
                <View
                  style={{
                    flexDirection: "row",
                    flex: 1,
                  }}
                  key={item.id_boletim}
                >
                  <View style={{ backgroundColor: "#373435 ", flex: 0.4 }}>
                    <Text>{item.disciplina}</Text>
                  </View>
                  <View style={{ flex: 0.1 }}>
                    <Text>{item.nota1}</Text>
                  </View>
                  <View style={{ flex: 0.1 }}>
                    <Text>{item.nota2}</Text>
                  </View>
                  <View style={{ flex: 0.1 }}>
                    <Text>{item.nota3}</Text>
                  </View>
                  <View style={{ flex: 0.1 }}>
                    <Text>{item.nota4}</Text>
                  </View>
                  <View style={{ flex: 0.1 }}>
                    <Text>{item.nota5}</Text>
                  </View>
                  <View style={{ flex: 0.1 }}>
                    <Text>{item.nota6}</Text>
                  </View>
                </View>
              ))
            )}
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 0,
  },
  text: {
    fontSize: 42,
  },
  titulo: {
    color: "#ed3237",
    fontSize: 15,
    backgroundColor: "#f2f2f2",
    flex: 3,
  },
});
