import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Card, Button } from "react-native-elements";

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

import RenderHTML from "react-native-render-html";

export default ({ navigation, titulo }) => {
  useEffect(() => {
    carregarimagens();
  }, []);
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(false);

  function carregarimagens() {
    var url = Globais.url + "quemsomos";
    setCarregando(true);

    fetch(url)
      .then((resp) => resp.json())
      .then((json) => {
        const resultado = json.data.data;
        // console.log(resultado[0]);
        setDados(resultado[0]);
        // console.log(resultado);
      })
      .catch((e) => {
        console.log("erro" + e);
        setDados([]);
        setCarregando(false);
      })
      .finally(() => {
        setCarregando(false);
      });
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ width: "100%", flexDirection: "row" }}>
          <View>
            <Image
              source={{ uri: Globais.urladmin + dados.foto }}
              style={{
                width: "100%",
                height: Globais.percentualaltura(8),
              }}
            />
          </View>
          <View>
            <RenderHTML
              contentWidth={Globais.percentuallargura(85)}
              source={{
                html:
                  dados.texto != ""
                    ? "<span>" + dados.texto + "</span>"
                    : "<b>aguarde</b>",
              }}
            />
          </View>
        </View>
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
    fontSize: 13,
  },
});
