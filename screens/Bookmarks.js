import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../assets/theme/colors";

const Bookmarks = (props) => {
  useEffect(() => {
    props.navigation.setOptions({
      title: "Bookmarks",
    });
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.Background,
        paddingHorizontal: 30,
      }}
    >
      <View
        style={[styles.searchSection, { backgroundColor: colors.Background }]}
      >
        <View style={[styles.searchBar, { backgroundColor: colors.White }]}>
          <Ionicons name="search" size={25} />
          <TextInput
            placeholder="Search..."
            style={{
              color: colors.Text,
              width: "80%",
              fontFamily: "Regular",
              fontSize: 16,
              marginLeft: 10,
            }}
          />
        </View>
      </View>
      <ScrollView nestedScrollEnabled>{/* chat components */}</ScrollView>
    </View>
  );
};

export default Bookmarks;

const styles = StyleSheet.create({
  searchSection: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBar: {
    height: 45,
    marginHorizontal: 5,
    elevation: 5,
    width: "100%",
    borderRadius: 9,
    alignItems: "center",
    paddingLeft: 15,
    flexDirection: "row",
  },
});
