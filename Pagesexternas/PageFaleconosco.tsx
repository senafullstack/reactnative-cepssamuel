import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Card, Button } from "react-native-elements";
import { MaskedTextInput } from "react-native-mask-text";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";
import Globais from "../Configs/Globais";
import { color } from "react-native-reanimated";
import MenuHeaderExterno from "../layouts/MenuHeaderExterno";

export default ({ navigation, titulo }) => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [fone, setFone] = useState("");

  const [temerro, settemErro] = useState(false);
  const [mensagem, setMensagem] = useState("");

  var dadosFormdata = new FormData();
  dadosFormdata.append("nome", nome);
  dadosFormdata.append("email", email);
  dadosFormdata.append("fone", fone);
  dadosFormdata.append("mensagem", mensagem);
  console.log(dadosFormdata);
  var requestPost = {
    method: "POST",
    body: dadosFormdata,
  };

  function enviarmensagem() {
    var url = Globais.url + "contato";
    let urlwhatsapp =
      "https://api.whatsapp.com/send/?phone=" +
      Globais.phoneNumerWhatsapp +
      "&text=" +
      mensagem;
    Linking.openURL(urlwhatsapp)
      .then((data) => {
        console.log(data + "aberto");
      })
      .catch(() => {
        console.log("erro");
      });
    fetch(url, requestPost)
      .then((resp) => resp.json())
      .then((json) => {
        console.log(json);
        let dadosretorno = json.data.data;
        console.log(dadosretorno);

        if (dadosretorno.error == "Unauthorized") {
          settemErro(true);
          console.log(requestPost);
          // setNensagem(dadosretorno.info);
        } else {
          Alert.alert("Sua mensagem foi enviada com sucesso!");
        }
      })
      .catch((e) => {
        Alert.alert("Ocorreu um erro no envio");
      })
      .finally(() => {
        navigation.navigate("PageInicioApp");
      });
  }

  return (
    <>
      <MenuHeaderExterno
        navigation={navigation}
        titulo={"Entre em contato conosco"}
      />
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
            <Input
              onChangeText={(texto) => {
                setNome(texto);
              }}
              style={{ color: "#F38DAD" }}
              value={nome}
              placeholder="Nome"
              placeholderTextColor="#F38DAD"
              leftIcon={{
                type: "font-awesome",
                name: "user",
                color: "#F38DAD",
              }}
            />
            <Input
              onChangeText={(texto) => {
                setEmail(texto);
              }}
              style={{ color: "#F38DAD" }}
              value={email}
              placeholder="Email"
              placeholderTextColor="#F38DAD"
              leftIcon={{
                type: "font-awesome",
                name: "envelope",
                color: "#F38DAD",
              }}
            />

            <MaskedTextInput
              mask="(79)99999-9999"
              onChangeText={(texto) => {
                setFone(texto);
              }}
              style={styles.input}
              placeholder="Whatsapp/Telefone para contato"
              keyboardType="numeric"
              placeholderTextColor="#fff"
              value={fone}
            />
            <Input
              onChangeText={(texto) => {
                setMensagem(texto);
              }}
              multiline
              style={styles.inputtextarea}
              value={mensagem}
              placeholder="Envie sua mensagem"
              placeholderTextColor="#F38DAD"
              editable
              numberOfLines={5}
            />
            <Button
              buttonStyle={{ backgroundColor: "#5BA3D9" }}
              onPress={() => enviarmensagem()}
              icon={<Icon name="arrow-right" size={18} color="white" />}
              title="Enviar Mensagem"
            />
            {temerro ? (
              <View
                style={{
                  width: "100%",
                  height: 15,
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "red",
                  }}
                >
                  {mensagem}
                </Text>
              </View>
            ) : (
              <View></View>
            )}
          </Card>
        </View>
      </ScrollView>
    </>
  );
};

const estilos = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  input: {
    height: 40,
    margin: 12,
    fontSize: 18,
    color: "#fff",
    backgroundColor: "#F38DAD",
    borderWidth: 2,
    borderColor: "#F38DAD",
  },
  inputtextarea: {
    color: "#fff",
    backgroundColor: "#F38DAD",
    borderWidth: 2,
    borderColor: "#F38DAD",
    fontSize: 18,
  },
});
