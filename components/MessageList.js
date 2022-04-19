import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useContext, useState, useRef } from "react";
import themeContext from "../assets/theme/colorsContext";
import Message from "./Message";

const MessageList = (props) => {
  const colors = useContext(themeContext);
  const [messages, setMessages] = useState([
    {
      user: 0,
      time: "12:00",
      content: "Hey",
    },
    {
      user: 1,
      time: "12:05",
      content: "What's up",
    },
    {
      user: 1,
      time: "12:07",
      content: "How is it going?",
    },
    {
      user: 0,
      time: "12:09",
      content: "things are going great",
    },
    {
      user: 0,
      time: "12:00",
      content: "Good :)",
    },
    {
      user: 1,
      time: "12:05",
      content:
        "Should we hang out tomorrow? I was thinking of going somewhere which has drinks",
    },
    {
      user: 0,
      time: "12:07",
      content: "Sure",
    },
    {
      user: 1,
      time: "12:09",
      content: "Great",
    },
    {
      user: 0,
      time: "12:07",
      content: "7 o'clock?",
    },
    {
      user: 1,
      time: "12:09",
      content: "Sounds good",
    },
  ]);
  const scrollView = useRef();
  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: colors.Background,
        flexGrow: 1,
        justifyContent: "flex-end",
      }}
      onContentChange={() => {
        scrollView.current.scrollToEnd({ animated: true });
      }}
    >
      {messages.map((message, index) => (
        <Message
          key={index}
          time={message.time}
          isLeft={message.user == 0 ? true : false}
          message={message.content}
        />
      ))}
    </ScrollView>
  );
};

export default MessageList;
