import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
// import colors from "../assets/theme/colors";
import themeContext from "../assets/theme/colorsContext";

const Genre = (props) => {
  const colors = useContext(themeContext);
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.LightPurple,
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
  return (
    <TouchableOpacity
      style={styles.container}
      key={props.item.genreID}
      onPress={() =>
        props.navigation.navigate("GenreScreen", {
          params: { genre: props.item },
        })
      }
    >
      <Text style={styles.text}>{props.item.genreName}</Text>
    </TouchableOpacity>
  );
};

export default Genre;
