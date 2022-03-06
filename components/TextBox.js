import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import colors from "../assets/theme/colors";
const TextBox = (props) => {
  const [password, setPassword] = useState(props.protected);

  return (
    <View style={styles.container}>
      <View>
        <Icon name={props.icon} size={20} style={styles.iconStyles} />
      </View>
      <View>
        <View style={styles.right}>
          <TextInput
            style={styles.textBoxStyle}
            placeholder={props.placeholder}
            keyboardType={props.keyboardType}
            secureTextEntry={password}
            {...props}
          />
          {props.protected == true && (
            <TouchableOpacity onPress={() => setPassword(!password)}>
              <View style={{ marginRight: 50 }}>
                {password == false ? (
                  <Icon name="eye" size={20} style={styles.iconStyles} />
                ) : (
                  <Icon name="eye-off" size={20} style={styles.iconStyles} />
                )}
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};
export default TextBox;
const styles = StyleSheet.create({
  container: {
    height: 50,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  iconStyles: {
    color: colors.Secondary,
    marginRight: 10,
  },
  right: {
    borderBottomColor: "rgba(31, 36, 44, 0.25)",
    borderBottomWidth: 1,
    flexDirection: "row",
    width: Dimensions.get("window").width - 90,
    alignItems: "center",
  },
  textBoxStyle: {
    width: "92%",
    fontFamily: "Regular",
    color: "#000",
  },
});
