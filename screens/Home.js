import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  RefreshControl,
  Image,
  ActivityIndicator,
} from "react-native";
// import colors from "../assets/theme/colors";
import Icon from "react-native-vector-icons/Ionicons";
import ItemSmall from "../components/ItemSmall";
import Genre from "../components/Genre";
import RetriveData from "../service/RetriveData";
import ToastMessage from "../components/Toast";
import Api from "../constants/Api";
import themeContext from "../assets/theme/colorsContext";

const Home = (props) => {
  const colors = useContext(themeContext);
  var redBtn = StyleSheet.flatten({
    height: 25,
    backgroundColor: colors.Primary,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  });
  var redBtnText = {
    color: colors.White,
    fontFamily: "Regular",
    fontSize: 14,
    marginHorizontal: 10,
  };
  var text = {
    fontFamily: "Regular",
    fontSize: 16,
    color: colors.Text,
  };
  var heading2 = {
    fontFamily: "Bold",
    fontSize: 16,
    color: colors.Text,
  };

  const [genreList, setGenreList] = useState([]);
  const [postList, setPostList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [myDetails, setMyDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyDetails();
  }, []);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getMyDetails();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const getMyDetails = async () => {
    var response = await RetriveData.GetCustomerInfo();
    if (response != undefined) {
      setMyDetails(response);
      getPosts();
    } else {
      ToastMessage.Short("Error Loading details");
      getPosts();
    }
  };

  const getGenres = async () => {
    var response = await RetriveData.GetGenre();
    if (response != undefined) {
      setGenreList(response);
      setLoading(false);
    } else {
      ToastMessage.Short("Error Loading Genre List ");
      setLoading(false);
    }
  };

  const getPosts = async () => {
    var response = await RetriveData.GetPosts();
    if (response != undefined) {
      if (response.success == 1) {
        setPostList(response.data);
        getGenres();
      } else {
        ToastMessage.Short("Error Loading Post List");
        getGenres();
      }
    } else {
      ToastMessage.Short("Error Loading Post List ");
      getGenres();
    }
  };

  return loading == false ? (
    <View style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        nestedScrollEnabled
        style={[styles.container, { backgroundColor: colors.Background }]}
      >
        <View style={styles.topIcons}>
          <TouchableOpacity
            style={{
              height: 66,
              width: 66,
              borderRadius: 33,
            }}
            onPress={() => props.navigation.navigate("Profile")}
          >
            <Image
              style={{ height: "100%", width: "100%", borderRadius: 33 }}
              source={{ uri: Api.BaseUrl + myDetails.ProfileImage }}
            />
          </TouchableOpacity>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate("Settings", { screen: "Bookmarks" });
              }}
              style={{
                height: 55,
                width: 55,
                borderRadius: 10,
                elevation: 5,
                backgroundColor: colors.Seperator,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <Icon name="heart" size={25} color={colors.Primary} />
            </TouchableOpacity>
            <Text
              style={{
                fontFamily: "Regular",
                fontSize: 14,
                color: colors.Text,
              }}
            >
              Bookmarks
            </Text>
          </View>
        </View>
        <View style={styles.header}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: "Bold",
              color: colors.Text,
            }}
          >
            Hi there, {myDetails.FirstName}
          </Text>
          <Text style={text}>What do you want to buy today?</Text>
        </View>
        <View style={styles.searchDiv}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("SearchScreen", {
                params: { screenName: "Search All Books", filter: false },
              })
            }
            style={[styles.searchBox, { backgroundColor: colors.Seperator }]}
          >
            <Icon name="search" size={25} style={{ color: colors.Text }} />
            <Text
              style={{
                fontFamily: "Regular",
                fontSize: 15,
                color: colors.Text,
                marginLeft: 10,
              }}
            >
              Search for Books...
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate("SearchScreen", {
                params: { screenName: "Search All Books", filter: true },
              })
            }
            style={[styles.filterIcon, { backgroundColor: colors.Seperator }]}
          >
            <Icon
              name="ios-funnel-outline"
              size={30}
              style={{ color: colors.Text }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.subHeading}>
          <View>
            <Text style={heading2}>Genre</Text>
          </View>
          <TouchableOpacity
            style={redBtn}
            onPress={() => props.navigation.navigate("AllGenre")}
          >
            <Text style={redBtnText}>See all genres</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          nestedScrollEnabled
          style={styles.genres}
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          {genreList.slice(0, 10).map((item, index) => {
            return (
              <Genre key={index} item={item} navigation={props.navigation} />
            );
          })}
        </ScrollView>

        <View style={styles.subHeading}>
          <View>
            <Text style={heading2}>Recent posts</Text>
          </View>
          <TouchableOpacity
            style={redBtn}
            onPress={() =>
              props.navigation.navigate("SearchScreen", {
                params: { screenName: "Recent Posts", filter: false },
              })
            }
          >
            <Text style={redBtnText}>See all posts</Text>
          </TouchableOpacity>
        </View>
        <View>
          <ScrollView
            horizontal
            nestedScrollEnabled
            showsHorizontalScrollIndicator={false}
            overScrollMode="never"
          >
            {postList.slice(0, 10).map((item, index) => {
              return (
                <ItemSmall
                  key={index}
                  item={item}
                  navigation={props.navigation}
                />
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[styles.addBall, { backgroundColor: colors.Primary }]}
        onPress={() => {
          props.navigation.navigate("AddPost");
        }}
      >
        <Icon name="add-outline" size={35} style={{ color: colors.White }} />
      </TouchableOpacity>
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

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 30,
  },
  topIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    marginHorizontal: 5,
  },
  header: {},
  searchDiv: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 5,
    marginVertical: 25,
  },
  searchBox: {
    height: 60,
    width: "75%",
    elevation: 5,
    borderRadius: 10,
    flexDirection: "row",
    paddingLeft: 15,
    alignItems: "center",
  },
  filterIcon: {
    height: 60,
    width: 60,
    borderRadius: 10,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  subHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  genres: {
    maxHeight: 170,
    marginBottom: 20,
    marginTop: 10,
  },
  addBall: {
    height: 65,
    width: 65,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 32.5,
    position: "absolute",
    right: 10,
    bottom: 10,
  },
});
