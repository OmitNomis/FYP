import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import React, { useContext, useState, useEffect } from "react";
import themeContext from "../assets/theme/colorsContext";
import Api from "../constants/Api";
import RetriveData from "../service/RetriveData";
import request from "../config/RequestManager";
import ToastMessage from "./Toast";
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

  const deletePostComment = async () => {
    var data = {
      CommentId: props.commentID,
    };
    var response = await (await request())
      .post(Api.DeletePostComment, data)
      .catch(function (error) {
        ToastMessage.Short("Error Occured, Try Again");
      });

    if (response != undefined) {
      if (response.data.success == 1) {
        ToastMessage.Short("Comment Succesfully Removed");
        props.refreshComments();
      } else {
        ToastMessage.Short(response.data.Message);
      }
    } else {
      ToastMessage.Short("Error Occured");
    }
  };

  return (
    loading == false && (
      <TouchableWithoutFeedback
        onLongPress={() => {
          Alert.alert(
            "Are You Sure?",
            "Do you want to delete this comment? This action is not reversible.",
            [
              {
                text: "Go Back",
                style: "cancel",
              },
              { text: "Delete", onPress: () => deletePostComment() },
            ]
          );
        }}
      >
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
      </TouchableWithoutFeedback>
    )
  );
};

export default Comment;
