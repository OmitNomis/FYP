import React, { useState, useContext } from "react";
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
// import colors from "../assets/theme/colors";
import themeContext from "../assets/theme/colorsContext";
import CustomButton from "../components/CustomButton";
import TextBox from "../components/TextBox";
import Api from "../constants/Api";
import request from "../config/RequestManager";
import ToastMessage from "../components/Toast";

const ForgotPassword = (props) => {
  const colors = useContext(themeContext);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const styles = StyleSheet.create({
    container: {
      paddingTop: StatusBar.currentHeight,
      minHeight: Dimensions.get("screen").height,
      paddingHorizontal: 30,
      backgroundColor: colors.Background,
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
      color: colors.Text,
    },
    bodyTextContainer: {
      marginTop: 30,
    },
    bodyText: {
      fontFamily: "Regular",
      fontSize: 16,
      color: colors.LightText,
      textAlign: "justify",
    },
    input: {
      marginTop: 30,
    },
    button: {
      marginTop: 30,
    },
  });

  const validateForm = () => {
    var isValid = true;
    if (email.trim() === "") {
      isValid = false;
      setEmailError("Email address is required");
    } else {
      setEmailError("");
    }

    return isValid;
  };

  const resetPassword = async () => {
    var data = {
      Email: email,
    };
    var response = await (await request())
      .post(Api.ResetPassword, data)
      .catch(function (error) {
        console.log(error);
        ToastMessage.Short("Error Occured, Try Again");
      });

    if (response != undefined) {
      if (response.data.success == 1) {
        ToastMessage.Short("Password Successfully Reset");
        props.navigation.replace("ResetPassword", { params: { email } });
      } else {
        setEmailError(response.data.data);
      }
    } else {
      ToastMessage.Short("Error Occured");
    }
  };
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
              <Icon
                name="arrow-back"
                size={30}
                style={{ color: colors.Text }}
              />
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
            <View style={styles.button}>
              <CustomButton
                title="Send Recovery Email"
                onPress={() => {
                  if (validateForm()) {
                    resetPassword();
                  }
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default ForgotPassword;
