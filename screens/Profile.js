import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import themeContext from "../assets/theme/colorsContext";
// import colors from "../assets/theme/colors";
import RetriveData from "../service/RetriveData";
import ItemWide from "../components/ItemWide";
import ToastMessage from "../components/Toast";
import Api from "../constants/Api";
const Profile = (props) => {
  const colors = useContext(themeContext);
  const [myListings, setMyListings] = useState([]);
  const [myDetails, setMyDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sold, setSold] = useState();
  const [refreshing, setRefreshing] = useState(false);
  const getMyDetails = async () => {
    var response = await RetriveData.GetCustomerInfo();
    if (response != undefined) {
      setMyDetails(response);
      getMyListings(response);
    } else {
      ToastMessage.Short("Error Loading details");
      getMyListings();
    }
  };
  const getMyListings = async (myDetails) => {
    var response = await RetriveData.GetPostsByUser(myDetails.UserId);
    if (response != undefined) {
      setMyListings(response);
      getSoldPosts(myDetails);
    } else {
      ToastMessage.Short("Error Loading User Posts");
    }
  };
  const getSoldPosts = async (myDetails) => {
    var response = await RetriveData.GetSoldList(myDetails.UserId);
    if (response != undefined) {
      setSold(response.length);
      setLoading(false);
    } else {
      ToastMessage.Short("Error Loading Details");
      setLoading(false);
    }
  };

  const memberFor = () => {
    var diff = Math.abs(new Date() - new Date(myDetails.StartDate));
    let days = Math.floor(diff / (86400 * 1000));
    if (days < 1) {
      return "1 day";
    } else if (days < 30) {
      return days + " days";
    } else {
      var month = days / 30;
      if (month < 2) {
        return Math.floor(month) + " Month";
      } else {
        return Math.floor(month) + " Months";
      }
    }
  };
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getMyDetails();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getMyDetails();
  }, []);

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
  var infoBox = {
    height: 60,
    width: 100,
    borderRadius: 10,
    flexDirection: "column",
    alignItems: "center",
    padding: 5,
    backgroundColor: colors.LightPurple,
  };
  var circle = {
    height: 45,
    width: 45,
    backgroundColor: "#e6e6e6",
    borderRadius: 22.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.Seperator,
  };
  return loading == false ? (
    <View style={{ flex: 1, backgroundColor: colors.Background }}>
      <ScrollView
        nestedScrollEnabled
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.topIcons}>
          <TouchableOpacity
            style={circle}
            onPress={() => props.navigation.goBack()}
          >
            <Ionicons
              name="arrow-back"
              size={25}
              style={{ color: colors.Text }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={circle}
            onPress={() => {
              props.navigation.navigate("Settings");
            }}
          >
            <Ionicons
              name="ios-settings-sharp"
              size={20}
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
              marginBottom: 20,
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
            <Text style={[styles.name, { color: colors.Text }]}>
              {myDetails.FirstName} {myDetails.LastName}
            </Text>
          </View>
          <Text style={[styles.location, { color: colors.LightText }]}>
            {myDetails.City}
          </Text>
        </View>

        <View style={styles.info}>
          <View style={infoBox}>
            <Text style={infoHeading}>Member for</Text>
            <Text style={infoInfo}>{memberFor()}</Text>
          </View>
          <View style={infoBox}>
            <Text style={infoHeading}>Books Sold</Text>
            <Text style={infoInfo}>{sold} Sold</Text>
          </View>
          <View style={infoBox}>
            <Text style={infoHeading}>Total Posts</Text>
            <Text style={infoInfo}>{myListings.length} Posts</Text>
          </View>
        </View>
        <View style={styles.subHeading}>
          <View>
            <Text
              style={{
                fontFamily: "Bold",
                fontSize: 16,
                color: colors.Text,
              }}
            >
              Posts
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("Settings", { screen: "MyListings" })
            }
            style={[styles.redBtn, { backgroundColor: colors.Primary }]}
          >
            <Text style={[styles.redBtnText, { color: colors.White }]}>
              See all posts
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.posts}>
          {myListings.length == 0 ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{ fontFamily: "Regular", fontSize: 16, marginTop: 50 }}
              >
                No Posts Made Yet
              </Text>
            </View>
          ) : (
            <ScrollView
              nestedScrollEnabled
              showsVerticalScrollIndicator={false}
            >
              {myListings.slice(0, 10).map((item) => {
                return <ItemWide data={item} navigation={props.navigation} />;
              })}
            </ScrollView>
          )}
        </View>
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

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 20,
    paddingHorizontal: 30,
  },
  posts: {
    marginTop: 20,
    maxHeight: 400,
    paddingBottom: 50,
  },
  subHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
});
