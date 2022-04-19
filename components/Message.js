import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Message = (props) => {
  const isOnLeft = (type) => {
    if (props.isLeft && type === "messageContainer") {
      return {
        alignSelf: "flex-start",
        backgroundColor: "#f0f0f0",
        borderTopLeftRadius: 0,
      };
    } else if (props.isLeft && type === "message") {
      return {
        color: "#000",
      };
    } else if (props.isLeft && type === "time") {
      return {
        color: "darkGrey",
      };
    } else {
      return {
        borderTopRightRadius: 0,
      };
    }
  };
  return (
    <View
      style={[
        {
          backgroundColor: "red",
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
            { color: "white", alignSelf: "flex-start", fontSize: 15 },
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
          {props.time}
        </Text>
      </View>
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({});
