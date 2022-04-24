import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import themeContext from "../assets/theme/colorsContext";
import RetriveData from "../service/RetriveData";

const AllGenre = (props) => {
  const colors = useContext(themeContext);
  const [genreList, setGenreList] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    props.navigation.setOptions({
      title: "All Genres",
    });
    getGenres();
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
  return loading == false ? (
    <View style={{ flex: 1, backgroundColor: colors.Background }}>
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
              onPress={() =>
                props.navigation.navigate("GenreScreen", {
                  params: { genre: item },
                })
              }
              style={{
                width: "100%",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                height: 50,
                borderBottomColor: colors.Seperator,
                borderBottomWidth: 1,
              }}
            >
              <Text
                style={{
                  fontFamily: "Regular",
                  fontSize: 20,
                  color: colors.Text,
                }}
              >
                {item.genreName}
              </Text>
            </TouchableOpacity>
          );
        })}
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

export default AllGenre;

const styles = StyleSheet.create({});
