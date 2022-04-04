import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import colors from "../assets/theme/colors";
import { Dropdown } from "react-native-element-dropdown";

import TextBoxOutline from "../components/TextBoxOutline";
import CustomButton from "../components/CustomButton";
import RetriveData from "../service/RetriveData";
import api from "../constants/Api";
import ToastMessage from "../components/Toast";
import request from "../config/RequestManager";
import Uuid from "react-native-uuid";
import SelectBox from "react-native-multi-selectbox";
import { xorBy } from "lodash";
import * as ImagePicker from "expo-image-picker";

const priceType = [
  { label: "Negotiable", value: "1" },
  { label: "Non-Negotiable", value: "2" },
];
const delivery = [
  { label: "Yes", value: "1" },
  { label: "No", value: "2" },
];
const condition = [
  { label: "Like New", value: "1" },
  { label: "Good", value: "2" },
  { label: "Torn", value: "3" },
];
const AddBook = (props) => {
  useEffect(() => {
    props.navigation.setOptions({
      title: "Add a Post",
    });
    setUuid(Uuid.v4());
    getUserInfo();
    getGenres();
  }, []);

  const getUserInfo = async () => {
    var response = await RetriveData.GetCustomerInfo();
    if (response != undefined) {
      setUserInfo(response);
    } else {
      ToastMessage.Short("Error Loading Customer ");
    }
  };
  const getGenres = async () => {
    var response = await RetriveData.GetGenre();
    if (response != undefined) {
      var arr = response.map((list) => {
        return {
          id: list.genreID,
          item: list.genreName,
        };
      });
      setGenreList(arr);
    } else {
      ToastMessage.Short("Error Loading Genre List ");
    }
  };

  const [uuid, setUuid] = useState();
  const [userInfo, setUserInfo] = useState();

  const [genreList, setGenreList] = useState();
  const [selectedGenre, setSelectedGenre] = useState([]);

  const [priceTypeValue, setPriceTypeValue] = useState(null);
  const [priceTypeFocused, setPriceTypeFocused] = useState(false);

  const [deliveryValue, setDeliveryValue] = useState(null);
  const [deliveryFocused, setDeliveryFocused] = useState(false);

  const [conditionValue, setConditionValue] = useState(null);
  const [conditionFocused, setConditionFocused] = useState(false);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [author, setAuthor] = useState("");
  const [trade, setTrade] = useState(false);
  const [price, setPrice] = useState("");
  const [tradeWith, setTradeWith] = useState("");
  const [image, setImage] = useState();
  const [errorMessage, setErrorMessage] = useState(false);

  const selectGenreHandler = () => {
    return (item) => {
      setSelectedGenre(xorBy(selectedGenre, [item], "id"));
    };
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result);
    }
  };
  const validateForm = () => {
    let isValid = true;
    if (title.trim() === "") {
      isValid = false;
    }
    if (author.trim() === "") {
      isValid = false;
    }
    if (price.trim() === "") {
      isValid = false;
    }
    if (priceTypeValue == null) {
      isValid = false;
    }
    if (conditionValue == null) {
      isValid = false;
    }
    if (deliveryValue == null) {
      isValid = false;
    }
    if (trade) {
      if (tradeWith.trim() === "") {
        isValid = false;
      }
    }
    return isValid;
  };
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", {
      name: image.fileName || image.uri.substr(image.uri.lastIndexOf("/") + 1),
      uri: image.uri,
      type: "image/jpg",
    });

    const config = {
      body: formData,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    };
    var link = api.BaseUrl + "api/upload";

    fetch(link, config)
      .then((res) => res.json())
      .then((data) => {
        post(data.data);
      })
      .catch((err) => {
        console.log("err" + err);
      });
  };

  const post = async (imagePath) => {
    var genreId = [];
    genreId = selectedGenre.map((item) => item.id);

    var tradeId;
    if (trade == true) {
      tradeId = 1;
    } else {
      tradeId = 0;
    }
    var data = {
      PostId: uuid,
      Title: title,
      Author: author,
      Price: price,
      PriceType: priceTypeValue,
      Delivery: deliveryValue,
      BookCondition: conditionValue,
      Location: location,
      Trade: tradeId,
      TradeWith: tradeWith,
      GenreId: genreId,
      Sold: 0,
      UserId: userInfo.UserId,
      Image: imagePath,
      PostDate: new Date(),
    };
    var response = await (await request())
      .post(api.AddPost, data)
      .catch(function (error) {
        console.log(error);
        ToastMessage.Short("Error Occured Contact Support");
      });
    if (response != undefined) {
      if (response.data.success == "1") {
        ToastMessage.Short("Post made succesfully");
        props.navigation.replace("HomeStack");
      }
    } else {
      ToastMessage.Short("Error Occured While Making Post");
      setUuid(Uuid.v4());
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: colors.Background }}>
      <ScrollView nestedScrollEnabled style={styles.container}>
        <View style={styles.addImageSection}>
          <View style={styles.addImage}>
            <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
              {!image ? (
                <Text
                  style={{
                    fontFamily: "Regular",
                    fontSize: 16,
                    color: colors.Gray,
                  }}
                >
                  Upload Image
                </Text>
              ) : (
                <Image
                  style={{ height: "100%", width: "100%", borderRadius: 100 }}
                  source={{ uri: image.uri }}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.form}>
          <TextBoxOutline
            placeholder="Book Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextBoxOutline
            placeholder="Author"
            value={author}
            onChangeText={(text) => setAuthor(text)}
          />
          <SelectBox
            label={""}
            options={genreList}
            selectedValues={selectedGenre}
            onMultiSelect={selectGenreHandler()}
            onTapClose={selectGenreHandler()}
            inputPlaceholder={"Select Genre"}
            keyboardShouldPersistTaps="always"
            isMulti
            containerStyle={{
              backgroundColor: "#F0F0F0",
              borderRadius: 8,
              paddingLeft: 20,
              height: 50,
              paddingTop: 15,
              marginBottom: 8,
              alignItems: "center",
              borderBottomWidth: 0,
              marginTop: 5,
            }}
            labelStyle={{
              fontSize: 0,
            }}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TextBoxOutline
              placeholder="Price"
              half
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              placeholder="Price Type"
              data={priceType}
              maxHeight={300}
              labelField="label"
              valueField="value"
              value={priceTypeValue}
              onFocus={() => setPriceTypeFocused(true)}
              onBlur={() => setPriceTypeFocused(false)}
              onChange={(item) => {
                setPriceTypeValue(item.value);
                setPriceTypeFocused(false);
              }}
            />
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              placeholder="Delivery"
              data={delivery}
              maxHeight={300}
              labelField="label"
              valueField="value"
              value={deliveryValue}
              onFocus={() => setDeliveryFocused(true)}
              onBlur={() => setDeliveryFocused(false)}
              onChange={(item) => {
                setDeliveryValue(item.value);
                setDeliveryFocused(false);
              }}
            />
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              placeholder="Condition"
              data={condition}
              maxHeight={300}
              labelField="label"
              valueField="value"
              value={conditionValue}
              onFocus={() => setConditionFocused(true)}
              onBlur={() => setConditionFocused(false)}
              onChange={(item) => {
                setConditionValue(item.value);
                setConditionFocused(false);
              }}
              v
            />
          </View>
          <TextBoxOutline
            placeholder="City (eg:  Kathmandu, Butwal)"
            value={location}
            onChangeText={(text) => setLocation(text)}
          />
          <View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Switch
                trackColor={{ false: colors.Primary, true: colors.Gray }}
                thumbColor={trade ? colors.Primary : colors.Gray}
                onValueChange={() => {
                  setTrade(!trade);
                }}
                value={trade}
              />
              <Text>Open for Trade</Text>
            </View>
            {trade == true && (
              <TextBoxOutline
                placeholder="Trade With"
                value={tradeWith}
                onChangeText={(text) => setTradeWith(text)}
              />
            )}
          </View>
        </View>
        <View style={{ marginTop: 20 }}>
          {errorMessage ? (
            <View>
              <Text
                style={{
                  marginBottom: 10,
                  color: "red",
                  fontFamily: "Regular",
                }}
              >
                Please fill up all fields
              </Text>
            </View>
          ) : (
            <></>
          )}
          <CustomButton
            title="Post"
            onPress={() => {
              if (validateForm()) {
                setErrorMessage(false);
                uploadImage();
              } else {
                setErrorMessage(true);
              }
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddBook;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingTop: 20,
    backgroundColor: colors.Background,
  },
  text: {
    textAlign: "justify",
    fontFamily: "Regular",
    fontSize: 16,
  },
  imageUpload: {
    height: 150,
    width: 150,
    borderRadius: 100,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.Gray,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  dropdown: {
    height: 50,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
    width: "48%",
    marginVertical: 6,
    paddingLeft: 20,
    paddingRight: 10,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: "Regular",
    color: colors.Text,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: "Regular",
    color: colors.Text,
  },
});
