import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TextInput,
  Button,
} from "react-native";
import TextBox from "../components/TextBox";
// import colors from "../assets/theme/colors";
import themeContext from "../assets/theme/colorsContext";
const Register = (props) => {
  const colors = useContext(themeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={{
        flex: 1,
        backgroundColor: colors.Background,
        paddingHorizontal: 30,
      }}
    >
      <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: colors.Background }}
      >
        <View style={styles.head}>
          <View style={styles.logoHolder}>
            <Image
              style={styles.logo}
              source={require("../assets/images/logo.png")}
            />
          </View>
        </View>
        <View style={styles.heading}>
          <Text
            style={{
              fontFamily: "Bold",
              fontSize: 36,
              marginBottom: 20,
              color: colors.Text,
            }}
          >
            Register
          </Text>
        </View>
        <View style={styles.body}>
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
          <TouchableOpacity
            onPress={() => {
              // props.navigation.navigate("OTP");
            }}
          >
            <View
              style={{
                backgroundColor: colors.Seperator,
                height: 60,
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                marginTop: 20,
                marginBottom: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: "Regular",
                  fontSize: 20,
                  color: colors.Text,
                }}
              >
                Register
              </Text>
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default Register;

const styles = StyleSheet.create({
  head: {
    justifyContent: "flex-end",
  },
  body: {},
  logoHolder: {
    height: 145,
    width: 190,
    marginVertical: 80,
  },
  logo: {
    height: "100%",
    width: "100%",
  },
  headingText: {
    fontFamily: "Bold",
    fontSize: 36,
  },
});
