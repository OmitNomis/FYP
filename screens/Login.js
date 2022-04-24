import React, { useState, useEffect, useContext } from "react";
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
  BackHandler,
  Alert,
} from "react-native";
import TextBox from "../components/TextBox";
import CustomButton from "../components/CustomButton";
import request from "../config/RequestManager";
import api from "../constants/Api";
import DeviceStorage from "../config/DeviceStorage";
import ToastMessage from "../components/Toast";
import Icon from "react-native-vector-icons/Ionicons";

import themeContext from "../assets/theme/colorsContext";
// import colors from "../assets/theme/colors";

const Login = (props) => {
  const [email, setEmail] = useState("simon98190@gmail.com");
  const [password, setPassword] = useState("hehe");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const colors = useContext(themeContext);
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
        var info = response.data.userData[0];
        var userInfo = {
          UserId: info.userID,
          Phone: info.phone,
          City: info.city,
          CountryId: info.countryId,
          Email: info.email,
          FirstName: info.firstName,
          LastName: info.lastName,
          StartDate: info.startDate,
          ProfileImage: info.profileImage,
        };
        await DeviceStorage.saveKey("UserInfo", JSON.stringify(userInfo));
        await DeviceStorage.saveKey("token", response.data.token);
        await DeviceStorage.saveKey("isLoggedIn", "true");
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
  const container = {
    paddingTop: StatusBar.currentHeight,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    minHeight: Dimensions.get("screen").height,
    paddingBottom: 20,
    backgroundColor: colors.Background,
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "Hold on!",
        "Are you sure you want to quit the Application?",
        [
          {
            text: "Go Back",
            onPress: () => null,
            style: "cancel",
          },
          { text: "YES", onPress: () => BackHandler.exitApp() },
        ]
      );
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);
  return (
    <KeyboardAvoidingView
      behavior="height"
      style={{ flex: 1, backgroundColor: colors.Background }}
    >
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
        <View style={container}>
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
              Login
            </Text>
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
                  if (validateForm()) {
                    SignIn();
                  }
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
    </KeyboardAvoidingView>
  );
};
export default Login;

const styles = StyleSheet.create({
  head: {
    justifyContent: "flex-end",
    paddingBottom: 25,
  },
  logoHolder: {
    marginVertical: 80,
    height: 145,
    width: 190,
  },
  logo: {
    height: "100%",
    width: "100%",
  },
  forgotPasswordHolder: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 10,
  },
  forgotPassword: {
    marginBottom: 20,
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
});
