import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
// import themeContext from "../assets/theme/colorsContext";
import colors from "../assets/theme/colors";

const Profile = (props) => {
  // const colors = useContext(themeContext);

  var infoHeading = StyleSheet.flatten({
    fontFamily: "Regular",
    color: colors.LightText,
    fontSize: 14,
  });
  var infoInfo = StyleSheet.flatten({
    fontFamily: "Bold",
    fontSize: 16,
    color: colors.Text,
  });
  return (
    <View style={{ flex: 1, backgroundColor: colors.Background }}>
      <ScrollView nestedScrollEnabled style={styles.container}>
        <View style={styles.topIcons}>
          <TouchableOpacity
            style={styles.circle}
            onPress={() => props.navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={25} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.circle}
            onPress={() => {
              props.navigation.navigate("Settings");
            }}
          >
            <Ionicons name="ios-settings-sharp" size={20} />
          </TouchableOpacity>
        </View>
        <View style={styles.pictureHolder}>
          <View
            style={{
              height: 130,
              width: 130,
              borderRadius: 65,
              backgroundColor: colors.Primary,
            }}
          ></View>
        </View>
        <View style={styles.heading}>
          <View>
            <Text style={[styles.name, { color: colors.Text }]}>
              {" "}
              Simon Poudyal
            </Text>
          </View>
          <Text style={[styles.location, { color: colors.LightText }]}>
            Mumbai, Kolkata
          </Text>
        </View>

        <View style={styles.info}>
          <View style={styles.infoBox}>
            <Text style={infoHeading}>Member for</Text>
            <Text style={infoInfo}>hehe</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={infoHeading}>Books Sold</Text>
            <Text style={infoInfo}>hehe</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={infoHeading}>Total Posts</Text>
            <Text style={infoInfo}>hehe</Text>
          </View>
        </View>
        <View style={styles.subHeading}>
          <View>
            <Text style={styles.heading2}>Posts</Text>
          </View>
          <TouchableOpacity
            style={[styles.redBtn, { backgroundColor: colors.Primary }]}
          >
            <Text style={[styles.redBtnText, { color: colors.White }]}>
              See all posts
            </Text>
          </TouchableOpacity>
        </View>
        <View>{/* posts */}</View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 20,
    paddingHorizontal: 30,
  },
  subHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading2: {
    fontFamily: "Bold",
    fontSize: 16,
  },
  redBtn: {
    height: 25,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  redBtnText: {
    fontFamily: "Regular",
    fontSize: 14,
    marginHorizontal: 10,
  },
  topIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  circle: {
    height: 45,
    width: 45,
    backgroundColor: "#e6e6e6",
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
  },
  pictureHolder: {
    marginTop: 20,
    alignSelf: "center",
  },
  heading: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontFamily: "Bold",
    fontSize: 20,
  },
  location: {
    fontFamily: "Regular",
    fontSize: 16,
  },
  info: {
    marginTop: 55,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 50,
  },
  infoBox: {
    height: 60,
    width: 100,
    backgroundColor: "#F7E5FA",
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "center",
    padding: 5,
  },
});
