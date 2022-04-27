import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Icone from "../Configs/Icone";
import PageAgendaDiaria from "../Pages/PageAgendaDiaria";
import PageFrequencia from "../Pages/PageFrequencia";
import PageAviso from "../Pages/PageAviso";
import PageApostila from "../Pages/PageApostila";

import PageBoletim from "../Pages/PageBoletim";

const Tab = createBottomTabNavigator();
export default () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icone;

          if (route.name === "TabBoletim") {
            icone = focused ? (
              <Icone estilo={{}} color={"#ed3237"} name="clipboard" />
            ) : (
              <Icone estilo={{}} color={"#373435 "} name="clipboard" />
            );
          } else if (route.name === "TabAgendaDiaria") {
            icone = focused ? (
              <Icone estilo={{}} color={"#ed3237"} name="calendar" />
            ) : (
              <Icone estilo={{}} color={"#373435"} name="calendar" />
            );
          } else if (route.name === "TabFrequencia") {
            icone = focused ? (
              <Icone estilo={{}} color={"#ed3237"} name="check" />
            ) : (
              <Icone estilo={{}} color={"#373435"} name="check" />
            );
          } else if (route.name === "TabAviso") {
            icone = focused ? (
              <Icone estilo={{}} color={"#ed3237"} name="comments" />
            ) : (
              <Icone estilo={{}} color={"#373435"} name="comments" />
            );
          } else if (route.name === "TabApostila") {
            icone = focused ? (
              <Icone estilo={{}} color={"#ed3237"} name="file" />
            ) : (
              <Icone estilo={{}} color={"#373435"} name="file" />
            );
          }

          // You can return any component that you like here!
          return icone;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="TabBoletim"
        component={PageBoletim}
        options={() => ({ title: "Boletim", headerShown: false })}
      />
      <Tab.Screen
        name="TabAgendaDiaria"
        component={PageAgendaDiaria}
        options={() => ({ title: "Agenda Diária", headerShown: false })}
      />
      <Tab.Screen
        name="TabFrequencia"
        component={PageFrequencia}
        options={() => ({ title: "Frequência", headerShown: false })}
      />
      <Tab.Screen
        name="TabAviso"
        component={PageAviso}
        options={() => ({ title: "Avisos", headerShown: false })}
      />
      <Tab.Screen
        name="TabApostila"
        component={PageApostila}
        options={() => ({ title: "Apostilas", headerShown: false })}
      />
    </Tab.Navigator>
  );
};
