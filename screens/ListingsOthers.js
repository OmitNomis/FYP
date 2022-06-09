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
const MyListings = (props) => {
  const [loading, setLoading] = useState(true);
  const [bookmark, setBookmark] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const colors = useContext(themeContext);
  const UserId = props.route.params.UserId;

  useEffect(() => {
    props.navigation.setOptions({
      title: "All Posts",
    });
    getMyBookmarks();
  }, []);
  const updateSearch = (search) => {
    setSearch(search);
    var filteredList = bookmark.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredList);
  };
  const getMyBookmarks = async (response) => {
    var response = await RetriveData.GetPostsByUser(UserId);
    if (response != undefined) {
      setBookmark(response);
      setFiltered(response);
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
    getMyBookmarks();
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
            value={search}
            onChangeText={(text) => {
              updateSearch(text);
            }}
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
      {filtered.length == 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{ fontFamily: "Regular", fontSize: 23, color: colors.Text }}
          >
            Books not found!
          </Text>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={filtered}
          renderItem={renderItem}
          keyExtractor={(item) => item.postID}
        />
      )}
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

export default MyListings;

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
