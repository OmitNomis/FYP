import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  RefreshControl,
} from "react-native";
import colors from "../assets/theme/colors";
import Icon from "react-native-vector-icons/Ionicons";
import ItemSmall from "../components/ItemSmall";
import Genre from "../components/Genre";
import RetriveData from "../service/RetriveData";
import ToastMessage from "../components/Toast";
import { NavigationContainer } from "@react-navigation/native";
// import themeContext from "../assets/theme/colorsContext";

const Home = (props) => {
  // const colors = useContext(themeContext);
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

  const [genreList, setGenreList] = useState([]);
  const [postList, setPostList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    getGenres();
    getPosts();
  }, []);
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getPosts();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getGenres = async () => {
    var response = await RetriveData.GetGenre();
    if (response != undefined) {
      setGenreList(response);
    } else {
      ToastMessage.Short("Error Loading Genre List ");
    }
  };

  const getPosts = async () => {
    var response = await RetriveData.GetPosts();
    if (response != undefined) {
      if (response.success == 1) {
        setPostList(response.data);
      } else {
        ToastMessage.Short("Error Loading Post List");
      }
    } else {
      ToastMessage.Short("Error Loading Post List ");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        nestedScrollEnabled
        style={[styles.container, { backgroundColor: colors.Background }]}
      >
        <View style={styles.topIcons}>
          <View
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              backgroundColor: colors.Primary,
            }}
          ></View>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                height: 55,
                width: 55,
                borderRadius: 10,
                elevation: 5,
                backgroundColor: colors.White,
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
            Hi there, Simon
          </Text>
          <Text style={styles.text}>What do you want to buy today?</Text>
        </View>
        <View style={styles.searchDiv}>
          <TouchableOpacity
            style={[styles.searchBox, { backgroundColor: colors.White }]}
          >
            <Icon name="search" size={25} />
            <Text
              style={{
                fontFamily: "Regular",
                fontSize: 15,
                color: "#a0a0a0",
                marginLeft: 10,
              }}
            >
              Search for Books...
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.filterIcon, { backgroundColor: colors.White }]}
          >
            <Icon name="ios-funnel-outline" size={30} />
          </TouchableOpacity>
        </View>
        <View style={styles.subHeading}>
          <View>
            <Text style={styles.heading2}>Genre</Text>
          </View>
          <TouchableOpacity style={redBtn}>
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
          {genreList.map((item) => {
            return <Genre item={item} />;
          })}
        </ScrollView>

        <View style={styles.subHeading}>
          <View>
            <Text style={styles.heading2}>Recent posts</Text>
          </View>
          <TouchableOpacity style={redBtn}>
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
            {postList.map((item) => {
              return <ItemSmall item={item} navigation={props.navigation} />;
            })}
          </ScrollView>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[styles.addBall, { backgroundColor: colors.Primary }]}
        onPress={() => {
          props.navigation.push("AddPost");
        }}
      >
        <Icon name="add-outline" size={35} style={{ color: colors.White }} />
      </TouchableOpacity>
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
  heading2: {
    fontFamily: "Bold",
    fontSize: 16,
  },
  genres: {
    maxHeight: 170,
    marginBottom: 20,
    marginTop: 10,
  },
  text: {
    fontFamily: "Regular",
    fontSize: 16,
    color: colors.Text,
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
