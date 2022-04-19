import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import themeContext from "../assets/theme/colorsContext";

const Message = (props) => {
  const colors = useContext(themeContext);
  const isOnLeft = (type) => {
    if (props.isLeft && type === "messageContainer") {
      return {
        alignSelf: "flex-start",
        backgroundColor: colors.Seperator,
        borderTopLeftRadius: 0,
      };
    } else if (props.isLeft && type === "message") {
      return {
        color: colors.Text,
      };
    } else if (props.isLeft && type === "time") {
      return {
        color: colors.LightText,
      };
    } else {
      return {
        borderTopRightRadius: 0,
      };
    }
  };
  const messageTime = () => {
    var date = new Date(props.time);
    let time = date.getHours() + ":" + date.getMinutes();
    return time;
  };
  return (
    <View
      style={[
        {
          backgroundColor: colors.Purple,
          maxWidth: "80%",
          alignSelf: "flex-end",
          flexDirection: "row",
          borderRadius: 15,
          paddingHorizontal: 10,
          marginHorizontal: 10,
          paddingTop: 5,
          paddingBottom: 10,
          marginTop: 10,
        },
        isOnLeft("messageContainer"),
      ]}
    >
      <View style={{ backgroundColor: "transparent", maxWidth: "80%" }}>
        <Text
          style={[
            {
              color: colors.Text,
              alignSelf: "flex-start",
              fontSize: 15,
              fontFamily: "Regular",
            },
            isOnLeft("message"),
          ]}
        >
          {props.message}
        </Text>
      </View>
      <View
        style={{
          backgroundColor: "transparent",
          justifyContent: "flex-end",
          paddingLeft: 10,
        }}
      >
        <Text
          style={[
            {
              color: "lightgray",
              alignSelf: "flex-end",
              fontSize: 10,
            },
            isOnLeft("time"),
          ]}
        >
          {messageTime()}
        </Text>
      </View>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({});
