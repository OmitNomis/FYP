import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import themeContext from "../assets/theme/colorsContext";
import Icon from "react-native-vector-icons/FontAwesome";

const MessageInput = () => {
  const colors = useContext(themeContext);
  return (
    <View
      style={{
        height: 80,
        backgroundColor: colors.Seperator,
        flexDirection: "row",
        borderRadius: 20,
        alignItems: "center",
        marginTop: 20,
      }}
    >
      <View style={{ width: "80%", paddingLeft: 20 }}>
        <TextInput
          placeholder="Enter a Message"
          placeholderTextColor={colors.LightText}
          style={{
            height: 60,
            fontSize: 16,
            fontFamily: "Regular",
            color: colors.Text,
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          width: "20%",
          alignItems: "center",
        }}
      >
        <Icon name={"send"} size={25} style={{ color: colors.Text }} />
      </TouchableOpacity>
    </View>
  );
};

export default MessageInput;
