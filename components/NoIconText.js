import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../assets/theme/colors";

const NoIconText = (props) => {
  return (
    <View style={{ marginBottom: 15 }}>
      <View>
        <Text style={styles.label}>{props.label}</Text>
      </View>
      <View
        style={{
          width: props.width ? props.width + "%" : "100%",
          height: props.field ? 80 : 40,
          borderWidth: 1,
          borderColor: "rgba(31, 36, 44, 0.1)",
          borderRadius: 10,
          marginTop: 2,
        }}
      >
        <TextInput
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "white",
            padding: 10,
            textAlignVertical: "top",
          }}
          multiline={props.field ? true : false}
          {...props}
        />
      </View>
    </View>
  );
};

export default NoIconText;

const styles = StyleSheet.create({
  label: {
    fontFamily: "Regular",
    fontSize: 14,
    color: colors.Text,
  },
});
