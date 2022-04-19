import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import themeContext from "../assets/theme/colorsContext";
const PersonChat = (props) => {
  const colors = useContext(themeContext);
  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate("ChatMessage")}
      style={{
        backgroundColor: colors.backgroundColor,
        height: 80,
        flexDirection: "row",
        borderBottomColor: colors.Seperator,
        borderBottomWidth: 2,
        alignItems: "center",
        marginTop: 5,
      }}
    >
      <View
        style={{
          width: "20%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            backgroundColor: "red",
          }}
        ></View>
      </View>
      <View style={{ width: "80%" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginLeft: 10,
          }}
        >
          <Text
            style={{
              fontFamily: "Regular",
              fontSize: 16,
              color: colors.Text,
            }}
          >
            Anu Dahal
          </Text>
          <Text
            style={{
              fontFamily: "Regular",
              fontSize: 14,
              color: colors.LightText,
            }}
          >
            time
          </Text>
        </View>
        <View style={{ marginLeft: 10 }}>
          <Text
            style={{
              fontFamily: "Regular",
              fontSize: 14,
              color: colors.LightText,
            }}
            numberOfLines={1}
          >
            Last Message
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PersonChat;
