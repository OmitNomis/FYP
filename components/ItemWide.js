import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import colors from "../assets/theme/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import RetriveData from "../service/RetriveData";
import Api from "../constants/Api";

const ItemWide = (props) => {
  const bookDetails = props.data;
  useEffect(() => {
    getUserById();
  }, []);
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(true);
  const getUserById = async () => {
    var response = await RetriveData.GetUserById(props.data.userID);
    if (response != undefined) {
      setUserInfo(response[0]);
      setLoading(false);
    } else {
      ToastMessage.Short("Error Loading User Info ");
    }
  };

  return (
    loading == false && (
      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          props.navigation.navigate("Book", {
            params: { name: "BookDetails", bookDetails },
          })
        }
      >
        <View style={styles.dateHolder}>
          <Text style={styles.date}>{bookDetails.postDate.split("T")[0]}</Text>
        </View>
        <View style={styles.bottom}>
          <View style={styles.imageHolder}>
            <Image
              style={{
                height: "100%",
                width: "100%",
                borderRadius: 10,
              }}
              source={{ uri: Api.BaseUrl + "/" + bookDetails.image }}
            />
          </View>
          <View style={styles.itemDetails}>
            <View style={styles.heading}>
              <Ionicons
                name="ios-book"
                size={22}
                style={{ color: colors.Text }}
              />
              <Text style={styles.headingText}>{bookDetails.title}</Text>
            </View>
            <View style={styles.info}>
              <View style={styles.bottomTextHolder}>
                <Ionicons
                  name="person-circle"
                  size={20}
                  style={styles.iconStyles}
                />
                <Text style={styles.text}>
                  {userInfo.firstName} {userInfo.lastName}
                </Text>
              </View>
              <View style={styles.bottomTextHolder}>
                <Ionicons name="location" size={20} style={styles.iconStyles} />
                <Text style={styles.text}>{userInfo.city}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  );
};

export default ItemWide;

const styles = StyleSheet.create({
  container: {
    borderColor: colors.Gray,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: colors.White,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
  },
  dateHolder: {
    marginBottom: 10,
  },
  date: {
    color: colors.LightText,
    fontFamily: "Regular",
    fontSize: 14,
  },
  imageHolder: {
    height: 100,
    width: 130,
    backgroundColor: "red",
    borderRadius: 10,
  },
  bottom: {
    flexDirection: "row",
  },
  itemDetails: {
    marginLeft: 10,
  },
  heading: {
    flexDirection: "row",
  },
  headingText: {
    fontFamily: "Bold",
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 10,
  },
  info: {},
  bottomTextHolder: {
    flexDirection: "row",
  },
  text: {
    fontFamily: "Regular",
    fontSize: 14,
    marginLeft: 10,
    color: colors.LightText,
  },
  iconStyles: {
    color: colors.LightText,
  },
});
