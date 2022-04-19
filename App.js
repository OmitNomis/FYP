import React, { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Dimensions,
  LogBox,
} from "react-native";
import * as Font from "expo-font";
import Screens from "./navigation/Screens";
import { NavigationContainer } from "@react-navigation/native";
import colors from "./assets/theme/colors";
import { EventRegister } from "react-native-event-listeners";
import themeContext from "./assets/theme/colorsContext";
import DeviceStorage from "./config/DeviceStorage";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [darkTheme, setDarkTheme] = useState(false);
  useEffect(async () => {
    LogBox.ignoreAllLogs();
    var initialTheme = await DeviceStorage.getKey("DarkMode");
    setDarkTheme(initialTheme);
    loadFonts();

    let eventListener = EventRegister.addEventListener(
      "darkTheme",
      async (data) => {
        var theme = await DeviceStorage.getKey("DarkMode");
        setDarkTheme(theme);
      }
    );
    return () => {
      EventRegister.removeEventListener(eventListener);
    };
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
      <themeContext.Provider
        value={darkTheme === "true" ? colors.dark : colors.light}
      >
        <NavigationContainer>
          <SafeAreaView style={styles.container}>
            <StatusBar
              animated={true}
              barStyle={darkTheme === "true" ? "light-content" : "dark-content"}
              translucent
              backgroundColor={"transparent"}
            />
            <Screens />
          </SafeAreaView>
        </NavigationContainer>
      </themeContext.Provider>
    )
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("screen").height,
  },
});
