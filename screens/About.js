import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect, useContext } from "react";
// import colors from "../assets/theme/colors";
import themeContext from "../assets/theme/colorsContext";

const About = (props) => {
  const colors = useContext(themeContext);
  useEffect(() => {
    props.navigation.setOptions({
      title: "About Us",
    });
  }, []);
  const text = {
    textAlign: "justify",
    fontFamily: "Regular",
    fontSize: 14,
    color: colors.Text,
    marginBottom: 10,
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.Background }}>
      <ScrollView
        nestedScrollEnabled
        contentContainerStyle={{
          paddingHorizontal: 30,
          marginTop: 20,
          backgroundColor: colors.Background,
          flexGrow: 1,
        }}
      >
        <View>
          <Text
            style={{
              textAlign: "justify",
              fontFamily: "Regular",
              fontSize: 16,
              color: colors.Text,
              marginBottom: 10,
            }}
          >
            Application Name: Pick a Book
          </Text>
          <Text
            style={{
              textAlign: "justify",
              fontFamily: "Regular",
              fontSize: 16,
              color: colors.Text,
              marginBottom: 10,
            }}
          >
            Version: 1.0
          </Text>
          <Text
            style={{
              textAlign: "justify",
              fontFamily: "Regular",
              fontSize: 16,
              color: colors.Text,
              marginBottom: 10,
            }}
          >
            About Application:
          </Text>
          <Text
            style={{
              textAlign: "justify",
              fontFamily: "Regular",
              fontSize: 16,
              color: colors.Text,
              marginBottom: 10,
            }}
          >
            Pick A Book provides an online platform which helps buyers {"&"}{" "}
            sellers to meet with each other. This application is developed
            solely for the purpose of buying and selling second-hand or used
            books, as new Books can get very expensive, this application hopes
            to solve that problem by introducing features such as selling and
            buying books as well as trading used books with others.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default About;
