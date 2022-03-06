import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import colors from "../assets/theme/colors";
// import qs from "qs";
import CustomButton from "../components/CustomButton";
import TextBox from "../components/TextBox";
// import request from "../config/RequestManager";
import api from "../constants/Api";
import ToastMessage from "../components/Toast";
const ChangePassword = (props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");

  useEffect(() => {
    props.navigation.setOptions({
      title: "Change Password",
    });
  }, []);

  const changePassword = async () => {
    var data = qs.stringify({
      OldPassword: oldPassword,
      NewPassword: password,
    });

    var response = await (await request())
      .post(api.ChangePassword, data)
      .catch(function (error) {
        ToastMessage.Short("Error Occured Contact Support");
      });
    if (response != undefined) {
      if (response.data.Code == 200) {
        ToastMessage.Short(response.data.Message);
      } else {
        ToastMessage.Short(response.data.Message);
      }
    } else {
      ToastMessage.Short("Error Occured");
      setIsLoading(false);
    }
    setIsLoading(false);
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

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView nestedScrollEnabled>
        <View style={styles.container}>
          <View style={styles.body}>
            <View style={styles.bodyTextContainer}>
              <Text style={styles.bodyText}>
                To change your Password, please enter your old password followed
                by the new password.
              </Text>
            </View>
            <View style={styles.input}>
              <View>
                <TextBox
                  icon="lock-closed"
                  placeholder="Old Password"
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
                    // changePassword();
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
export default ChangePassword;
const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 30,
    backgroundColor: "#fff",
  },

  headerText: {
    fontFamily: "Regular",
    fontSize: 24,
    fontWeight: "600",
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
