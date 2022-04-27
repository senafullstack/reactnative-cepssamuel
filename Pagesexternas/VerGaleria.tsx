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
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Globais from "../Configs/Globais";
export default ({ route, navigation, titulo }) => {
  const [carregando, setCarregando] = useState(false);
  const fotourl = route.params.foto;

  const dimensions = Dimensions.get("window");
  const imageHeight = Math.round((dimensions.width * 9) / 16);
  const imageWidth = dimensions.width;
  return (
    <SafeAreaView style={styles.container}>
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
            <Card containerStyle={{ width: "90%", borderRadius: 10 }}>
              <Card.Title style={{ color: "#43C1C4" }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("PageInicioApp")}
                >
                  <View>
                    <Text>Fechar</Text>
                  </View>
                  <Icon name="close" />
                </TouchableOpacity>
              </Card.Title>
              <Card.Divider />

              <Card.Image
                source={{ uri: Globais.urladmin + fotourl }}
                style={{
                  height: imageHeight,
                  width: "100%",
                  resizeMode: "contain",
                }}
              />
            </Card>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
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
  image: {
    flex: 1,
    aspectRatio: 1.5,
    resizeMode: "contain",
  },
});
