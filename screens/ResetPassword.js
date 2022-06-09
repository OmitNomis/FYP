import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native";
// import colors from "../assets/theme/colors";
import CustomButton from "../components/CustomButton";
import TextBox from "../components/TextBox";
import api from "../constants/Api";
import ToastMessage from "../components/Toast";
import request from "../config/RequestManager";
import themeContext from "../assets/theme/colorsContext";
const ResetPassword = (props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const colors = useContext(themeContext);
  const email = props.route.params.params.email;

  useEffect(() => {
    props.navigation.setOptions({
      title: "Reset Password",
    });
  }, []);
  const changePassword = async () => {
    var data = {
      Email: email,
      OldPassword: oldPassword,
      NewPassword: password,
    };

    var response = await (await request())
      .post(api.ResetChangePassword, data)
      .catch(function (error) {
        ToastMessage.Short("Error Occured Contact Support");
      });
    if (response != undefined) {
      if (response.data.success == 0) {
        // ToastMessage.Short(response.data.message);
        setConfirmPasswordError(response.data.message);
      } else {
        ToastMessage.Short("Password Successfully Changed");
        props.navigation.replace("Login");
      }
    }
  };

  const validateForm = () => {
    let isValid = true;
    if (oldPassword.trim() === "") {
      isValid = false;
      setOldPasswordError("Old Password is required");
    } else if (oldPassword.length < 6) {
      isValid = false;
      setOldPasswordError("Must be 6 characters long");
    } else {
      setOldPasswordError("");
    }
    if (password.trim() === "") {
      isValid = false;
      setPasswordError("Username is required");
    } else if (password.length < 6) {
      isValid = false;
      setPasswordError("Must be 6 characters long");
    } else {
      setPasswordError("");
    }
    if (confirmPassword.trim() === "") {
      isValid = false;
      setConfirmPasswordError("Username is required");
    } else if (confirmPassword.length < 6) {
      isValid = false;
      setConfirmPasswordError("Must be 6 characters long");
    } else {
      setConfirmPasswordError("");
    }
    if (!(password === confirmPassword)) {
      setConfirmPasswordError("new password and confirm password must match");
    } else {
      setConfirmPasswordError("");
    }
    return isValid;
  };
  const styles = StyleSheet.create({
    container: {
      paddingTop: StatusBar.currentHeight,
      paddingHorizontal: 30,
      backgroundColor: colors.Background,
    },
    bodyText: {
      fontFamily: "Regular",
      fontSize: 16,
      color: colors.Secondary,
      textAlign: "justify",
      color: colors.Text,
    },
    input: {
      marginTop: 30,
    },
    button: {
      marginTop: 30,
    },
  });
  return (
    <View style={{ flex: 1, backgroundColor: colors.Background }}>
      <ScrollView nestedScrollEnabled>
        <View style={styles.container}>
          <View style={styles.body}>
            <View style={styles.bodyTextContainer}>
              <Text style={styles.bodyText}>
                To reset your Password, please enter the temporary password sent
                to you in your email followed by the new password.
              </Text>
            </View>
            <View style={styles.input}>
              <View>
                <TextBox
                  icon="lock-closed"
                  placeholder="Temporary Password"
                  protected={true}
                  value={oldPassword}
                  onChangeText={(text) => setOldPassword(text)}
                />
                {oldPasswordError.length > 0 && (
                  <Text
                    style={{
                      color: "red",
                      fontFamily: "Regular",
                      fontSize: 14,
                      marginLeft: 30,
                    }}
                  >
                    {oldPasswordError}
                  </Text>
                )}
              </View>
              <View>
                <TextBox
                  icon="lock-closed"
                  placeholder="New Password"
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
              <View>
                <TextBox
                  icon="lock-closed"
                  placeholder="Confirm Password"
                  protected={true}
                  value={confirmPassword}
                  onChangeText={(text) => setConfirmPassword(text)}
                />
                {confirmPasswordError.length > 0 && (
                  <Text
                    style={{
                      color: "red",
                      fontFamily: "Regular",
                      fontSize: 14,
                      marginLeft: 30,
                    }}
                  >
                    {confirmPasswordError}
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.button}>
              <CustomButton
                title="Change Password"
                onPress={() => {
                  if (validateForm()) {
                    changePassword();
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
export default ResetPassword;
