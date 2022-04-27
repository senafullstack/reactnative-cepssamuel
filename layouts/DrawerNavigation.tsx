import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import MenuDrawer from "./MenuDrawer";
import TabNavigation from "./TabNavigation";

const Drawer = createDrawerNavigator();
export default () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => MenuDrawer(props)}
    >
      <Drawer.Screen
        name="Home"
        component={TabNavigation}
        options={() => ({
          headerShown: false,
        })}
      />
    </Drawer.Navigator>
  );
};
