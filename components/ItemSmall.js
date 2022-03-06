import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../assets/theme/colors";

const ItemSmall = (props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.imageContainer}>
        {/* <Image style={styles.image} /> */}
      </View>
      <View style={styles.details}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {props.item.title}
          </Text>
        </View>
        <View style={styles.authorContainer}>
          <Text style={styles.author}>{props.item.author}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemSmall;

const styles = StyleSheet.create({
  container: {
    width: 130,
    backgroundColor: colors.White,
    marginRight: 15,
    marginVertical: 20,
  },
  imageContainer: {
    height: 150,
    width: 130,
    backgroundColor: "red",
    borderRadius: 12,
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 12,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  title: {
    fontFamily: "Bold",
    fontSize: 14,
    color: colors.Text,
  },
  authorContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  author: {
    fontFamily: "Regular",
    fontSize: 14,
    color: colors.LightText,
  },
});
