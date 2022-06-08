import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useState, useEffect, useRef } from "react";
import themeContext from "../assets/theme/colorsContext";
import MessageHeader from "../components/MessageHeader";
import Message from "../components/Message";
import Icon from "react-native-vector-icons/FontAwesome";
import api from "../constants/Api";
import io from "socket.io-client";
import RetriveData from "../service/RetriveData";
const ChatMessage = (props) => {
  const scrollView = useRef();
  const userID = props.route.params.params.userID;
  const firstName = props.route.params.params.firstName;
  const lastName = props.route.params.params.lastName;
  const profileImage = props.route.params.params.profileImage;
  var myID;

  const socket = io(api.BaseUrl);
  const [message, setMessage] = useState("");
  const [myDetails, setMyDetails] = useState([]);
  const [messages, setMessages] = useState([]);
  const colors = useContext(themeContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getMyDetails();
  }, []);

  useEffect(() => {
    socket.on("chat message", (msg) => {
      appendMessage(msg);
    });
  }, []);
  const appendMessage = (msg) => {
    if (msg.senderID == myID || msg.senderID == userID) {
      if (msg.receiverID == myID || msg.receiverID == userID) {
        setMessages((messages) => [...messages, msg]);
        props.route.params.params.refresh(msg);
      }
    }
  };
  const getMessages = async (id) => {
    var msgs = await RetriveData.GetChat(id, userID);
    setMessages(msgs);
    setLoading(false);
  };
  const getMyDetails = async () => {
    var response = await RetriveData.GetCustomerInfo();
    if (response != undefined) {
      setMyDetails(response);
      myID = response.UserId;
      getMessages(response.UserId);
    } else {
      ToastMessage.Short("Error Loading details");
      getMessages(response.UserId);
    }
  };

  const submitChatMessage = () => {
    let currentDate = new Date();

    if (message.trim() != "") {
      socket.emit("chat message", {
        senderID: myDetails.UserId,
        receiverID: userID,
        dateTime: currentDate,
        message: message,
      });
    }
    setMessage("");
  };
  const isMyMessage = (id) => {
    if (myDetails.UserId == id) {
      return false;
    } else {
      return true;
    }
  };
  return loading == false ? (
    <KeyboardAvoidingView
      behavior="height"
      style={{ flex: 1, backgroundColor: colors.Background }}
    >
      <>
        <MessageHeader
          navigation={props.navigation}
          firstName={firstName}
          lastName={lastName}
          profileImage={profileImage}
        />
        <ScrollView
          ref={(ref) => (scrollView.current = ref)}
          contentContainerStyle={{
            backgroundColor: colors.Background,
            flexGrow: 1,
            justifyContent: "flex-end",
          }}
          onContentSizeChange={() =>
            scrollView.current.scrollToEnd({ animated: true })
          }
        >
          {messages.map((message) => (
            <Message
              key={message.messageID ? message.messageID : message.message}
              time={message.dateTime}
              isLeft={isMyMessage(message.senderID)}
              message={message.message}
            />
          ))}
        </ScrollView>
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
              value={message}
              onChangeText={(text) => setMessage(text)}
              placeholderTextColor={colors.LightText}
              onSubmitEditing={submitChatMessage}
              style={{
                height: 60,
                fontSize: 16,
                fontFamily: "Regular",
                color: colors.Text,
              }}
              onFocus={() => scrollView.current.scrollToEnd({ animated: true })}
            />
          </View>
          <TouchableOpacity
            onPress={submitChatMessage}
            style={{
              width: "20%",
              alignItems: "center",
            }}
          >
            <Icon name={"send"} size={25} style={{ color: colors.Text }} />
          </TouchableOpacity>
        </View>
      </>
    </KeyboardAvoidingView>
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

export default ChatMessage;

const styles = StyleSheet.create({});
