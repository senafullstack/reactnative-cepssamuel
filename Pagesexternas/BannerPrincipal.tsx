import React, { useRef, useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
  Animated,
  useWindowDimensions,
} from "react-native";
import Globais from "../Configs/Globais";

const App = () => {
  useEffect(() => {
    carregarimagens();
  }, []);
  const [dadosbanner, setDadosBanner] = useState([]);
  const [carregando, setCarregando] = useState(false);

  const { width: windowWidth } = useWindowDimensions();
  function carregarimagens() {
    var url = Globais.url + "banner";
    setCarregando(true);

    fetch(url)
      .then((resp) => resp.json())
      .then((json) => {
        const resultado = json.data.data;
        //console.log(resultado);
        setDadosBanner(resultado);
      })
      .catch((e) => {
        alert("erro" + e);
      })
      .finally(() => {
        setCarregando(false);
      });
  }
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollContainer}>
        <ScrollView
          horizontal={true}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={1}
        >
          {dadosbanner.map((item, index) => {
            return (
              <View style={{ width: windowWidth, height: 250 }} key={index}>
                <ImageBackground
                  source={{ uri: Globais.urladmin + item.foto }}
                  style={styles.card}
                  resizeMode="contain"
                >
                  {item.titulo != "" ? (
                    <View style={styles.textContainer}>
                      <Text style={styles.infoText}>{item.titulo}</Text>
                    </View>
                  ) : (
                    <View>
                      <Text></Text>
                    </View>
                  )}
                </ImageBackground>
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.indicatorContainer}>
          {dadosbanner.map((item, index) => {
            const width = scrollX.interpolate({
              inputRange: [
                windowWidth * (index - 1),
                windowWidth * index,
                windowWidth * (index + 1),
              ],
              outputRange: [8, 16, 8],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={index}
                style={[styles.normalDot, { width }]}
              />
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollContainer: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    flex: 1,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    backgroundColor: "rgba(0,0,0, 0.7)",
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 5,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  normalDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: "silver",
    marginHorizontal: 4,
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
