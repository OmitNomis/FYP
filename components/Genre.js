import { StyleSheet, Text, View } from "react-native";
import React from "react";
import colors from "../assets/theme/colors";

const Genre = (props) => {
  return (
    <View style={styles.container} key={props.item.genreID}>
      <Text style={styles.text}>{props.item.genreName}</Text>
    </View>
  );
};

export default Genre;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F7E5FA",
    height: 45,
    borderRadius: 9,
    justifyContent: "center",
    paddingHorizontal: 8,
    alignItems: "center",
    minWidth: 100,
    marginRight: 10,
    marginTop: 10,
  },
  text: {
    fontFamily: "Regular",
    fontSize: 16,
    color: colors.Text,
  },
});
