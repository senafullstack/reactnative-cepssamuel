import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icone from "../Configs/Icone";

import PageInicio from "../Pagesexternas/PageInicio";
import PageGaleria from "../Pagesexternas/PageGaleria";
import PageAgendaDiaria from "../Pagesexternas/PageAgendaDiaria";
import PageFaleconosco from "../Pagesexternas/PageFaleconosco";
import PageInformes from "../Pagesexternas/PageInformes";
import PageLogin from "../Pages/PageLogin";

const Tab = createBottomTabNavigator();
export default () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icone;

          if (route.name === "TabHomeexterna") {
            icone = focused ? (
              <Icone estilo={{}} color={"#ed3237"} name="home" />
            ) : (
              <Icone estilo={{}} color={"#373435"} name="home" />
            );
          } else if (route.name === "TabAgendaDiaria") {
            icone = focused ? (
              <Icone estilo={{}} color={"#ed3237"} name="calendar" />
            ) : (
              <Icone estilo={{}} color={"#373435"} name="calendar" />
            );
          } else if (route.name === "TabGaleria") {
            icone = focused ? (
              <Icone estilo={{}} color={"#ed3237"} name="photo" />
            ) : (
              <Icone estilo={{}} color={"#373435"} name="photo" />
            );
          } else if (route.name === "TabFaleconosco") {
            icone = focused ? (
              <Icone estilo={{}} color={"#ed3237"} name="envelope" />
            ) : (
              <Icone estilo={{}} color={"#373435"} name="envelope-square" />
            );
          } else if (route.name === "TabLogin") {
            icone = focused ? (
              <Icone estilo={{}} color={"#ed3237"} name="unlock" />
            ) : (
              <Icone estilo={{}} color={"#373435"} name="lock" />
            );
          }
          // You can return any component that you like here!
          return icone;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "black",
        tabBarItemStyle: {},
      })}
    >
      <Tab.Screen
        name="TabHomeexterna"
        component={PageInicio}
        options={() => ({
          title: "Notícias",
          headerShown: false,
          unmountOnBlur: true,
        })}
      />
      <Tab.Screen
        name="TabAgendaDiaria"
        component={PageAgendaDiaria}
        options={() => ({
          title: "Agenda Diária",
          headerShown: false,
          unmountOnBlur: true,
        })}
      />
      <Tab.Screen
        name="TabGaleria"
        component={PageGaleria}
        options={() => ({
          title: "Galeria",
          headerShown: false,
          unmountOnBlur: true,
        })}
      />
      <Tab.Screen
        name="TabLogin"
        component={PageLogin}
        options={() => ({
          title: "Boletim",
          headerShown: false,
          unmountOnBlur: true,
        })}
      />
      <Tab.Screen
        name="TabFaleconosco"
        component={PageFaleconosco}
        options={() => ({
          title: "Fale conosco",
          headerShown: false,
          unmountOnBlur: true,
        })}
      />
    </Tab.Navigator>
  );
};
