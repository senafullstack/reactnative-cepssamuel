import React from "react";
import { View, Text, Image, StyleSheet, StatusBar } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";

const data = [
  {
    title: "Title 1",
    text: "Description.\nSay something cool",
    image: require("../assets/images/banner1.jpg"),
    bg: "#59b2ab",
  },
  {
    title: "Title 2",
    text: "Other cool stuff",
    image: require("../assets/images/banner2.jpg"),
    bg: "#febe29",
  },
  {
    title: "Rocket guy",
    text: "I'm already out of descriptions\n\nLorem ipsum bla bla bla",
    image: require("../assets/images/banner3.jpg"),
    bg: "#22bcb5",
  },
];

type Item = typeof data[0];

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "blue",
  },
  image: {
    width: 320,
    height: 320,
    marginVertical: 32,
  },
  text: {
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  },
  title: {
    fontSize: 22,
    color: "white",
    textAlign: "center",
  },
});

export default class App extends React.Component {
  renderItem = ({ item }: { item: Item }) => {
    return (
      <View
        style={[
          styles.slide,
          {
            backgroundColor: item.bg,
          },
        ]}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} style={styles.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };

  keyExtractor = (item: Item) => item.title;

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar translucent backgroundColor="transparent" />
        <AppIntroSlider
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          data={data}
        />
      </View>
    );
  }
}
