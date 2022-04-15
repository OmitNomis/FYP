import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ProgressBarAndroidComponent,
} from "react-native";
import themeContext from "../assets/theme/colorsContext";
// import colors from "../assets/theme/colors";

const CustomButton = (props) => {
  const colors = useContext(themeContext);
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[styles.button, { backgroundColor: colors.Primary }]}>
        <Text style={[styles.buttonTitle, { color: "#fff" }]}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default CustomButton;
const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    height: 60,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonTitle: {
    fontFamily: "Regular",
    fontSize: 20,
  },
});
