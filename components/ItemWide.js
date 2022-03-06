import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import colors from "../assets/theme/colors";
import Ionicons from "react-native-vector-icons/Ionicons";

const ItemWide = (props) => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.dateHolder}>
        <Text style={styles.date}>Today, 12:58 pm</Text>
      </View>
      <View style={styles.bottom}>
        <View style={styles.imageHolder}></View>
        <View style={styles.itemDetails}>
          <View style={styles.heading}>
            <Ionicons
              name="ios-book"
              size={22}
              style={{ color: colors.Text }}
            />
            <Text style={styles.headingText}>War and peace</Text>
          </View>
          <View style={styles.info}>
            <View style={styles.bottomTextHolder}>
              <Ionicons
                name="person-circle"
                size={20}
                style={styles.iconStyles}
              />
              <Text style={styles.text}>Simon Poudyal</Text>
            </View>
            <View style={styles.bottomTextHolder}>
              <Ionicons name="location" size={20} style={styles.iconStyles} />
              <Text style={styles.text}>Kathmandu</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemWide;

const styles = StyleSheet.create({
  container: {
    borderColor: colors.Gray,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.White,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  dateHolder: {
    marginBottom: 10,
  },
  date: {
    color: colors.LightText,
    fontFamily: "Regular",
    fontSize: 14,
  },
  imageHolder: {
    height: 100,
    width: 130,
    backgroundColor: "red",
    borderRadius: 10,
  },
  bottom: {
    flexDirection: "row",
  },
  itemDetails: {
    marginLeft: 10,
  },
  heading: {
    flexDirection: "row",
  },
  headingText: {
    fontFamily: "Bold",
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 10,
  },
  info: {},
  bottomTextHolder: {
    flexDirection: "row",
  },
  text: {
    fontFamily: "Regular",
    fontSize: 14,
    marginLeft: 10,
    color: colors.LightText,
  },
  iconStyles: {
    color: colors.LightText,
  },
});
