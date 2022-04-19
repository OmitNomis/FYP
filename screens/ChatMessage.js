import { StyleSheet, KeyboardAvoidingView, StatusBar } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import themeContext from "../assets/theme/colorsContext";
import MessageInput from "../components/MessageInput";
import MessageList from "../components/MessageList";
import MessageHeader from "../components/MessageHeader";

const ChatMessage = (props) => {
  const colors = useContext(themeContext);
  return (
    <KeyboardAvoidingView
      behavior="height"
      style={{ flex: 1, backgroundColor: colors.Background }}
    >
      <>
        <MessageHeader navigation={props.navigation} />
        <MessageList />
        <MessageInput />
      </>
    </KeyboardAvoidingView>
  );
};

export default ChatMessage;

const styles = StyleSheet.create({});
