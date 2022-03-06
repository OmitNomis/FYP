import React, { useContext } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../assets/theme/colors";
const SettingsBtn = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Icon name={props.icon} size={20} style={{ color: colors.Text }} />
          <Text style={[styles.text, { color: colors.Text }]}>
            {props.title}
          </Text>
        </View>
        <View>
          <Icon
            name="chevron-forward"
            size={18}
            style={{ color: "rgba(31, 36, 44, 0.5)" }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SettingsBtn;

const styles = StyleSheet.create({
  container: {
    height: 42,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 30,
  },
  text: {
    fontFamily: "Regular",
    fontSize: 16,
    marginLeft: 20,
  },
});
