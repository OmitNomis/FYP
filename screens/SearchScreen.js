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
  TouchableOpacity,
} from "react-native";
// import colors from "../assets/theme/colors";
import RetriveData from "../service/RetriveData";
import ItemWide from "../components/ItemWide";
import themeContext from "../assets/theme/colorsContext";
import Icon from "react-native-vector-icons/Ionicons";
import ModalPopUp from "../components/Modal";
import Genre from "../components/Genre";
const SearchScreen = (props) => {
  const [loading, setLoading] = useState(true);
  const [bookmark, setBookmark] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const colors = useContext(themeContext);
  const [genreList, setGenreList] = useState([]);
  const [showFilter, setShowFilter] = useState(
    props.route.params.params.filter
  );

  useEffect(() => {
    props.navigation.setOptions({
      title: props.route.params.params.screenName,
    });
    getMyBookmarks();
    getGenres();
  }, []);
  const updateSearch = (search) => {
    setSearch(search);
    var filteredList = bookmark.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredList);
  };
  const getMyBookmarks = async (response) => {
    var response = await RetriveData.GetPosts();
    if (response != undefined) {
      setBookmark(response.data);
      setFiltered(response.data);

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
    wait(1000).then(() => setRefreshing(false));
  }, []);
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
  const renderItem = ({ item }) => (
    <ItemWide data={item} navigation={props.navigation} />
  );
  const clearFilter = () => {
    getMyBookmarks();
    setShowFilter(!showFilter);
  };
  const filter = async (genreID) => {
    var response = await RetriveData.GetPostByGenre(genreID);
    setBookmark(response);
    setFiltered(response);
    setShowFilter(!showFilter);
  };

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
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 5,
          marginBottom: 30,
        }}
      >
        <View
          style={[
            {
              height: 60,
              width: "75%",
              elevation: 5,
              borderRadius: 10,
              flexDirection: "row",
              paddingLeft: 15,
              alignItems: "center",
            },
            { backgroundColor: colors.Seperator },
          ]}
        >
          <Icon
            name="search"
            size={25}
            style={{ color: colors.Text, marginRight: 20 }}
          />
          <TextInput
            placeholder="Search..."
            placeholderTextColor={colors.LightText}
            style={{
              backgroundColor: colors.Seperator,
              color: colors.Text,
              fontSize: 16,
              height: "100%",
              width: "60%",
              fontFamily: "Regular",
            }}
            value={search}
            onChangeText={updateSearch}
          />
        </View>

        <TouchableOpacity
          onPress={() => setShowFilter(!showFilter)}
          style={[
            {
              height: 60,
              width: 60,
              borderRadius: 10,
              elevation: 5,
              justifyContent: "center",
              alignItems: "center",
            },
            { backgroundColor: colors.Seperator },
          ]}
        >
          <Icon
            name="ios-funnel-outline"
            size={30}
            style={{ color: colors.Text }}
          />
        </TouchableOpacity>
      </View>
      <ModalPopUp
        visible={showFilter}
        onRequestClose={() => setShowFilter(!showFilter)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: colors.Background,
            borderRadius: 30,
          }}
        >
          <View
            style={{
              height: 70,
              backgroundColor: colors.LightPurple,
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 50,
              paddingRight: 30,
              flexDirection: "row",
            }}
          >
            <Text
              style={{
                fontFamily: "Regular",
                color: colors.Text,
                fontSize: 20,
              }}
            >
              Filter By Genre
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowFilter(!showFilter);
              }}
            >
              <View>
                <Icon style={{ color: colors.Text }} name="close" size={30} />
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView
            nestedScrollEnabled
            contentContainerStyle={{
              flexGrow: 1,
              backgroundColor: colors.Background,
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
            showsVerticalScrollIndicator={false}
          >
            {genreList.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => filter(item.genreID)}
                  style={{
                    width: "100%",
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    marginVertical: 5,
                    borderBottomColor: colors.Seperator,
                    borderBottomWidth: 1,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Regular",
                      fontSize: 16,
                      color: colors.Text,
                    }}
                  >
                    {item.genreName}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <TouchableOpacity
            onPress={clearFilter}
            style={{
              height: 70,
              backgroundColor: colors.Seperator,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: colors.Text,
                fontFamily: "Regular",
                fontSize: 16,
              }}
            >
              Clear Filters
            </Text>
          </TouchableOpacity>
        </View>
      </ModalPopUp>
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

export default SearchScreen;
