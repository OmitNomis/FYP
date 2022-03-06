import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../assets/theme/colors";
import CustomButton from "../components/CustomButton";
import TextBox from "../components/TextBox";
const ForgotPassword = (props) => {
  const [email, setEmail] = useState("");
  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.goBack();
            }}
          >
            <View style={styles.head}>
              <Icon name="arrow-back" size={30} />
            </View>
          </TouchableOpacity>
          <View style={styles.body}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Forgot your password?</Text>
            </View>
            <View style={styles.bodyTextContainer}>
              <Text style={styles.bodyText}>
                Enter the email associated with your account and we'll send an
                email with instructions to reset your password.
              </Text>
            </View>
            <View style={styles.input}>
              <TextBox
                icon="at"
                placeholder="Email Address"
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
            </View>
            <View style={styles.button}>
              <CustomButton
                title="Send Recovery Email"
                onPress={() => props.navigation.navigate("ConfirmationMail")}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default ForgotPassword;
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
    marginTop: 30,
  },
  header: {},
  headerText: {
    fontFamily: "Regular",
    fontSize: 24,
    fontWeight: "600",
  },
  bodyTextContainer: {
    marginTop: 30,
  },
  bodyText: {
    fontFamily: "Regular",
    fontSize: 16,
    color: colors.Secondary,
    textAlign: "justify",
  },
  input: {
    marginTop: 30,
  },
  button: {
    marginTop: 30,
  },
});
