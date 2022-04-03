import request from "../config/RequestManager";
import { useState } from "react";
import api from "../constants/Api";
import ToastMessage from "../components/Toast";
import DeviceStorage from "../config/DeviceStorage";

const RetriveData = {
  GetGenre: async function GetGenre() {
    var response = await (await request())
      .get(api.GetGenres)
      .catch(function (error) {
        console.log(error);
        ToastMessage.Short("Error loading Genre");
      });
    return response.data.data;
  },
  GetUserById: async function GetUserById(id) {
    var response = await (await request())
      .get(api.GetUserById + "/" + id)
      .catch(function (error) {
        console.log(error);
        ToastMessage.Short("Error loading User Info");
      });
    return response.data.data;
  },
  GetPostByID: async function GetPostByID(id) {
    var response = await (await request())
      .get(api.GetPostByID + "/" + id)
      .catch(function (error) {
        console.log(error);
        ToastMessage.Short("Error Loading Post information");
      });
    return response.data.data;
  },
  GetPostGenre: async function GetPostGenre(id) {
    var response = await (await request())
      .get(api.GetPostGenre + "/" + id)
      .catch(function (error) {
        console.log(error);
        ToastMessage.Short("Error loading Post Genre");
      });
    var genreId = [];
    genreId = response.data.data.map((item) => item.genreID);
    return genreId;
  },
  GetSoldList: async function GetSoldList(id) {
    var response = await (await request())
      .get(api.GetSoldPosts + "/" + id)
      .catch(function (error) {
        console.log(error);
        ToastMessage.Short("Error");
      });
    if (response.data.success == 0) {
      return [];
    } else {
      return response.data.data;
    }
  },
  GetBookmarks: async function GetBookmarks(id) {
    var response = await (await request())
      .get(api.GetBookmarks + "/" + id)
      .catch(function (error) {
        console.log(error);
        ToastMessage.Short("Error");
      });
    if (response.data.success == 0) {
      return [];
    } else {
      return response.data.data;
    }
  },
  GetPosts: async function GetPosts() {
    var response = await (await request())
      .get(api.GetAllPosts)
      .catch(function (error) {
        console.log(error);
        ToastMessage.Short("Error loading Posts");
      });
    return response.data;
  },
  GetCustomerInfo: async function GetCustomerInfo() {
    var userInfo = await DeviceStorage.getKey("UserInfo");
    if (userInfo != null) {
      return JSON.parse(userInfo);
    }
  },
};
export default RetriveData;
