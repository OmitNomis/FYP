import React, { useState, useEffect, useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from "react-native";
// import colors from "../assets/theme/colors";
import CustomButton from "../components/CustomButton";
import RetriveData from "../service/RetriveData";
import api from "../constants/Api";
import DeviceStorage from "../config/DeviceStorage";

import ToastMessage from "../components/Toast";
import request from "../config/RequestManager";
import NoIconText from "../components/NoIconText";
import * as ImagePicker from "expo-image-picker";
import themeContext from "../assets/theme/colorsContext";

const EditProfile = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cityError, setCityError] = useState("");
  const [image, setImage] = useState("");
  const [myInfo, setMyInfo] = useState();
  const [imageUpdated, setImageUpdated] = useState(false);
  useEffect(async () => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    var response = await RetriveData.GetCustomerInfo();
    if (response != undefined) {
      setFirstName(response.FirstName);
      setEmail(response.Email);
      setLastName(response.LastName);
      setPhoneNumber(response.Phone);
      setCity(response.City);
      setMyInfo(response);
      setImage(
        response.ProfileImage ? api.BaseUrl + response.ProfileImage : null
      );
      setIsLoading(false);
    } else {
      ToastMessage.Short("Error Loading Customer ");
      setIsLoading(false);
    }
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
      setLastNameError("Last Name is required");
    } else {
      setLastNameError("");
    }
    if (city.trim() === "") {
      isValid = false;
      setCityError("City is required");
    } else {
      setCityError("");
    }
    if (email.trim() === "") {
      isValid = false;
      setEmailError("Email is required");
    } else {
      if (!validateEmail) {
        isValid = false;
        setEmailError("Please enter valid Email");
      } else {
        setEmailError("");
      }
    }
    return isValid;
  };
  const validatePhoneNumber = (phoneNumber) => {
    var regex = /^\d+$/;
    if (!regex.test(phoneNumber)) {
      phoneNumber = phoneNumber.replace(/\D/g, "");
    }
    return phoneNumber;
  };
  const validateEmail = (email) => {
    const expression =
      /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

    return expression.test(String(email).toLowerCase());
  };
  const uploadImage = async () => {
    if (imageUpdated == true) {
      const formData = new FormData();
      formData.append("image", {
        name:
          image.fileName || image.uri.substr(image.uri.lastIndexOf("/") + 1),
        uri: image.uri,
        type: "image/jpg",
      });

      const config = {
        body: formData,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      };
      var link = api.BaseUrl + "api/upload";

      fetch(link, config)
        .then((res) => res.json())
        .then((data) => {
          post(data.data.split("\\")[1]);
        })
        .catch((err) => {
          console.log("err" + err);
        });
    } else {
      post(image.substr(image.lastIndexOf("/") + 1));
    }
  };

  const post = async (imagePath) => {
    var data = {
      FirstName: firstName,
      LastName: lastName,
      City: city,
      Email: email,
      ProfileImage: imagePath ? imagePath : null,
      UserId: myInfo.UserId,
    };
    var response = await (await request())
      .post(api.UpdateUser, data)
      .catch(function (error) {
        console.log(error);
        ToastMessage.Short("Error Occured, Try again");
      });
    if (response != undefined) {
      if (response.data.success == "1") {
        ToastMessage.Short("Updated succesfully");

        var userInfo = {
          UserId: myInfo.UserId,
          Phone: phoneNumber,
          City: city,
          CountryId: myInfo.CountryId,
          Email: email,
          FirstName: firstName,
          LastName: lastName,
          StartDate: myInfo.StartDate,
          ProfileImage: imagePath ? imagePath : null,
        };
        await DeviceStorage.saveKey("UserInfo", JSON.stringify(userInfo));
        props.navigation.replace("HomeStack");
      }
    } else {
      ToastMessage.Short("Error Occured While Making Post");
      setUuid(Uuid.v4());
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUpdated(true);
      setImage(result);
    }
  };
  const colors = useContext(themeContext);
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 30,
      backgroundColor: colors.Background,
      flex: 1,
    },
    buttonDiv: {
      marginTop: 30,
    },
    imageUpload: {
      height: 150,
      width: 150,
      borderRadius: 100,
      borderWidth: 1,
      borderStyle: "dashed",
      borderColor: colors.Gray,
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 30,
    },
  });
  return (
    <KeyboardAvoidingView behavior="height" style={styles.container}>
      <ScrollView
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 30, flexGrow: 1 }}
      >
        {isLoading == false && (
          <>
            <View style={styles.imageSection}>
              <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
                {!image ? (
                  <Text
                    style={{
                      fontFamily: "Regular",
                      fontSize: 16,
                      color: colors.Gray,
                    }}
                  >
                    Upload Image
                  </Text>
                ) : (
                  <Image
                    style={{
                      height: "100%",
                      width: "100%",
                      borderRadius: 100,
                    }}
                    source={{
                      uri:
                        imageUpdated == true
                          ? image.uri
                          : api.BaseUrl + myInfo.ProfileImage,
                    }}
                  />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.form}>
              <NoIconText
                icon="person-circle-outline"
                label="First Name"
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
              <NoIconText
                icon="location-outline"
                label="Last Name"
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
              <NoIconText
                icon="call-outline"
                label="City"
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
              <NoIconText
                icon="at"
                label="Email Address"
                value={email}
                keyboardType="email-address"
                onChangeText={(text) => setEmail(text)}
                selectTextOnFocus={false}
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

              <NoIconText
                icon="call-outline"
                label="Phone Number"
                keyboardType="numeric"
                value={phoneNumber}
                editable={false}
                onChangeText={(text) =>
                  setPhoneNumber(validatePhoneNumber(text))
                }
              />
            </View>
            <View style={styles.buttonDiv}>
              <CustomButton
                title="Save Profile"
                onPress={() => {
                  if (validateForm()) {
                    uploadImage();
                  }
                }}
              />
            </View>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;
