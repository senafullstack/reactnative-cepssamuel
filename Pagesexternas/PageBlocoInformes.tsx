import React, { useEffect, useState } from "react";

import { Input, Icon, Card, Button } from "react-native-elements";

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
  const [modalVisible, setModalVisible] = useState(false);
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(false);

  function carregarimagens() {
    var url = Globais.url + "noticiastop/5";
    setCarregando(true);

    fetch(url)
      .then((resp) => resp.json())
      .then((json) => {
        const resultado = json.data.data;
        setDados(resultado);
        // console.log(resultado);
      })
      .catch((e) => {
        console.log("erro-> " + e);
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
        <Card containerStyle={{ width: "100%" }}>
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
                  navigation.navigate("PageVerinformeexterno", {
                    informacoes: item,
                  });
                }}
                key={index}
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
                    {item.arquivo !== "" ? (
                      <Text>
                        <TouchableOpacity
                          onPress={() => {
                            Globais.Download(
                              Globais.urladminarquivos + item.arquivo
                            );
                          }}
                        >
                          <Icon
                            name="file"
                            color="#43C1C4"
                            type="font-awesome"
                          />
                        </TouchableOpacity>
                      </Text>
                    ) : (
                      <Text></Text>
                    )}
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
    fontSize: 13,
  },
});
