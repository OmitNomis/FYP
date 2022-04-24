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
  Linking,
  ActivityIndicator,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState, useEffect, useContext, useRef } from "react";
import RetriveData from "../service/RetriveData";
import ToastMessage from "../components/Toast";
// import colors from "../assets/theme/colors";
import api from "../constants/Api";
import request from "../config/RequestManager";
import themeContext from "../assets/theme/colorsContext";
import ModalPopUp from "../components/Modal";
import Icon from "react-native-vector-icons/Ionicons";
import Api from "../constants/Api";
import Comment from "../components/Comment";
const Book = (props) => {
  const bookDetails = props.route.params.params.bookDetails;
  const scrollView = useRef();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState();
  const [postGenre, setPostGenre] = useState([]);
  const [myDetails, setMyDetails] = useState([]);
  const [myListing, setMyListing] = useState();
  const [sold, setSold] = useState(bookDetails.sold == 0 ? false : true);
  const [bookmark, setBookmark] = useState();
  const [postComments, setPostComments] = useState([]);
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    props.navigation.setOptions({
      title: bookDetails.title,
    });
    getUserById();
  }, []);
  const colors = useContext(themeContext);
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
      // setLoading(false);
      getPostComments();
    } else {
      ToastMessage.Short("Error Loading bookmarks");
      // setLoading(false);
      getPostComments();
    }
  };
  const getPostComments = async () => {
    var response = await RetriveData.GetPostComments(bookDetails.postID);
    if (response != undefined) {
      setPostComments(response);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  const submitComment = async () => {
    var currentDate = new Date();
    var data = {
      Comment: comment,
      CommenterId: myDetails.UserId,
      PostId: bookDetails.postID,
      CommentTime: currentDate,
    };
    var response = await (await request())
      .post(Api.AddComment, data)
      .catch(function (error) {
        console.log(error);
        ToastMessage.Short("Error Occured, Try again");
      });
    if (response != undefined) {
      if (response.data.success == "1") {
        getPostComments();
        setComment("");
      }
    } else {
      ToastMessage.Short("Error Occured While Making Comment");
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
      UserId: myDetails.UserId,
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

  const dialCall = () => {
    let phoneNumber = userInfo.phone;
    let call = "";

    if (Platform.OS === "android") {
      call = "tel:${" + phoneNumber + "}";
    } else {
      call = "telprompt:${" + phoneNumber + "}";
    }

    Linking.openURL(call);
  };
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.Background,
    },
    imageContainer: {
      height: 250,
      margin: 10,
      marginBottom: 0,
      borderRadius: 10,
    },
    headerContainer: {
      paddingHorizontal: 20,
      marginTop: 15,
    },
    addBall: {
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 32.5,
      position: "absolute",
      right: 10,
      bottom: 60,
      opacity: 0.7,
    },
    title: {
      fontFamily: "Bold",
      fontSize: 20,
      color: colors.Text,
    },
    price: { fontFamily: "Regular", fontSize: 16, color: colors.LightText },
    customerDetailsContainer: {
      borderColor: colors.Seperator,
      borderWidth: 0.3,
      paddingHorizontal: 20,
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 20,
    },
    profilePicContainer: {
      height: 60,
      width: 60,
      borderRadius: 30,
      marginLeft: 0,
      margin: 10,
    },
    BookcustomerDetails: {},
    customerName: {
      fontFamily: "Bold",
      fontSize: 16,
      color: colors.Text,
    },
    customerPhone: {
      fontFamily: "Regular",
      color: colors.LightText,
    },
    genreList: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      paddingHorizontal: 30,
      marginTop: 10,
      flexWrap: "wrap",
    },
    bookDetails: {
      borderColor: colors.Seperator,
      borderWidth: 0.3,
      paddingHorizontal: 20,
      paddingTop: 20,
    },
    detail: { height: 35 },
    detailText: {
      fontFamily: "Regular",
      fontSize: 14,
      color: colors.LightText,
    },
    genre: {
      borderRadius: 20,
      height: 40,
      borderWidth: 1,
      borderColor: colors.Seperator,
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
      borderWidth: 0.3,
      backgroundColor: colors.Seperator,
    },
    footerText: {
      fontFamily: "Regular",
      fontSize: 14,
      color: colors.Text,
    },
  });

  return loading == false ? (
    <View style={{ flex: 1 }}>
      <ScrollView nestedScrollEnabled contentContainerStyle={styles.container}>
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
          {postGenre.map((item, index) => {
            return (
              <View key={index} style={styles.genre}>
                <Text
                  style={{
                    color: colors.LightText,
                    fontFamily: "Regular",
                    fontSize: 14,
                  }}
                >
                  {item}
                </Text>
              </View>
            );
          })}
        </View>
        <View style={styles.customerDetailsContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.profilePicContainer}>
              <Image
                style={{ height: "100%", width: "100%", borderRadius: 30 }}
                source={{ uri: api.BaseUrl + userInfo.profileImage }}
              />
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
        <View
          style={{
            paddingHorizontal: 50,
            marginBottom: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              style={{ fontFamily: "Bold", color: colors.Text, fontSize: 16 }}
            >
              Book Details
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setShowComments(!showComments);
            }}
          >
            <View>
              <Text
                style={{ fontFamily: "Bold", color: colors.Text, fontSize: 16 }}
              >
                See Comments
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.bookDetails}>
          <View style={styles.detail}>
            <Text style={styles.detailText}>Author: {bookDetails.author}</Text>
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
      <ModalPopUp
        full
        visible={showComments}
        onPress={() => {}}
        onRequestClose={() => {
          setShowComments(!showComments);
        }}
      >
        <View style={{ flex: 1, backgroundColor: colors.Background }}>
          <View
            style={{
              height: 70,
              backgroundColor: colors.Seperator,
              alignItems: "center",
              justifyContent: "space-between",
              paddingHorizontal: 50,
              paddingRight: 30,
              flexDirection: "row",
            }}
          >
            <Text
              style={{ fontFamily: "Bold", color: colors.Text, fontSize: 23 }}
            >
              Comments
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowComments(!showComments);
              }}
            >
              <View>
                <Icon style={{ color: colors.Text }} name="close" size={30} />
              </View>
            </TouchableOpacity>
          </View>
          <KeyboardAvoidingView style={{ flex: 1 }}>
            {postComments.length == 0 ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  flex: 1,
                  backgroundColor: colors.backgroundColor,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Regular",
                    color: colors.Text,
                    fontSize: 23,
                  }}
                >
                  No Comments Yet...
                </Text>
              </View>
            ) : (
              <ScrollView
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  flexGrow: 1,
                  paddingHorizontal: 20,
                  justifyContent: "flex-end",
                }}
                onContentSizeChange={() =>
                  scrollView.current.scrollToEnd({ animated: true })
                }
                ref={(ref) => (scrollView.current = ref)}
              >
                {postComments.map((comment) => {
                  return (
                    <Comment
                      key={comment.commentID}
                      userId={comment.commenterID}
                      comment={comment.comment}
                      time={comment.commentTime}
                    />
                  );
                })}
              </ScrollView>
            )}
            <View
              style={{
                height: 80,
                backgroundColor: colors.Seperator,
                flexDirection: "row",
                borderRadius: 20,
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <View style={{ width: "80%", paddingLeft: 20 }}>
                <TextInput
                  placeholder="Add a Comment..."
                  value={comment}
                  onChangeText={(text) => setComment(text)}
                  placeholderTextColor={colors.LightText}
                  onSubmitEditing={submitComment}
                  style={{
                    height: 60,
                    fontSize: 16,
                    fontFamily: "Regular",
                    color: colors.Text,
                  }}
                  onFocus={() =>
                    scrollView.current.scrollToEnd({ animated: true })
                  }
                />
              </View>
              <TouchableOpacity
                onPress={submitComment}
                style={{
                  width: "20%",
                  alignItems: "center",
                }}
              >
                <Icon name={"send"} size={25} style={{ color: colors.Text }} />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ModalPopUp>
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
          <TouchableOpacity style={styles.footerButton} onPress={dialCall}>
            <Text style={styles.footerText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={() =>
              props.navigation.navigate("ChatMessage", {
                params: {
                  userID: userInfo.userID,
                  firstName: userInfo.firstName,
                  lastName: userInfo.lastName,
                  profileImage: userInfo.profileImage,
                },
              })
            }
          >
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

export default Book;
