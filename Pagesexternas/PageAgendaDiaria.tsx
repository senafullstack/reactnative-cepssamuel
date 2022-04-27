import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Card, Button } from "react-native-elements";
import MenuHeaderExterno from "../layouts/MenuHeaderExterno";

import {
  View,
  Modal,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Globais from "../Configs/Globais";
import Banner from "./Banner";

export default ({ navigation, titulo }) => {
  useEffect(() => {
    carregarimagens();
  }, []);

  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(false);

  function carregarimagens() {
    var url = Globais.url + "curso";
    setCarregando(true);

    fetch(url)
      .then((resp) => resp.json())
      .then((json) => {
        const resultado = json.data.data;
        setDados(resultado);
        // console.log(resultado);
      })
      .catch((e) => {
        alert("erro" + e);
      })
      .finally(() => {
        setCarregando(false);
      });
  }

  return (
    <ScrollView style={styles.scrollView}>
      <MenuHeaderExterno navigation={navigation} titulo={"Agenda Diária"} />
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card containerStyle={{ width: "95%", borderRadius: 10 }}>
          <Card.Title style={{ color: "#43C1C4" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("TabHomeexterna")}
            >
              <Icon
                name="arrow-left"
                style={{ color: "#F38DAD", fontSize: 22 }}
              />
            </TouchableOpacity>
          </Card.Title>
          <Card.Divider />
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
                  navigation.navigate("PageVerseries", {
                    informacoes: item,
                  });
                }}
                key={item.id_curso}
              >
                <View style={{ width: "100%", flexDirection: "row" }}>
                  <View style={{ margin: 2, justifyContent: "center" }}>
                    <Text style={styles.titulo}>{item.descricao}</Text>
                  </View>
                </View>
                <Card.Divider />
              </TouchableOpacity>
            ))
          )}
        </Card>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },

  titulo: {
    color: "#43C1C4",
    fontSize: 18,
  },
});
