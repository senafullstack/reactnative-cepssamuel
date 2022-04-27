import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import Globais from "../Configs/Globais";
import { Card } from "react-native-elements";
import { Audio } from "expo-av";
import { Button } from "react-native-elements/dist/buttons/Button";
import { Icon } from "react-native-elements/dist/icons/Icon";
export default function PageMusicas({ navigation }) {
  const [listamusicas, setlistamusicas] = useState(Globais.playlist);
  const [testelist, setTestelist] = useState([]);

  function playSound(url, index) {
    let novo = [];
    setTestelist(novo);
    for (let i = 0; i < Globais.playlist.length; i++) {
      Globais.playlist[i].current = 0;
    }
    Globais.playlist[index].current = 1;
    let lista = Globais.playlist;
    setlistamusicas(lista);
    Globais.playSound(url);
  }
  async function stopSound(url, index) {
    for (let i = 0; i < Globais.playlist.length; i++) {
      Globais.playlist[i].current = 0;
    }
    let novo2 = [];
    setTestelist(novo2);
    setlistamusicas(Globais.playlist);
    console.log(listamusicas);

    Globais.stopSound(url);
  }
  return (
    <View>
      <Card>
        <Card.Title style={{ color: "#43C1C4", fontFamily: "Porkys" }}>
          Nossa Playlist
        </Card.Title>
        <Card.Divider />

        {listamusicas.map((item, index) => (
          <View style={{ flexDirection: "row" }} key={index}>
            <View style={{ flex: 0.8 }}>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 0.2 }}>
                  <Icon name="music" type="font-awesome" />
                </View>
                <View style={{ flex: 0.8 }}>
                  <Text>{item.nome}</Text>
                </View>
              </View>
            </View>
            <View style={{ flex: 0.2 }}>
              {item.current == 1 ? (
                <Button
                  onPress={() => stopSound(item.url_musica, index)}
                  title=""
                  icon={{ name: "stop", type: "font-awesome" }}
                />
              ) : (
                <Button
                  onPress={() => playSound(item.url_musica, index)}
                  title=""
                  icon={{ name: "play", type: "font-awesome" }}
                />
              )}
            </View>
          </View>
        ))}
        <Button
          onPress={() => navigation.navigate("PageInicioApp")}
          title="Voltar"
          icon={{ name: "undo", type: "font-awesome" }}
        />

        {testelist.map((item, index) => (
          <Text key={index}>{item.nome}</Text>
        ))}
      </Card>
    </View>
  );
}
