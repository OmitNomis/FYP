import React, { useState, useContext } from "react";
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
import CustomButton from "../components/CustomButton";
import qs from "qs";
import request from "../config/RequestManager";
import api from "../constants/Api";
import DeviceStorage from "../config/DeviceStorage";
import ToastMessage from "../components/Toast";
import Icon from "react-native-vector-icons/Ionicons";

// import themeContext from "../assets/theme/colorsContext";
import colors from "../assets/theme/colors";

const Login = (props) => {
  const [email, setEmail] = useState("simon98190@gmail.com");
  const [password, setPassword] = useState("hehe");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const validateForm = () => {
    let isValid = true;
    if (email.trim() === "") {
      isValid = false;
      setEmailError("Username is required");
    } else {
      setEmailError("");
    }
    if (password.trim() === "") {
      isValid = false;
      setPasswordError("Password is required!");
    } else {
      setPasswordError("");
    }
    return isValid;
  };
  const SignIn = async () => {
    setIsLoading(true);
    var data = {
      Email: email,
      Password: password,
    };
    var response = await (await request())
      .post(api.Login, data)
      .catch(function (error) {
        ToastMessage.Short("Error Occured Contact Support");
      });
    if (response != undefined) {
      if (response.data.success == 1) {
        var userInfo = {
          UserId: response.data.userData.userID,
          Phone: response.data.userData.phone,
          City: response.data.userData.city,
          CountryId: response.data.userData.countryId,
          Email: response.data.userData.email,
          FirstName: response.data.userData.firstName,
          LastName: response.data.userData.lastName,
        };
        await DeviceStorage.saveKey("UserInfo", JSON.stringify(userInfo));
        await DeviceStorage.saveKey("token", response.data.token);
        props.navigation.replace("HomeStack");
      } else {
        ToastMessage.Short(response.data.data);
      }
    } else {
      ToastMessage.Short("Error Occured");
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        nestedScrollEnabled
        // contentContainerStyle={{ paddingBottom: 30 }}
      >
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
            <Text style={styles.headingText}>Login</Text>
          </View>
          <View style={styles.body}>
            <KeyboardAvoidingView>
              <View>
                <TextBox
                  icon="mail"
                  placeholder="Email Address"
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
                {emailError.length > 0 && (
                  <Text
                    style={{
                      color: "red",
                      fontFamily: "Regular",
                      fontSize: 14,
                      marginLeft: 30,
                    }}
                  >
                    {emailError}
                  </Text>
                )}
              </View>
              <View>
                <TextBox
                  icon="lock-closed"
                  placeholder="Password"
                  protected={true}
                  value={password}
                  onChangeText={(text) => setPassword(text)}
                />
                {passwordError.length > 0 && (
                  <Text
                    style={{
                      color: "red",
                      fontFamily: "Regular",
                      fontSize: 14,
                      marginLeft: 30,
                    }}
                  >
                    {passwordError}
                  </Text>
                )}
              </View>
              <View style={styles.forgotPasswordHolder}>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate("ForgotPassword");
                  }}
                >
                  <Text
                    style={[styles.forgotPassword, { color: colors.Primary }]}
                  >
                    Forgot Password
                  </Text>
                </TouchableOpacity>
              </View>
              <CustomButton
                title="Login"
                onPress={() => {
                  props.navigation.replace("HomeStack");
                  // if (validateForm()) {
                  //   SignIn();
                  // }
                }}
              />
            </KeyboardAvoidingView>
            <View
              style={{
                flexDirection: "row",
                marginTop: 20,
                justifyContent: "center",
              }}
            >
              <Text style={{ fontFamily: "Regular", color: colors.Secondary }}>
                New to Pick-a-book?{" "}
              </Text>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Register")}
              >
                <Text style={{ fontFamily: "Regular", color: colors.Primary }}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    minHeight: Dimensions.get("screen").height,
    paddingBottom: 20,
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
  forgotPasswordHolder: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 10,
  },
  forgotPassword: {
    marginBottom: 20,
  },
  lineStyle: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  dividerText: {
    width: 50,
    textAlign: "center",
    fontFamily: "Regular",
    marginVertical: 30,
  },
  button: {
    backgroundColor: "#F1F5F6",
    height: 60,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginBottom: 20,
  },
  buttonTitle: {
    fontFamily: "Regular",
    fontSize: 20,
    color: "#000",
  },
});
