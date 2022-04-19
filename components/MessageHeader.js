import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useContext } from "react";
import themeContext from "../assets/theme/colorsContext";
import Ionicons from "react-native-vector-icons/Ionicons";
import Api from "../constants/Api";

const MessageHeader = (props) => {
  const colors = useContext(themeContext);
  return (
    <View
      style={{
        backgroundColor: colors.Primary,
        paddingTop: StatusBar.currentHeight,
        height: 100,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            marginLeft: 20,
          }}
          onPress={() => props.navigation.goBack()}
        >
          <Ionicons
            style={{ color: colors.theme == "light" ? "#FFF" : colors.Text }}
            name="arrow-back"
            size={35}
          />
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            marginLeft: 20,
          }}
        >
          <View
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              marginRight: 20,
            }}
          >
            <Image
              style={{ height: "100%", width: "100%", borderRadius: 20 }}
              source={{ uri: Api.BaseUrl + props.profileImage }}
            />
          </View>
          <Text
            style={{
              fontFamily: "Regular",
              fontSize: 23,
              color: colors.theme == "light" ? "#FFF" : colors.Text,
            }}
          >
            {props.firstName} {props.lastName}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default MessageHeader;

const styles = StyleSheet.create({});
