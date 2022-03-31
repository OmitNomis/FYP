import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import colors from "../assets/theme/colors";

const TextBoxOutline = (props) => {
  return (
    <View
      style={{
        backgroundColor: "#F0F0F0",
        height: 50,
        borderRadius: 8,
        marginVertical: 6,
        width: props.half ? "45%" : "100%",
      }}
    >
      <TextInput style={styles.text} {...props}></TextInput>
    </View>
  );
};

export default TextBoxOutline;

const styles = StyleSheet.create({
  text: {
    height: "100%",
    width: "90%",
    marginLeft: 20,
    color: colors.Text,
    fontFamily: "Regular",
    fontSize: 16,
  },
});
