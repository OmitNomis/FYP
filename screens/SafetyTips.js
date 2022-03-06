import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import colors from "../assets/theme/colors";

const SafetyTips = (props) => {
  useEffect(() => {
    props.navigation.setOptions({
      title: "Safety Tips",
    });
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: colors.Background }}>
      <ScrollView nestedScrollEnabled style={styles.container}>
        <View>
          <Text style={styles.text}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
          <Text style={styles.text}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SafetyTips;

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
});