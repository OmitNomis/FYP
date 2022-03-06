import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Image,
  Linking,
  NativeModules,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../assets/theme/colors";
import CustomButton from "../components/CustomButton";
const ConfirmationMail = (props) => {
  const openMailApp = () => {
    if (Platform.OS === "android") {
      console.log("clicked");
      //   Linking.openURL("message:");
      //   NativeModules.UIMailLauncher.launchMailApp();
      return;
    }
    Linking.openURL("message:0"); // iOS
    return;
  };
  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("Login");
          }}
        >
          <View style={styles.head}>
            <Icon name="arrow-back" size={30} />
          </View>
        </TouchableOpacity>
        <View style={styles.body}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={require("../assets/images/mail.png")}
            />
          </View>
          <View style={styles.header}>
            <Text style={styles.headerText}>Check your email</Text>
          </View>
          <View style={styles.bodyTextContainer}>
            <Text style={styles.bodyText}>
              We have sent password recovery instructions to your email
            </Text>
          </View>

          <View style={styles.button}>
            <CustomButton
              title="Open email app"
              onPress={() => openMailApp()}
            />
          </View>
          <View
            style={{
              marginTop: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontFamily: "Regular", color: colors.Secondary }}>
              Did not recieve the email? CHeck your spam filter,{" "}
            </Text>
            <TouchableOpacity onPress={() => props.navigation.goBack()}>
              <Text style={{ fontFamily: "Regular", color: colors.Primary }}>
                or try another email address
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default ConfirmationMail;
const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    minHeight: Dimensions.get("screen").height,
    paddingHorizontal: 30,
    backgroundColor: "#fff",
  },
  head: {
    marginTop: 30,
  },
  body: {
    marginTop: 70,
  },
  imageContainer: {
    height: 152,
    width: 152,
    alignSelf: "center",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  header: {
    marginTop: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontFamily: "Regular",
    fontSize: 36,
    fontWeight: "700",
  },
  bodyTextContainer: {
    marginTop: 30,
  },
  bodyText: {
    fontFamily: "Regular",
    fontSize: 18,
    color: colors.Secondary,
    textAlign: "center",
  },
  input: {
    marginTop: 30,
  },
  button: {
    marginTop: 50,
    marginHorizontal: 50,
  },
});
