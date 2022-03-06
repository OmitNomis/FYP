import React, { useEffect, useState, useContext } from "react";
import { SafeAreaView, StyleSheet, StatusBar, Dimensions } from "react-native";
import * as Font from "expo-font";
import Screens from "./navigation/Screens";
import { NavigationContainer } from "@react-navigation/native";
import colors from "./assets/theme/colors";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "./assets/theme/colorsContext";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [darkTheme, setDarkTheme] = useState(false);
  useEffect(() => {
    loadFonts();

    // let eventListener = EventRegister.addEventListener("darkTheme", (data) => {
    //   setDarkTheme(data);
    // });
    // return () => {
    //   EventRegister.removeEventListener(eventListener);
    // };
  }, []);
  const loadFonts = async () => {
    let customFonts = {
      Regular: require("./assets/fonts/ReadexProMedium.ttf"),
      Light: require("./assets/fonts/ReadexProLight.ttf"),
      Bold: require("./assets/fonts/ReadexProBold.ttf"),
    };
    await Font.loadAsync(customFonts);
    setLoading(false);
  };
  return (
    loading == false && (
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <StatusBar
            animated={true}
            barStyle={"dark-content"}
            translucent
            backgroundColor={"transparent"}
          />
          <Screens />
        </SafeAreaView>
      </NavigationContainer>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height,
  },
});
