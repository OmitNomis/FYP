import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import RetriveData from "../service/RetriveData";
import ToastMessage from "../components/Toast";
import colors from "../assets/theme/colors";
import api from "../constants/Api";
import request from "../config/RequestManager";
const Book = (props) => {
  const bookDetails = props.route.params.params.bookDetails;
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const [postGenre, setPostGenre] = useState([]);
  const [myDetails, setMyDetails] = useState([]);
  const [myListing, setMyListing] = useState();
  const [sold, setSold] = useState(bookDetails.sold == 0 ? false : true);
  const [bookmark, setBookmark] = useState();

  useEffect(() => {
    props.navigation.setOptions({
      title: bookDetails.title,
    });
    getUserById();
  }, []);
  const getUserById = async () => {
    var response = await RetriveData.GetUserById(bookDetails.userID);
    if (response != undefined) {
      setUserInfo(response[0]);
      getGenreList();
    } else {
      ToastMessage.Short("Error Loading Customer ");
      getGenreList();
    }
  };
  const getGenreList = async () => {
    var response = await RetriveData.GetGenre();
    if (response != undefined) {
      getPostGenre(response);
    } else {
      ToastMessage.Short("Error Loading Post Genre");
      getPostGenre();
    }
  };
  const getPostGenre = async (list) => {
    var response = await RetriveData.GetPostGenre(bookDetails.postID);
    if (response != undefined) {
      var genre = [];
      response.map((id) => {
        list.map((item) => {
          if (item.genreID == id) {
            genre.push(item.genreName);
          }
        });
      });
      setPostGenre(genre);
      getMyDetails();
    } else {
      ToastMessage.Short("Error Loading Post Genre");
      getMyDetails();
    }
  };
  const getMyDetails = async () => {
    var response = await RetriveData.GetCustomerInfo();
    if (response != undefined) {
      setMyDetails(response);

      if (response.UserId == bookDetails.userID) {
        setMyListing(true);
      } else {
        setMyListing(false);
      }
      getMyBookmarks(response);
    } else {
      ToastMessage.Short("Error Loading details");
      getMyBookmarks(response);
    }
  };
  const getMyBookmarks = async (response) => {
    var response = await RetriveData.GetBookmarks(response.UserId);
    if (response != undefined) {
      var bookmarks = [];
      bookmarks = response.map((item) => item.postID);

      if (bookmarks.includes(bookDetails.postID)) {
        setBookmark(true);
      } else {
        setBookmark(false);
      }
      setLoading(false);
    } else {
      ToastMessage.Short("Error Loading bookmarks");
      setLoading(false);
    }
  };

  const bookCondition = () => {
    if (bookDetails.bookCondition == 1) {
      return "Like New";
    } else if (bookDetails.bookCondition == 2) {
      return "Good";
    } else return "Torn";
  };

  const soldBook = async () => {
    var data = {
      PostId: bookDetails.postID,
    };
    var response = await (await request())
      .post(api.SoldPost, data)
      .catch(function (error) {
        ToastMessage.Short("Error Occured, Try Again");
      });
    if (response != undefined) {
      if (response.data.success == 1) {
        ToastMessage.Short("Successfully marked as Sold");
        setSold(true);
      } else {
        ToastMessage.Short(response.data.Message);
      }
    } else {
      ToastMessage.Short("Error Occured");
    }
  };
  const deletePost = async () => {
    var data = {
      PostId: bookDetails.postID,
    };
    var response = await (await request())
      .post(api.DeletePost, data)
      .catch(function (error) {
        console.log(error);
        ToastMessage.Short("Error Occured, Try Again");
      });
    if (response != undefined) {
      if (response.data.success == 1) {
        ToastMessage.Short("Successfully deleted");
        props.navigation.replace("HomeStack");
      } else {
        ToastMessage.Short(response.data.Message);
      }
    } else {
      ToastMessage.Short("Error Occured");
    }
  };

  const bookmarkHandler = async () => {
    var data = {
      PostId: bookDetails.postID,
      UserId: bookDetails.userID,
    };
    var response;
    if (bookmark == true) {
      response = await (await request())
        .post(api.DeleteBookmark, data)
        .catch(function (error) {
          ToastMessage.Short("Error Occured, Try Again");
        });
    } else {
      response = await (await request())
        .post(api.BookmarkPost, data)
        .catch(function (error) {
          ToastMessage.Short("Error Occured, Try Again");
        });
    }
    if (response != undefined) {
      if (response.data.success == 1) {
        bookmark
          ? ToastMessage.Short("Bookmark Succesfully Removed")
          : ToastMessage.Short("Bookmark Succesfully Added");
        setBookmark(!bookmark);
      } else {
        ToastMessage.Short(response.data.Message);
      }
    } else {
      ToastMessage.Short("Error Occured");
    }
  };

  return (
    loading == false && (
      <View style={{ flex: 1 }}>
        <ScrollView
          nestedScrollEnabled
          contentContainerStyle={styles.container}
        >
          <View style={styles.imageContainer}>
            <Image
              style={{ height: "100%", width: "100%", borderRadius: 10 }}
              source={{ uri: api.BaseUrl + bookDetails.image }}
            />
          </View>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>{bookDetails.title}</Text>
            <Text style={styles.price}>Rs. {bookDetails.price}</Text>
          </View>
          <View style={styles.genreList}>
            {postGenre.map((item) => {
              return (
                <View style={styles.genre}>
                  <Text>{item}</Text>
                </View>
              );
            })}
          </View>
          <View style={styles.customerDetailsContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={styles.profilePicContainer}>
                {/* profile pic */}
              </View>
              <View style={styles.BookcustomerDetails}>
                <View>
                  <Text style={styles.customerName}>
                    {userInfo.firstName + " " + userInfo.lastName}
                  </Text>
                  <Text style={styles.customerPhone}>{userInfo.phone}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ paddingHorizontal: 20, marginBottom: 15 }}>
            <Text
              style={{ fontFamily: "Bold", color: colors.Black, fontSize: 16 }}
            >
              Book Details
            </Text>
          </View>
          <View style={styles.bookDetails}>
            <View style={styles.detail}>
              <Text style={styles.detailText}>
                Author: {bookDetails.author}
              </Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.detailText}>
                Book Condition:{bookCondition()}
              </Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.detailText}>
                Delivery: {bookDetails.delivery == 1 ? "Yes" : "No"}
              </Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.detailText}>
                Location: {bookDetails.location}
              </Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.detailText}>
                Negotiable: {bookDetails.priceType == 1 ? "Yes" : "No"}
              </Text>
            </View>
            <View style={styles.detail}>
              <Text style={styles.detailText}>
                Available for trade: {bookDetails.trade == 0 ? "No" : "Yes"}
              </Text>
            </View>
            {bookDetails.trade == 1 && (
              <View style={styles.detail}>
                <Text style={styles.detailText}>
                  Trade With: {bookDetails.tradeWith}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
        {myListing == false ? (
          <View style={styles.footer}>
            {bookmark == true ? (
              <TouchableOpacity
                style={styles.footerButton}
                onPress={bookmarkHandler}
              >
                <Text style={styles.footerText}>Remove Bookmark</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.footerButton}
                onPress={bookmarkHandler}
              >
                <Text style={styles.footerText}>Add Bookmark</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.footerButton}>
              <Text style={styles.footerText}>Call</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerButton}>
              <Text style={styles.footerText}>Chat now</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.footerButton}
              onPress={() => {
                Alert.alert(
                  "Are You Sure?",
                  "Do you want to delete this post? This action is not reversible.",
                  [
                    {
                      text: "Go Back",
                      style: "cancel",
                    },
                    { text: "Delete", onPress: () => deletePost() },
                  ]
                );
              }}
            >
              <Text style={styles.footerText}>Delete Post</Text>
            </TouchableOpacity>
            {sold == false ? (
              <TouchableOpacity
                style={styles.footerButton}
                onPress={() => {
                  Alert.alert(
                    "Are You Sure?",
                    "Do you want to set this post as Sold? This action is not reversible.",
                    [
                      {
                        text: "Go Back",
                        style: "cancel",
                      },
                      { text: "Mark as Sold", onPress: () => soldBook() },
                    ]
                  );
                }}
              >
                <Text style={styles.footerText}>Mark as Sold</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.footerButton} disabled>
                <Text style={styles.footerText}>Book Sold</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    )
  );
};

