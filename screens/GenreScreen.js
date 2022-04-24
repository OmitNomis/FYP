import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
// import colors from "../assets/theme/colors";
import RetriveData from "../service/RetriveData";
import ItemWide from "../components/ItemWide";
import themeContext from "../assets/theme/colorsContext";

const GenreScreen = (props) => {
  const colors = useContext(themeContext);
  const [loading, setLoading] = useState(true);
  const [postList, setPostList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    props.navigation.setOptions({
      title: props.route.params.params.genre.genreName,
    });
    getPost();
  }, []);

  const getPost = async (response) => {
    var response = await RetriveData.GetPostByGenre(
      props.route.params.params.genre.genreID
    );
    if (response != undefined) {
      setPostList(response);
      setLoading(false);
    } else {
      ToastMessage.Short("Error Loading Posts");
      setLoading(false);
    }
  };
  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getPost();
    wait(1000).then(() => setRefreshing(false));
  }, []);

  const renderItem = ({ item }) => (
    <ItemWide data={item} navigation={props.navigation} />
  );

  return loading == false ? (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.Background,
        paddingHorizontal: 30,
        paddingVertical: 30,
      }}
    >
      <View
        style={[styles.searchSection, { backgroundColor: colors.Background }]}
      >
        <View style={[styles.searchBar, { backgroundColor: colors.Seperator }]}>
          <Ionicons name="search" size={25} style={{ color: colors.Text }} />
          <TextInput
            placeholderTextColor={colors.LightText}
            placeholder="Search..."
            style={{
              color: colors.Text,
              width: "80%",
              fontFamily: "Regular",
              fontSize: 16,
              marginLeft: 10,
            }}
          />
        </View>
      </View>
      {postList.length == 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No Books Listed Yet!</Text>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={postList}
          renderItem={renderItem}
          keyExtractor={(item) => item.postID}
        />
      )}
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

export default GenreScreen;

const styles = StyleSheet.create({
  searchSection: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  searchBar: {
    height: 45,
    marginHorizontal: 5,
    elevation: 5,
    width: "100%",
    borderRadius: 9,
    alignItems: "center",
    paddingLeft: 15,
    flexDirection: "row",
  },
});
