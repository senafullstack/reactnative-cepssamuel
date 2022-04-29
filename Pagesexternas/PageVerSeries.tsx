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
import Globais from "../Configs/Globais";
import Banner from "./Banner";
import MenuHeaderExterno from "../layouts/MenuHeaderExterno";

export default ({ route, navigation, titulo }) => {
  useEffect(() => {
    //setDados(informacoes);

    carregardados(informacoes.id_curso);
    console.log(informacoes.id_curso);
  }, []);
  const { width } = useWindowDimensions();

  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const informacoes = route.params.informacoes;
  function carregardados(id: any) {
    var url = Globais.url + "series/" + id;
    setCarregando(true);

    fetch(url)
      .then((resp) => resp.json())
      .then((json) => {
        const resultado = json.data.data;
        setDados(resultado);
        console.log(resultado);
      })
      .catch((e) => {
        alert("erro" + e);
      })
      .finally(() => {
        setCarregando(false);
      });
  }
  return (
    <>
      <MenuHeaderExterno
        navigation={navigation}
        titulo={informacoes.descricao}
      />
      <ScrollView style={styles.scrollView}>
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
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("PageVerAgendaDiaria", {
                      informacoes: item,
                    });
                  }}
                  key={item.ordem}
                >
                  <View style={{ width: "100%", flexDirection: "row" }}>
                    <View style={{ margin: 2, justifyContent: "center" }}>
                      <Text style={styles.titulo}>
                        {item.serie} - {item.nome}
                      </Text>
                    </View>
                  </View>
                  <Card.Divider />
                </TouchableOpacity>
              ))
            )}
          </View>
        </Card>
      </ScrollView>
    </>
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
