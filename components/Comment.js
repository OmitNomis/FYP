import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import themeContext from "../assets/theme/colorsContext";
import Api from "../constants/Api";
import RetriveData from "../service/RetriveData";
const Comment = (props) => {
  const colors = useContext(themeContext);
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const messageTime = () => {
    var date = new Date(props.time);
    let time = date.getHours() + ":" + ("0" + date.getMinutes()).slice(-2);
    return time;
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    var response = await RetriveData.GetUserById(props.userId);
    setUserInfo(response[0]);
    setLoading(false);
  };

  return (
    loading == false && (
      <View
        style={{
          backgroundColor: colors.backgroundColor,
          height: 80,
          flexDirection: "row",
          borderTopColor: colors.Seperator,
          borderTopWidth: 1,
          borderBottomColor: colors.Seperator,
          borderBottomWidth: 1,
          alignItems: "center",
          paddingTop: 5,
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
            }}
          >
            <Image
              style={{ height: "100%", width: "100%", borderRadius: 25 }}
              source={{ uri: Api.BaseUrl + userInfo.profileImage }}
            />
          </View>
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
              {userInfo.firstName} {userInfo.lastName}
            </Text>
            <Text
              style={{
                fontFamily: "Regular",
                fontSize: 14,
                color: colors.LightText,
              }}
            >
              {messageTime()}
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
              {props.comment}
            </Text>
          </View>
        </View>
      </View>
    )
  );
};

export default Comment;
