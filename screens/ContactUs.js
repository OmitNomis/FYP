import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import CustomButton from "../components/CustomButton";
import themeContext from "../assets/theme/colorsContext";
// import colors from "../assets/theme/colors";

const About = (props) => {
  const colors = useContext(themeContext);
  useEffect(() => {
    props.navigation.setOptions({
      title: "About Us",
    });
  }, []);
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
    <View style={{ flex: 1, backgroundColor: colors.Background }}>
      <ScrollView
        nestedScrollEnabled
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <View>
          <Text
            style={{ fontFamily: "Regular", fontSize: 16, color: colors.Text }}
          >
            Leave us a Message, we will get back to you as soon as possible.
          </Text>
        </View>
        <View style={styles.form}>
          <TextInput
            placeholderTextColor={colors.LightText}
            style={styles.smallBox}
            placeholder="Your Name"
          />
          <TextInput
            placeholderTextColor={colors.LightText}
            style={styles.smallBox}
            placeholder="Your Email Address"
          />
          <TextInput
            placeholderTextColor={colors.LightText}
            style={styles.bigBox}
            placeholder="What do you want to tell us about?"
            multiline
          />
        </View>
        <View style={{ marginTop: 30, paddingHorizontal: 30 }}>
          <CustomButton title="Send" />
        </View>
      </ScrollView>
    </View>
  );
};

export default About;
