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
  async function carregaragenda(token) {
    var url = Globais.url + "v1/novidades";
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
      carregaragenda(resposta.access_token);
    });
  }, []);

  return (
    <View>
      <MenuHeader navigation={navigation} titulo="Novidades" />

      <ScrollView style={styles.scrollView}>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Card containerStyle={{ width: "90%", borderRadius: 10 }}>
            <Card.Title style={{ color: "#43C1C4" }}>Novidades </Card.Title>
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
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("PageVerNovidade", {
                      informacoes: item,
                    });
                  }}
                  key={item.id_noticia}
                >
                  <View style={{ width: "100%", flexDirection: "row" }}>
                    <View style={{ flex: 0.2 }}>
                      <Image
                        source={{ uri: Globais.urladmin + item.foto }}
                        style={{
                          width: "100%",
                          height: Globais.percentualaltura(8),
                        }}
                      />
                    </View>
                    <View
                      style={{ margin: 2, flex: 0.8, justifyContent: "center" }}
                    >
                      <Text style={styles.titulo}>{item.titulo}</Text>
                      <Text style={{ color: "#F38DAD" }}>
                        {item.datanoticiaFormatada}
                      </Text>
                    </View>
                  </View>
                  <Card.Divider />
                </TouchableOpacity>
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
