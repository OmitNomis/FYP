import React, { useContext } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import themeContext from "../assets/theme/colorsContext";

const NoIconText = (props) => {
  const colors = useContext(themeContext);
  return (
    <View style={{ marginBottom: 15 }}>
      <View>
        <Text
          style={{
            fontFamily: "Regular",
            fontSize: 14,
            color: colors.Text,
          }}
        >
          {props.label}
        </Text>
      </View>
      <View
        style={{
          width: props.width ? props.width + "%" : "100%",
          height: props.field ? 80 : 40,
          marginTop: 2,
        }}
      >
        <TextInput
          placeholderTextColor={colors.LightText}
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: colors.Seperator,
            padding: 10,
            borderRadius: 10,
            textAlignVertical: "top",
            color: colors.Text,
          }}
          multiline={props.field ? true : false}
          {...props}
        />
      </View>
    </View>
  );
};

export default NoIconText;
