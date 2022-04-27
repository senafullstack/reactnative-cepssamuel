import * as React from "react";
import {
  View,
  ImageBackground,
  FlatList,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { CardBanner } from "./CardBanner";
import Globais from "../Configs/Globais";
var eventslist = "";
const dimensions = Dimensions.get("window");
const imageHeight = Math.round((dimensions.width * 9) / 16);
const imageWidth = dimensions.width;
const percentual = 10;
var tamanho = imageWidth - (imageWidth * percentual) / 100;

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dados: [],
    };
  }
  componentDidMount() {
    fetch(Globais.url + "banner")
      .then((resp) => resp.json())
      .then((json) => {
        const resultado = json.data.data;
        eventslist = resultado;
        this.setState({
          data: resultado,
        });
      })
      .catch((e) => {
        alert("erro" + e);
      })
      .finally(() => {});
  }
  keyExtractor = (item, index) => index.toString();
  renderCarousel = ({ item }) => (
    <CardBanner style={styles.cardContainerStyle}>
      <TouchableWithoutFeedback
        onPress={() => {
          this.setState({
            data: item.title,
          });
          this.props.onCarouselPress;
        }}
      >
        <ImageBackground
          source={{ uri: Globais.urladmin + item.foto }}
          style={styles.imageBackgroundStyle}
        ></ImageBackground>
      </TouchableWithoutFeedback>
    </CardBanner>
  );

  render() {
    return (
      <View style={styles.mainContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={this.keyExtractor}
          data={eventslist}
          renderItem={this.renderCarousel}
        />
      </View>
    );
  }
}

const styles = {
  mainContainer: {
    flex: 1,
  },
  cardContainerStyle: {
    borderRadius: 8,
    overflow: "hidden",
    elevation: 5,
    margin: 0,
    width: tamanho,
  },
  imageBackgroundStyle: {
    width: "100%",
    height: 160,
    resizeMode: "contain",
    justifyContent: "center",
  },
  titleView: {
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
};
