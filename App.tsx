import React, { useState } from "react";
import { StyleSheet, StatusBar, View, ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "react-native-elements";
import useCachedResources from "./hooks/useCachedResources";

import Globais from "./Configs/Globais";
import Inicio from "./Inicio";
const theme = {
  colors: {
    primary: "#ed3237",
    sedondary: "#373435",
  },
};
export default function App() {
  const isLoadingComplete = useCachedResources();
  const [carregando, setCarregando] = useState(false);

  Globais.fontPorks();

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider style={{ backgroundColor: "#ed3237" }}>
        <View style={{ flex: 1, marginTop: 25 }}>
          <Inicio />
        </View>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ECF0F1",
  },
  buttonsContainer: {
    padding: 10,
  },
  textStyle: {
    textAlign: "center",
    marginBottom: 8,
  },
});
