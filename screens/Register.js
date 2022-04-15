import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import TextBox from "../components/TextBox";
import colors from "../assets/theme/colors";
const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");

  return (
    <View style={{ flex: 1 }}>
      <ScrollView nestedScrollEnabled>
        <View style={styles.container}>
          <View style={styles.head}>
            <View style={styles.logoHolder}>
              <Image
                style={styles.logo}
                source={require("../assets/images/logo.png")}
              />
            </View>
          </View>
          <View style={styles.heading}>
            <Text style={styles.headingText}>Register</Text>
          </View>
          <View style={styles.body}>
            <KeyboardAvoidingView>
              <View>
                <TextBox
                  icon="person-circle"
                  placeholder="Full Name"
                  value={fullName}
                  onChangeText={(text) => setFullName(text)}
                />
              </View>
              <View>
                <TextBox
                  icon="mail"
                  placeholder="Email Address"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </View>
              <View>
                <TextBox
                  icon="call"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChangeText={(text) => setPhoneNumber(text)}
                  keyboardType="numeric"
                />
              </View>
              <View>
                <TextBox
                  icon="lock-closed"
                  placeholder="Password"
                  protected={true}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
              </View>
              <View>
                <TextBox
                  icon="lock-closed"
                  placeholder="Confirm Password"
                  protected={true}
                  value={confirmPassword}
                  onChangeText={(text) => setConfirmPassword(text)}
                />
              </View>
            </KeyboardAvoidingView>
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate("OTP");
              }}
            >
              <View style={styles.button}>
                <Text style={styles.buttonTitle}>Register</Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                justifyContent: "center",
              }}
            >
              <Text style={{ fontFamily: "Regular", color: colors.Secondary }}>
                Already have an account?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Login")}
              >
                <Text style={{ fontFamily: "Regular", color: colors.Primary }}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default Register;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 30,
    minHeight: Dimensions.get("screen").height,
  },
  head: {
    flex: 0.5,
    justifyContent: "flex-end",
    paddingBottom: 25,
  },
  body: {
    flex: 0.5,
  },
  logoHolder: {
    height: 145,
    width: 190,
  },
  logo: {
    height: "100%",
    width: "100%",
  },
  headingText: {
    fontFamily: "Bold",
    fontSize: 36,
    marginBottom: 20,
  },

  dividerText: {
    width: 50,
    textAlign: "center",
    fontFamily: "Regular",
    color: colors.Secondary,
    marginVertical: 30,
  },
  button: {
    backgroundColor: "#F1F5F6",
    height: 60,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTitle: {
    fontFamily: "Regular",
    fontSize: 20,
    color: "#000",
  },
});
