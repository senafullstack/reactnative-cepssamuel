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
  Dimensions,
  TouchableOpacity,
} from "react-native";
import MenuHeader from "../layouts/MenuHeader";
import WebView from "react-native-webview";
import { obterToken } from "../Configs/Globais";
import Globais from "../Configs/Globais";
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default ({ navigation, titulo }) => {
  const percentual = 30;
  const dimensions = Dimensions.get("window");
  var imageHeight = dimensions.height;
  imageHeight = imageHeight - (imageHeight * percentual) / 100;
  console.log(imageHeight);
  const imageWidth = dimensions.width;

  var tamanho = imageWidth - (imageWidth * percentual) / 100;
  const [dados, setDados] = useState([]);
  const [dadoslogin, setDadoslogin] = useState("");
  const [carregando, setCarregando] = useState(false);
  async function carregaragenda(token, id_turma, id_matricula) {
    var url = Globais.url + "v3/frequencia/" + id_turma + "/" + id_matricula;

    setCarregando(true);
    //console.log(token);
    await fetch(url, {
      method: "get",
      headers: new Headers({
        Authorization: "Bearer " + token,
      }),
    })
      .then((resp) => resp.json())
      .then((json) => {
        const resultado = json.data.data;
        console.log(resultado);
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
      carregaragenda(
        resposta.access_token.accessToken,
        resposta.id_turma,
        resposta.id_matricula
      );
      setDadoslogin(resposta);
    });
  }, []);

  return (
    <View>
      <MenuHeader navigation={navigation} titulo="Frequência" />

      <ScrollView style={styles.scrollView}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card containerStyle={{ width: "90%", borderRadius: 10 }}>
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
                  style={{ width: "100%", flexDirection: "row" }}
                  key={item.id_frequencia}
                >
                  <View style={{ margin: 2, justifyContent: "center" }}>
                    <Text style={styles.titulo}>
                      {item.data_formatada} - {item.disciplina} -{" "}
                      {item.frequencia}
                    </Text>
                  </View>
                  <Card.Divider />
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
    color: "#43C1C4",
    fontSize: 20,
  },
});
