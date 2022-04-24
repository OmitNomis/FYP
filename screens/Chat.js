import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  RefreshControl,
  ActivityIndicator,
} from "react-native";

import themeContext from "../assets/theme/colorsContext";
import PersonChat from "../components/PersonChat";
import RetriveData from "../service/RetriveData";

const Chat = (props) => {
  const colors = useContext(themeContext);
  const [myDetails, setMyDetails] = useState();
  const [chatList, setChatList] = useState();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getMyDetails();
  }, []);

  const refresh = () => {
    getMyDetails();
  };

  const getMyDetails = async () => {
    var response = await RetriveData.GetCustomerInfo();
    if (response != undefined) {
      setMyDetails(response);
      getChatList(response);
    } else {
      ToastMessage.Short("Error Loading details");
    }
  };
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refresh();
    wait(1000).then(() => setRefreshing(false));
  }, []);
  const getChatList = async (myDetails) => {
    var response = await RetriveData.GetChatList(myDetails.UserId);
    // setChatList(response);
    checkExisting(myDetails, response);
  };
  const checkExisting = (myDetails, item) => {
    var newArray = [];
    var idArray = [];

    item
      .slice(0)
      .reverse()
      .map((item) => {
        if (myDetails.UserId === item.senderID) {
          if (!idArray.includes(item.receiverID)) {
            idArray.push(item.receiverID);
            newArray.push(item);
          }
        } else {
          if (!idArray.includes(item.senderID)) {
            idArray.push(item.senderID);
            newArray.push(item);
          }
        }
      });
    setChatList(newArray);
    setLoading(false);
  };

  return loading == false ? (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.Background,
        paddingHorizontal: 30,
      }}
    >
      <ScrollView
        nestedScrollEnabled
        contentContainerStyle={{ marginTop: 20, flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {chatList.map((item) => (
          <PersonChat
            key={item.messageID}
            lastMessage={item.message}
            userId={
              myDetails.UserId === item.senderID
                ? item.receiverID
                : item.senderID
            }
            time={item.dateTime}
            navigation={props.navigation}
            refresh={refresh}
          />
        ))}
      </ScrollView>
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.Background,
      }}
    >
      <ActivityIndicator color={colors.Primary} size="large" />
      <Text
        style={{
          fontFamily: "Regular",
          fontSize: 16,
          marginTop: 20,
          color: colors.Text,
        }}
      >
        Please Wait...
      </Text>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
