import React, { useEffect, useState } from "react";
import { ScrollView, View, StatusBar, Text, StyleSheet } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Card, Tab, TabView, FAB } from "react-native-elements";

import BannerPrincipal from "./BannerPrincipal";
import Globais from "../Configs/Globais";
import PageBlocoquemsomos from "./PageBlocoquemsomos";
import PageBlocoInformes from "./PageBlocoInformes";
import PageBlocovcsabia from "./PageBlocovcsabia";
import { Audio } from "expo-av";
import MenuHeaderExterno from "../layouts/MenuHeaderExterno";

export default ({ navigation }) => {
  const [index, setIndex] = React.useState(0);

  return (
    <>
      <MenuHeaderExterno navigation={navigation} titulo={"Ceps Samuel"} />
      <ScrollView>
        <Card
          containerStyle={{
            borderRadius: 10,
          }}
        >
          <Card.Image
            style={styles.image}
            source={require("../assets/images/logo.png")}
          />
        </Card>

        <BannerPrincipal />

        <Card>
          <Tab
            value={index}
            onChange={(e) => setIndex(e)}
            indicatorStyle={{
              backgroundColor: "#F38DAD",
              height: 3,
            }}
            variant="primary"
          >
            <Tab.Item
              title="Informes"
              titleStyle={{ fontSize: 12, fontFamily: "Porkys" }}
              icon={{
                name: "newspaper-outline",
                type: "ionicon",
                color: "white",
              }}
            />
            <Tab.Item
              title="Você Sabia?"
              titleStyle={{ fontSize: 12, fontFamily: "Porkys" }}
              icon={{ name: "help-outline", type: "ionicon", color: "white" }}
            />
            <Tab.Item
              title="Quem Somos"
              titleStyle={{ fontSize: 12, fontFamily: "Porkys" }}
              icon={{
                name: "person-circle-outline",
                type: "ionicon",
                color: "white",
              }}
            />
          </Tab>

          <TabView value={index} onChange={setIndex} animationType="spring">
            <TabView.Item style={{ width: "85%" }}>
              <PageBlocoInformes navigation={navigation} />
            </TabView.Item>
            <TabView.Item style={{ width: "85%" }}>
              <PageBlocovcsabia navigation={navigation} />
            </TabView.Item>
            <TabView.Item style={{ width: "85%" }}>
              <PageBlocoquemsomos navigation={navigation} />
            </TabView.Item>
          </TabView>
        </Card>
      </ScrollView>
    </>
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
    fontSize: 35,
  },
  titulo: {
    color: "#43C1C4",
    fontFamily: "Porkys",
    fontSize: 55,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
});
