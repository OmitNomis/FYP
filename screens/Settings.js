import React, { useContext, useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Switch,
  Image,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import SettingsBtn from "../components/SettingsButtons";
import { EventRegister } from "react-native-event-listeners";
import colors from "../assets/theme/colors";
import DeviceStorage from "../config/DeviceStorage";
import RetriveData from "../service/RetriveData";
import Api from "../constants/Api";

const Settings = (props) => {
  //   const colors = useContext(themeContext);
  const [darkMode, setDarkMode] = useState();
  const [myDetails, setMyDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyDetails();
  }, []);

  const getMyDetails = async () => {
    var response = await RetriveData.GetCustomerInfo();
    if (response != undefined) {
      setMyDetails(response);
      setLoading(false);
    } else {
      ToastMessage.Short("Error Loading details");
      setLoading(false);
    }
  };

  return loading == false ? (
    <View style={styles.container}>
      <View style={styles.topIcons}>
        <TouchableOpacity
          style={styles.circle}
          onPress={() => props.navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={23}
            style={{ color: colors.Text }}
          />
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
        >
          <Image
            style={{ height: "100%", width: "100%", borderRadius: 65 }}
            source={{ uri: Api.BaseUrl + myDetails.ProfileImage }}
          />
        </View>
      </View>
      <View style={styles.heading}>
        <View>
          <Text style={styles.name}>
            {myDetails.FirstName} {myDetails.LastName}
          </Text>
        </View>
        <Text style={styles.location}>{myDetails.City}</Text>
      </View>
      <TouchableOpacity
        style={styles.redBtn}
        onPress={() => {
          props.navigation.push("EditProfile");
        }}
      >
        <Text style={styles.redBtnText}>Edit profile</Text>
      </TouchableOpacity>

      <ScrollView
        style={{ marginTop: 30 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        nestedScrollEnabled
      >
        <View style={styles.seperator}>
          <Text style={styles.seperatorHeading}>Content</Text>
        </View>
        <View style={styles.section}>
          <SettingsBtn
            title="Bookmarks"
            icon="heart-outline"
            onPress={() => {
              props.navigation.push("Bookmarks");
            }}
          />
          <SettingsBtn
            title="My Listings"
            icon="reorder-three-outline"
            onPress={() => {
              props.navigation.push("MyListings");
            }}
          />
          <SettingsBtn
            title="Sold Items"
            icon="reorder-two-outline"
            onPress={() => {
              props.navigation.push("SoldItems");
            }}
          />
        </View>
        <View style={styles.seperator}>
          <Text style={styles.seperatorHeading}>Preferences</Text>
        </View>
        <View style={styles.section}>
          <TouchableOpacity onPress={() => {}}>
            <View
              style={{
                height: 42,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginHorizontal: 30,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: colors.Background,
                }}
              >
                <Ionicons
                  name="moon-outline"
                  size={18}
                  style={{ color: colors.Text }}
                />
                <Text
                  style={{
                    fontFamily: "Regular",
                    fontSize: 16,
                    marginLeft: 20,
                    color: colors.Text,
                  }}
                >
                  Dark Mode
                </Text>
              </View>
              <View>
                <Switch
                  trackColor={{ false: colors.Primary, true: colors.Gray }}
                  thumbColor={darkMode ? colors.Primary : colors.Gray}
                  value={darkMode}
                  onValueChange={(value) => {
                    setDarkMode(value);
                    EventRegister.emit("darkTheme", value);
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.seperator}>
          <Text style={styles.seperatorHeading}>Others</Text>
        </View>
        <View style={styles.section}>
          <SettingsBtn
            title="Contact Us"
            icon="call-outline"
            onPress={() => props.navigation.push("ContactUs")}
          />
          <SettingsBtn
            title="Safety Tips"
            icon="reorder-three-outline"
            onPress={() => props.navigation.push("SafetyTips")}
          />
          <SettingsBtn
            title="About"
            icon="reorder-two-outline"
            onPress={() => props.navigation.push("About")}
          />
        </View>
        <View style={styles.seperator}>
          <Text style={styles.seperatorHeading}>Security</Text>
        </View>
        <View style={styles.section}>
          <SettingsBtn
            title="Change Password"
            icon="lock-closed-outline"
            onPress={() => props.navigation.push("ChangePassword")}
          />
          <SettingsBtn
            title="Log Out"
            icon="log-out-outline"
            onPress={() => {
              DeviceStorage.clearToken();
              props.navigation.replace("SignInStack");
            }}
          />
        </View>
      </ScrollView>
    </View>
  ) : (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator color={colors.Primary} size="large" />
      <Text style={{ fontFamily: "Regular", fontSize: 16, marginTop: 20 }}>
        Please Wait...
      </Text>
    </View>
  );
};

export default Settings;
const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight + 20,
    backgroundColor: colors.Background,
    flex: 1,
  },
  redBtn: {
    height: 25,
    backgroundColor: colors.Primary,
    borderRadius: 40,
    alignSelf: "center",
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  redBtnText: {
    color: colors.White,
    fontFamily: "Regular",
    fontSize: 14,
    marginHorizontal: 10,
  },
  topIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 30,
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
    color: colors.Text,
  },
  location: {
    fontFamily: "Regular",
    fontSize: 16,
    color: colors.LightText,
  },
  seperator: {
    paddingLeft: 15,
    paddingVertical: 3,
    borderTopColor: "#CDCDCD",
    borderTopWidth: 0.5,
    borderBottomColor: "#CDCDCD",
    borderBottomWidth: 0.5,
    backgroundColor: colors.Seperator,
  },
  seperatorHeading: {
    color: colors.Text,
    fontFamily: "Regular",
  },
});
