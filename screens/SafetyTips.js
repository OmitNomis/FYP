import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useState, useEffect, useContext } from "react";
// import colors from "../assets/theme/colors";
import themeContext from "../assets/theme/colorsContext";

const SafetyTips = (props) => {
  const colors = useContext(themeContext);
  useEffect(() => {
    props.navigation.setOptions({
      title: "Safety Tips",
    });
  }, []);
  const text = {
    textAlign: "justify",
    fontFamily: "Regular",
    fontSize: 14,
    color: colors.Text,
    marginBottom: 10,
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.Background }}>
      <ScrollView
        nestedScrollEnabled
        contentContainerStyle={{
          paddingHorizontal: 30,
          marginTop: 20,
          backgroundColor: colors.Background,
          flexGrow: 1,
        }}
      >
        <View>
          <Text
            style={{
              textAlign: "justify",
              fontFamily: "Regular",
              fontSize: 16,
              color: colors.Text,
            }}
          >
            Pick A Book provides online platform which helps buyers {"&"}{" "}
            sellers to meet with each other. However, it is always a good idea
            to take some precaution before conducting any transaction. Below are
            several safety guidelines. This is not a complete list. We advise
            you to always use common sense, sound judgment and trust your
            instincts.
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Text style={text}>
            {"->"} For your personal safety, always meet buyer/seller in public
            places (restaurant, office, shops, etc) where other people are
            present.
          </Text>
          <Text style={text}>
            {"->"} Always carry a cell phone with you. If possible take a friend
            along. Do inform someone from your family or friend about the person
            you are meeting and where you are going.
          </Text>
          <Text style={text}>
            {"->"} Try not to arrange meeting at home or isolated places. If
            required, make sure you are not alone. If you feel something
            suspicious, stop immediately.
          </Text>
          <Text style={text}>
            {"->"} We recommend you to physically inspect the product before
            making payment. Take your time to check product thoroughly, avoid
            being rushed in by seller. If you do not have required expertise,
            ask advice from your friend or professional.
          </Text>
          <Text style={text}>
            {"->"} If something sounds too good to be true, it probably is
            suspicious
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SafetyTips;
