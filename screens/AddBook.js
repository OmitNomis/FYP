import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Switch,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
// import colors from "../assets/theme/colors";
import { Dropdown } from "react-native-element-dropdown";

import TextBoxOutline from "../components/TextBoxOutline";
import CustomButton from "../components/CustomButton";
import RetriveData from "../service/RetriveData";
import api from "../constants/Api";
import ToastMessage from "../components/Toast";
import request from "../config/RequestManager";
import Uuid from "react-native-uuid";
// import SelectBox from "react-native-multi-selectbox";
import MultiSelect from "react-native-multiple-select";
import { xorBy } from "lodash";
import * as ImagePicker from "expo-image-picker";
import themeContext from "../assets/theme/colorsContext";

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
          name: list.genreName,
        };
      });
      setGenreList(arr);
    } else {
      ToastMessage.Short("Error Loading Genre List ");
    }
  };

  const colors = useContext(themeContext);
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
  const [imageError, setImageError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [authorError, setAuthorError] = useState(false);

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
    if (!image) {
      isValid = false;
      setImageError(true);
    }
    if (title.trim() === "") {
      isValid = false;
    }
    if (author.trim() === "") {
      isValid = false;
    }
    if (price.trim() === "") {
      isValid = false;
    }
    if (location.trim() === "") {
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
        post(data.data.split("\\")[1]);
      })
      .catch((err) => {
        console.log("err" + err);
      });
    console.log(selectedGenre);
  };

  const post = async (imagePath) => {
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
      GenreId: selectedGenre,
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
  const styles = StyleSheet.create({
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
      backgroundColor: colors.Seperator,
      borderColor: colors.Purple,
      alignSelf: "center",
      justifyContent: "center",
      alignItems: "center",
    },
    icon: {
      marginRight: 5,
    },
    placeholderStyle: {
      fontSize: 16,
      fontFamily: "Regular",
      color: colors.LightText,
    },
    selectedTextStyle: {
      fontSize: 16,
      fontFamily: "Regular",
      color: colors.Text,
    },
  });
  return (
    <KeyboardAvoidingView
      behavior="height"
      style={{ flex: 1, backgroundColor: colors.Background }}
    >
      <ScrollView
        nestedScrollEnabled
        contentContainerStyle={{
          paddingBottom: 30,
          flexGrow: 1,
          paddingHorizontal: 30,
          paddingTop: 20,
          backgroundColor: colors.Background,
        }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.addImageSection}>
          <View style={{ marginBottom: 20 }}>
            <TouchableOpacity style={styles.imageUpload} onPress={pickImage}>
              {!image ? (
                <Text
                  style={{
                    fontFamily: "Regular",
                    fontSize: 16,
                    color: colors.LightText,
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
        {imageError ? (
          <View>
            <Text
              style={{
                marginBottom: 10,
                color: "red",
                fontFamily: "Regular",
                alignSelf: "center",
              }}
            >
              Please Select an image
            </Text>
          </View>
        ) : (
          <></>
        )}
        <View style={styles.form}>
          <TextBoxOutline
            placeholder="Book Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          {titleError ? (
            <View>
              <Text
                style={{
                  marginBottom: 10,
                  color: "red",
                  fontFamily: "Regular",
                  alignSelf: "center",
                }}
              >
                Please Enter a book title.
              </Text>
            </View>
          ) : (
            <></>
          )}
          <TextBoxOutline
            placeholder="Author"
            value={author}
            onChangeText={(text) => setAuthor(text)}
          />
          <MultiSelect
            items={genreList}
            uniqueKey="id"
            onSelectedItemsChange={(selected) => setSelectedGenre(selected)}
            selectedItems={selectedGenre}
            selectText="Select Genre"
            searchInputPlaceholderText="Search Genre..."
            altFontFamily="Regular"
            selectedItemTextColor={colors.Primary}
            selectedItemIconColor={colors.Primary}
            itemTextColor={colors.Text}
            itemFontFamily="Regular"
            selectedItemFontFamily="Regular"
            displayKey="name"
            submitButtonColor={colors.Primary}
            submitButtonText="Submit"
            tagRemoveIconColor={colors.Purple}
            tagBorderColor={colors.Purple}
            tagTextColor={colors.Text}
            styleDropdownMenu={{
              backgroundColor: colors.Seperator,
              borderRadius: 8,
              paddingLeft: 20,
              height: 50,
              marginBottom: 8,
              alignItems: "center",
              marginTop: 5,
              color: colors.Text,
            }}
            styleDropdownMenuSubsection={{
              height: "100%",
              backgroundColor: colors.Seperator,
              borderRadius: 8,
              borderBottomWidth: 0,
            }}
            styleInputGroup={{
              backgroundColor: colors.Seperator,
              height: 50,
              marginTop: 5,
              borderRadius: 8,
            }}
            styleItemsContainer={{
              maxHeight: 200,
              backgroundColor: colors.Seperator,
            }}
            textColor={colors.Text}
          />
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TextBoxOutline
              placeholder="Price"
              half
              keyboardType={"numeric"}
              value={price}
              onChangeText={(text) => setPrice(text)}
            />
            <Dropdown
              style={{
                height: 50,
                backgroundColor: colors.Seperator,
                borderRadius: 8,
                width: "48%",
                marginVertical: 6,
                paddingLeft: 20,
                paddingRight: 10,
              }}
              containerStyle={{
                backgroundColor: colors.Seperator,
              }}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              placeholder="Price Type"
              data={priceType}
              maxHeight={130}
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
              style={{
                height: 50,
                backgroundColor: colors.Seperator,
                borderRadius: 8,
                width: "48%",
                marginVertical: 6,
                paddingLeft: 20,
                paddingRight: 10,
              }}
              containerStyle={{
                backgroundColor: colors.Seperator,
              }}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              placeholder="Delivery"
              data={delivery}
              maxHeight={130}
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
              style={{
                height: 50,
                backgroundColor: colors.Seperator,
                borderRadius: 8,
                width: "48%",
                marginVertical: 6,
                paddingLeft: 20,
                paddingRight: 10,
              }}
              containerStyle={{
                backgroundColor: colors.Seperator,
              }}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              placeholder="Condition"
              data={condition}
              maxHeight={180}
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
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Regular",
                  color: colors.Text,
                }}
              >
                Open for Trade
              </Text>
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
          <CustomButton
            title="Post"
            onPress={() => {
              if (validateForm()) {
                uploadImage();
              }
            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddBook;
