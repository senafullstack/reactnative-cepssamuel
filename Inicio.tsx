import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DrawerNavigation from "./layouts/DrawerNavigation";
import DrawerNavigationExterno from "./layouts/DrawerNavigationExterno";
import PageLogin from "./Pages/PageLogin";
import PageInicio from "./Pagesexternas/PageInicio";
import TabNavigationExterna from "./layouts/TabNavigationExterna";
import Verinforme from "./Pagesexternas/Verinforme";
import VerGaleria from "./Pagesexternas/VerGaleria";

import PageAlterarsenha from "./Pages/PageAlterarsenha";
import PageMusicas from "./Pagesexternas/PageMusicas";
import PageVerSeries from "./Pagesexternas/PageVerSeries";
const StackInicio = createNativeStackNavigator();

function NavegacaoInicio() {
  React.useEffect(() => {
    console.log("aqui primeiro");
  }, []);

  return (
    <StackInicio.Navigator initialRouteName="PageInicioApp">
      <StackInicio.Screen
        component={DrawerNavigation}
        name="AppInicio"
        options={() => ({ headerShown: false })}
      />
      <StackInicio.Screen
        component={PageLogin}
        name="PageLogin"
        options={() => ({ headerShown: false })}
      />
      <StackInicio.Screen
        component={PageAlterarsenha}
        name="PageAlterarsenha"
        options={() => ({ headerShown: false })}
      />
      <StackInicio.Screen
        component={DrawerNavigationExterno}
        name="PageInicioApp"
        options={() => ({ headerShown: false })}
      />
      <StackInicio.Screen
        component={Verinforme}
        name="PageVerinformeexterno"
        options={() => ({ headerShown: false })}
      />

      <StackInicio.Screen
        component={VerGaleria}
        name="PageVergaleriaexterno"
        options={() => ({ headerShown: false })}
      />

      <StackInicio.Screen
        component={PageMusicas}
        name="PageMusicas"
        options={() => ({ headerShown: false })}
      />
    </StackInicio.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <NavegacaoInicio />
    </NavigationContainer>
  );
}
