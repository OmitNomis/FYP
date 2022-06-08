import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import TextBox from "../components/TextBox";
import request from "../config/RequestManager";
// import colors from "../assets/theme/colors";
import themeContext from "../assets/theme/colorsContext";
import ToastMessage from "../components/Toast";
import DeviceStorage from "../config/DeviceStorage";
import Api from "../constants/Api";
const Register = (props) => {
  const colors = useContext(themeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [cityError, setCityError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validatePhoneNumber = (phoneNumber) => {
    var regex = /^\d+$/;
    if (!regex.test(phoneNumber)) {
      phoneNumber = phoneNumber.replace(/\D/g, "");
    }
    return phoneNumber;
  };
  const validateForm = () => {
    let isValid = true;
    if (firstName.trim() === "") {
      isValid = false;
      setFirstNameError("First Name is required");
    } else {
      setFirstNameError("");
    }
    if (lastName.trim() === "") {
      isValid = false;
      setLastNameError("First Name is required");
    } else {
      setLastNameError("");
    }

    if (email.trim() === "") {
      isValid = false;
      setEmailError("Email address is required");
    } else {
      setEmailError("");
    }
    if (city.trim() === "") {
      isValid = false;
      setCityError("City is required");
    } else {
      setCityError("");
    }
    if (phoneNumber.trim() === "") {
      isValid = false;
      setPhoneNumberError("PhoneNumber is required");
    } else {
      setPhoneNumberError("");
    }

    if (password === "") {
      isValid = false;
      setPasswordError("Password is required");
    } else {
      if (password.length < 6) {
        isValid = false;
        setPasswordError("Password needs to be atleast 6 characters long");
      } else {
        setPasswordError("");
      }
    }

    if (confirmPassword === "") {
      isValid = false;
      setConfirmPasswordError("Password is required");
    } else {
      if (!(password === confirmPassword)) {
        isValid = false;
        setConfirmPasswordError(
          "Password and Confirm Password needs to be same"
        );
      } else {
        setConfirmPasswordError("");
      }
    }
    return isValid;
  };
  const SignIn = async () => {
    var data = {
      Email: email,
      Password: password,
    };
    var response = await (await request())
      .post(Api.Login, data)
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
    }
  };

  const register = async () => {
    var currentDate = new Date();
    var data = {
      FirstName: firstName,
      LastName: lastName,
      Email: email,
      Password: password,
      Phone: phoneNumber,
      City: city,
      CountryId: 1,
      StartDate: currentDate,
    };
    var response = await (await request())
      .post(Api.Register, data)
      .catch(function (error) {
        console.log(error);
        ToastMessage.Short("Error Occured");
      });
    if (response != undefined) {
      if (response.data.success == 1) {
        ToastMessage.Short("Registration Succesful");
        SignIn();
      } else {
        setConfirmPasswordError(response.data.message);
      }
    } else {
      ToastMessage.Short("Error Occured");
    }
  };
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
        contentContainerStyle={{ flexGrow: 1, paddingVertical: 30 }}
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
              placeholder="First Name"
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
            />
            {firstNameError.length > 0 && (
              <Text
                style={{
                  color: "red",
                  fontFamily: "Regular",
                  fontSize: 14,
                  marginLeft: 30,
                }}
              >
                {firstNameError}
              </Text>
            )}
          </View>
          <View>
            <TextBox
              icon="person-circle"
              placeholder="Last Name"
              value={lastName}
              onChangeText={(text) => setLastName(text)}
            />
            {lastNameError.length > 0 && (
              <Text
                style={{
                  color: "red",
                  fontFamily: "Regular",
                  fontSize: 14,
                  marginLeft: 30,
                }}
              >
                {lastNameError}
              </Text>
            )}
          </View>
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
              icon="call"
              placeholder="Phone Number"
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(validatePhoneNumber(text))}
              keyboardType="numeric"
            />
            {phoneNumberError.length > 0 && (
              <Text
                style={{
                  color: "red",
                  fontFamily: "Regular",
                  fontSize: 14,
                  marginLeft: 30,
                }}
              >
                {phoneNumberError}
              </Text>
            )}
          </View>
          <View>
            <TextBox
              icon="location"
              placeholder="City"
              value={city}
              onChangeText={(text) => setCity(text)}
            />
            {cityError.length > 0 && (
              <Text
                style={{
                  color: "red",
                  fontFamily: "Regular",
                  fontSize: 14,
                  marginLeft: 30,
                }}
              >
                {cityError}
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
          <TouchableOpacity
            onPress={() => {
              if (validateForm()) {
                register();
              }
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
    height: 120,
    width: 190,
    alignSelf: "center",
    marginVertical: 40,
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
