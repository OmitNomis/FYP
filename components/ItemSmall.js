import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useContext } from "react";
// import colors from "../assets/theme/colors";
import Api from "../constants/Api";
import themeContext from "../assets/theme/colorsContext";

const ItemSmall = (props) => {
  const bookDetails = props.item;
  const colors = useContext(themeContext);
  const styles = StyleSheet.create({
    container: {
      width: 130,
      backgroundColor: colors.Background,
      marginRight: 15,
      marginVertical: 20,
    },
    imageContainer: {
      height: 150,
      width: 130,
      backgroundColor: "red",
      borderRadius: 12,
    },
    image: {
      height: "100%",
      width: "100%",
      borderRadius: 12,
    },
    titleContainer: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
    },
    title: {
      fontFamily: "Bold",
      fontSize: 14,
      color: colors.Text,
    },
    authorContainer: {
      justifyContent: "center",
      alignItems: "center",
    },
    author: {
      fontFamily: "Regular",
      fontSize: 14,
      color: colors.LightText,
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        props.navigation.navigate("Book", {
          params: { name: "BookDetails", bookDetails },
        })
      }
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: Api.BaseUrl + "/" + bookDetails.image }}
        />
      </View>
      <View style={styles.details}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {props.item.title}
          </Text>
        </View>
        <View style={styles.authorContainer}>
          <Text style={styles.author}>{props.item.author}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemSmall;
