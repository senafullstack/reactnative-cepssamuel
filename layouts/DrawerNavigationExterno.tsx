import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MenuDrawerExterno from "./MenuDrawerExterno";
import TabNavigationExterna from "./TabNavigationExterna";
import PageVerSeries from "../Pagesexternas/PageVerSeries";
import PageVerAgendaDiaria from "../Pagesexternas/PageVerAgendaDiaria";
import PageQuemSomos from "../Pagesexternas/PaginasMenu/PageQuemSomos";
import PageCalendarioAnual from "../Pagesexternas/PaginasMenu/PageCalendarioAnual";
import PageDownloads from "../Pagesexternas/PaginasMenu/PageDownloads";
import PageEstruturaPedagogica from "../Pagesexternas/PaginasMenu/PageEstruturaPedagogica";

const Drawer = createDrawerNavigator();
export default () => {
  return (
    <Drawer.Navigator
      initialRouteName="PageHome"
      drawerContent={(props) => MenuDrawerExterno(props)}
    >
      <Drawer.Screen
        name="PageHome"
        component={TabNavigationExterna}
        options={() => ({
          headerShown: false,
          unmountOnBlur: true,
        })}
      />
      <Drawer.Screen
        name="PageVerseries"
        component={PageVerSeries}
        options={() => ({
          headerShown: false,
          unmountOnBlur: true,
        })}
      />

      <Drawer.Screen
        name="PageVerAgendaDiaria"
        component={PageVerAgendaDiaria}
        options={() => ({
          headerShown: false,
          unmountOnBlur: true,
        })}
      />

      <Drawer.Screen
        name="PageQuemSomos"
        component={PageQuemSomos}
        options={() => ({
          headerShown: false,
          unmountOnBlur: true,
        })}
      />

      <Drawer.Screen
        name="PageCalendarioAnual"
        component={PageCalendarioAnual}
        options={() => ({
          headerShown: false,
          unmountOnBlur: true,
        })}
      />
      <Drawer.Screen
        name="PageDownloads"
        component={PageDownloads}
        options={() => ({
          headerShown: false,
          unmountOnBlur: true,
        })}
      />
      <Drawer.Screen
        name="PageEstruturaPedagogica"
        component={PageEstruturaPedagogica}
        options={() => ({
          headerShown: false,
          unmountOnBlur: true,
        })}
      />
    </Drawer.Navigator>
  );
};
