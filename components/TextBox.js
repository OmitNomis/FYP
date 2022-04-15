import React, { useState, useContext } from "react";
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
// import colors from "../assets/theme/colors";
import themeContext from "../assets/theme/colorsContext";
const TextBox = (props) => {
  const [password, setPassword] = useState(props.protected);
  const colors = useContext(themeContext);
  const styles = StyleSheet.create({
    container: {
      height: 50,
      marginVertical: 5,
      flexDirection: "row",
      alignItems: "center",
    },
    iconStyles: {
      color: colors.Text,
      marginRight: 10,
    },
    right: {
      borderBottomColor: colors.Seperator,
      borderBottomWidth: 1,
      flexDirection: "row",
      width: Dimensions.get("window").width - 90,
      alignItems: "center",
    },
    textBoxStyle: {
      width: "92%",
      fontFamily: "Regular",
      color: colors.Text,
    },
  });
  return (
    <View style={styles.container}>
      <View>
        <Icon name={props.icon} size={20} style={styles.iconStyles} />
      </View>
      <View>
        <View style={styles.right}>
          <TextInput
            placeholderTextColor={colors.LightText}
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
