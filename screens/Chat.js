import React, { useContext } from "react";
import { StyleSheet, Text, View, ScrollView, TextInput } from "react-native";

import themeContext from "../assets/theme/colorsContext";
import PersonChat from "../components/PersonChat";

const Chat = (props) => {
  const colors = useContext(themeContext);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.Background,
        paddingHorizontal: 30,
      }}
    >
      <ScrollView nestedScrollEnabled style={{ marginTop: 20 }}>
        <PersonChat navigation={props.navigation} />
        <PersonChat navigation={props.navigation} />
      </ScrollView>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
