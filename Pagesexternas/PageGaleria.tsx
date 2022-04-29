import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Card, Button } from "react-native-elements";
import { MaskedTextInput } from "react-native-mask-text";

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
import Globais from "../Configs/Globais";
import MenuHeaderExterno from "../layouts/MenuHeaderExterno";

export default ({ navigation, titulo }) => {
  useEffect(() => {
    carregarimagens();
  }, []);
  const [modalVisible, setModalVisible] = useState(false);
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(false);

  function carregarimagens() {
    var url = Globais.url + "galeria";
    setCarregando(true);

    fetch(url)
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

  return (
    <SafeAreaView style={styles.container}>
      <MenuHeaderExterno navigation={navigation} titulo={"Galeria"} />
      <ScrollView>
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
              <SafeAreaView style={styles.container}>
                <FlatList
                  data={dados}
                  numColumns={3}
                  horizontal={false}
                  keyExtractor={(item) => item.id_album.toString()}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("PageVergaleriaexterno", {
                          foto: item.foto,
                        });
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          margin: 1,
                        }}
                      >
                        <Image
                          style={styles.imageThumbnail}
                          source={{ uri: Globais.urladmin + item.foto }}
                        />
                        <Text
                          style={{
                            fontSize: 9,
                            fontFamily: "Porkys",
                            color: "#F38DAD",
                          }}
                        >
                          {item.titulo}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </SafeAreaView>
            )}
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  imageThumbnail: {
    justifyContent: "center",
    alignItems: "center",
    height: Globais.percentualaltura(13),
    width: Globais.percentuallargura(26),
  },
});
