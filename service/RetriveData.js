import request from "../config/RequestManager";
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
