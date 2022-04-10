import React, { useEffect, useState } from "react";
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
import colors from "../assets/theme/colors";
import RetriveData from "../service/RetriveData";
import ItemWide from "../components/ItemWide";

const SoldItems = (props) => {
  const [loading, setLoading] = useState(true);
  const [bookmark, setBookmark] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    props.navigation.setOptions({
      title: "Sold Books",
    });
    getMyDetails();
  }, []);

  const getMyDetails = async () => {
    var response = await RetriveData.GetCustomerInfo();
    if (response != undefined) {
      getMyBookmarks(response);
    } else {
      ToastMessage.Short("Error Loading details");
      getMyBookmarks(response);
    }
  };
  const getMyBookmarks = async (response) => {
    var response = await RetriveData.GetSoldList(response.UserId);
    if (response != undefined) {
      setBookmark(response);
      setLoading(false);
    } else {
      ToastMessage.Short("Error Loading bookmarks");
      setLoading(false);
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

  const renderItem = ({ item }) => (
    <ItemWide data={item} navigation={props.navigation} />
  );

  return loading == false ? (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.Background,
        paddingHorizontal: 30,
      }}
    >
      <View
        style={[styles.searchSection, { backgroundColor: colors.Background }]}
      >
        <View style={[styles.searchBar, { backgroundColor: colors.White }]}>
          <Ionicons name="search" size={25} />
          <TextInput
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
      {/* <ScrollView nestedScrollEnabled>chat components</ScrollView> */}
      {bookmark.length == 0 ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No Bookmarks Found!</Text>
        </View>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={bookmark}
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

export default SoldItems;

const styles = StyleSheet.create({
  searchSection: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
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
