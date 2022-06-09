import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import CustomButton from "../components/CustomButton";
import themeContext from "../assets/theme/colorsContext";
import RetriveData from "../service/RetriveData";
import Api from "../constants/Api";
import ToastMessage from "../components/Toast";
import request from "../config/RequestManager";

const About = (props) => {
  const colors = useContext(themeContext);
  useEffect(() => {
    props.navigation.setOptions({
      title: "Contact Us",
    });
    getMyDetails();
  }, []);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const getMyDetails = async () => {
    var response = await RetriveData.GetCustomerInfo();
    setName(response.FirstName + " " + response.LastName);
    setEmail(response.Email);
    setLoading(false);
  };

  const sendFeedback = async () => {
    data = {
      UserName: name,
      UserEmail: email,
      Feedback: message,
    };
    var response = await (await request())
      .post(Api.SendFeedback, data)
      .catch(function (error) {
        ToastMessage.Short("Error Occured, Try Again");
      });

    if (response != undefined) {
      if (response.data.success == 1) {
        ToastMessage.Short("Feedback Successfully Sent");
        props.refreshComments();
      } else {
        ToastMessage.Short(response.data.Message);
      }
    } else {
      ToastMessage.Short("Error Occured");
    }
  };

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 30,
      marginTop: 20,
      backgroundColor: colors.Background,
    },
    text: {
      textAlign: "justify",
      fontFamily: "Regular",
      fontSize: 16,
    },
    form: {
      marginTop: 40,
    },
    smallBox: {
      height: 50,
      backgroundColor: colors.Seperator,
      elevation: 5,
      marginHorizontal: 10,
      borderRadius: 10,
      marginBottom: 20,
      paddingHorizontal: 10,
      fontFamily: "Regular",
      fontSize: 14,
      color: colors.Text,
    },
    bigBox: {
      height: 200,
      backgroundColor: colors.Seperator,
      fontFamily: "Regular",
      fontSize: 14,
      color: colors.Text,
      padding: 10,
      elevation: 5,
      marginHorizontal: 10,
      borderRadius: 10,
      textAlignVertical: "top",
    },
  });
  return (
    loading == false && (
      <View style={{ flex: 1, backgroundColor: colors.Background }}>
        <ScrollView
          nestedScrollEnabled
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          <View>
            <Text
              style={{
                fontFamily: "Regular",
                fontSize: 16,
                color: colors.Text,
              }}
            >
              Leave us a Message, we will get back to you as soon as possible.
            </Text>
          </View>
          <View style={styles.form}>
            <TextInput
              placeholderTextColor={colors.LightText}
              style={styles.smallBox}
              placeholder="Your Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <TextInput
              placeholderTextColor={colors.LightText}
              style={styles.smallBox}
              placeholder="Your Email Address"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              placeholderTextColor={colors.LightText}
              style={styles.bigBox}
              value={message}
              onChangeText={(text) => setMessage(text)}
              placeholder="What do you want to tell us about?"
              multiline
            />
          </View>
          <View style={{ marginTop: 30, paddingHorizontal: 30 }}>
            <CustomButton title="Send" onPress={() => sendFeedback()} />
          </View>
        </ScrollView>
      </View>
    )
  );
};

export default About;
