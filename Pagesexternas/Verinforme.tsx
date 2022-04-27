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

export default ({ route, navigation, titulo }) => {
  useEffect(() => {
    setDados(informacoes);
  }, []);
  const { width } = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const tamanho = Dimensions.get("window").width;
  console.log(tamanho);

  const informacoes = route.params.informacoes;

  return (
    <ScrollView style={styles.scrollView}>
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
          <Card containerStyle={{ width: "95%", borderRadius: 10 }}>
            <Card.Title style={{ color: "#43C1C4" }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("PageInicioApp")}
              >
                <Icon
                  name="arrow-left"
                  style={{ color: "#F38DAD", fontSize: 22 }}
                />
                <View>
                  <Text> {dados.titulo}</Text>
                </View>
              </TouchableOpacity>
            </Card.Title>
            <Card.Divider />

            <TouchableOpacity
              onPress={() => {
                Globais.Download(Globais.urladmin + dados.foto);
              }}
            >
              <Card.Image
                style={{ width: "100%" }}
                source={{ uri: Globais.urladmin + dados.foto }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Card.Divider />
            <RenderHtml
              contentWidth={width}
              source={{
                html:
                  dados.texto != ""
                    ? "<span>" + dados.texto + "</span>"
                    : "<b>semconteudo</b>",
              }}
            />
          </Card>
        )}
      </View>
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