export default Book;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.Background,
  },
  imageContainer: {
    height: 250,
    backgroundColor: "red",
    margin: 10,
    marginBottom: 0,
    borderRadius: 10,
  },
  headerContainer: {
    paddingHorizontal: 20,
    marginTop: 15,
  },
  title: {
    fontFamily: "Bold",
    fontSize: 20,
    color: colors.Black,
  },
  price: { fontFamily: "Regular", fontSize: 16, color: colors.Text },
  customerDetailsContainer: {
    borderColor: "#F0F0F0",
    borderWidth: 1,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  profilePicContainer: {
    height: 60,
    width: 60,
    backgroundColor: "red",
    borderRadius: 30,
    marginLeft: 0,
    margin: 10,
  },
  BookcustomerDetails: {},
  customerName: {
    fontFamily: "Bold",
    fontSize: 16,
    color: colors.Black,
  },
  customerPhone: {
    fontFamily: "Regular",
    color: colors.Text,
  },
  genreList: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 30,
    marginTop: 10,
  },
  bookDetails: {
    borderColor: "#F0F0F0",
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  detail: { height: 35 },
  detailText: {
    fontFamily: "Regular",
    fontSize: 14,
  },
  genre: {
    borderRadius: 9,
    height: 40,
    borderWidth: 0.2,
    borderColor: "#F0F0F0",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  footer: {
    flexDirection: "row",
    height: 50,
  },
  footerButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    borderWidth: 1,
    borderColor: colors.Gray,
  },
  footerText: {
    fontFamily: "Regular",
    fontSize: 14,
    color: colors.Text,
  },
});
