import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Card, Button } from "react-native-elements";
import { MaskedTextInput } from "react-native-mask-text";

import RenderHtml from "react-native-render-html";

import {
  View,
  Modal,
  StatusBar,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Image,
  Text,
  useWindowDimensions,
  SafeAreaView,
  ScrollView,
  Pressable,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Globais from "../../Configs/Globais";

import MenuHeaderExterno from "../../layouts/MenuHeaderExterno";
import RenderHTML from "react-native-render-html";
export default ({ route, navigation, titulo }) => {
  useEffect(() => {
    carregardados();
  }, []);
  const { width } = useWindowDimensions();

  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(false);

  function carregardados() {
    var url = Globais.url + "estruturapedagogica";
    setCarregando(true);

    fetch(url)
      .then((resp) => resp.json())
      .then((json) => {
        const resultado = json.data.data;
        console.log(resultado);
        setDados(resultado);
      })
      .catch((e) => {
        setDados([]);
      })
      .finally(() => {
        setCarregando(false);
      });
  }
  return (
    <ScrollView style={styles.scrollView}>
      <MenuHeaderExterno
        navigation={navigation}
        titulo={"Estrutura Pedagógica"}
      />

      <Card containerStyle={{ width: "95%", borderRadius: 10 }}>
        <Card.Title style={{ color: "#43C1C4" }}>
          <TouchableOpacity onPress={() => navigation.navigate("PageHome")}>
            <Icon
              name="arrow-left"
              style={{ color: "#F38DAD", fontSize: 22 }}
            />
          </TouchableOpacity>
        </Card.Title>
        <Card.Divider />

        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
                key={item.id_estruturapedagogica}
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
        </View>
      </Card>
    </ScrollView>
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
  a: {
    fontWeight: "300",
    color: "#FF3366", // make links coloured pink
  },
});
