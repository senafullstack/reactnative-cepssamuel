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
import RenderHTML from "react-native-render-html";
export default ({ navigation, titulo }) => {
  const [dados, setDados] = useState([]);
  const [dadoslogin, setDadoslogin] = useState("");
  const [carregando, setCarregando] = useState(false);
  async function Download(url) {
    await WebBrowser.openBrowserAsync(url);
  }
  async function carregaragenda(token, id_turma) {
    var url = Globais.url + "v3/apostilaturma/" + id_turma;
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
      carregaragenda(resposta.access_token.accessToken, resposta.id_turma);
    });
  }, []);

  return (
    <View>
      <MenuHeader navigation={navigation} titulo="Apostilas - Downloads" />

      <ScrollView style={styles.scrollView}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card containerStyle={{ width: "90%", borderRadius: 10 }}>
            <Card.Divider />

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
                  key={item.id_apostila}
                >
                  <View style={{ margin: 2, justifyContent: "center" }}>
                    <Text style={styles.titulo}>{item.dataformatada}</Text>
                    <Text style={styles.titulo}>{item.disciplina}</Text>
                    <RenderHTML
                      contentWidth={Globais.percentuallargura(85)}
                      source={{
                        html:
                          item.texto != ""
                            ? "<span>" + item.texto + "</span>"
                            : "<b>aguarde</b>",
                      }}
                    />
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
    fontSize: 15,
  },
});
