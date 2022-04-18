import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useContext } from "react";
// import colors from "../assets/theme/colors";
import themeContext from "../assets/theme/colorsContext";

const TextBoxOutline = (props) => {
  const colors = useContext(themeContext);
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
  return (
    <View
      style={{
        backgroundColor: colors.Seperator,
        height: 50,
        borderRadius: 8,
        marginVertical: 6,
        width: props.half ? "45%" : "100%",
      }}
    >
      <TextInput
        placeholderTextColor={colors.LightText}
        style={styles.text}
        {...props}
      ></TextInput>
    </View>
  );
};

export default TextBoxOutline;
