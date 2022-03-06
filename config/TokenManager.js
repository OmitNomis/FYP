import jwt_decode from "jwt-decode";
import axios from "axios";
import NetInfo from "@react-native-community/netinfo";
import TokenConfig from "./TokenConfig";
import { endPoints } from "../constants/Api";
import ToastMessage from "../components/Toast";
import DeviceStorage from "./DeviceStorage";
import qs from "qs";
const TokenManager = {
  restoreNewToken: async () => {
    const modelData = {
      client_id: TokenConfig.client_id,
      client_secret: TokenConfig.client_secret,
      grant_type: TokenConfig.grant_type,
    };
    const token = await DeviceStorage.getKey("token");
    const login_flag = await DeviceStorage.getKey("isloggedIn");
    const current_time = new Date().getTime() / 1000;
    if (login_flag === "true") {
      //USER IS LOGIN
      const jwt = jwt_decode(token);
      if (current_time > jwt.exp) {
        try {
          //IF LOGIN ACCESS TOKEN IS EXPIRED
          const refresh_token = await DeviceStorage.getKey("refresh_token");

          var res = await axios.post(
            endPoints.RefreshToken,
            qs.stringify({ RefreshToken: refresh_token })
          );
          let data = await res.data;
          if (data.error === "invalid refresh token") {
            //IF INVALID REFRESH TOKEN: CLEAR ALL SAVED DATA AND GENERATE NEW ACCESS TOKEN
            await DeviceStorage.clearToken();
            var res = await axios.post(
              endPoints.GetTemporaryToken,
              qs.stringify(modelData)
            );
            let data = await res.data;
            await DeviceStorage.saveKey("token", data.access_token);

            return true;
          } else {
            //ELSE GENERATE NEW ACCESS TOKEN FOR LOGIN USER: IF REFRESH TOKEN IS EXPIRED
            var res = await axios.post(
              endPoints.GetTemporaryToken,
              qs.stringify(modelData)
            );
            let data = await res.data;
            await DeviceStorage.saveKey("token", data.access_token);
            return true;
          }
        } catch (error) {
          return false;
        }
      } else {
        //IF LOGIN TOKEN NOT EXPIRED: DO NOTHING
        return true;
      }
    } else {
      /**
       * if user is not login
       */
      if (token === null) {
        var res = await axios.post(
          endPoints.GetTemporaryToken,
          qs.stringify(modelData)
        );
        let data = await res.data;
        await DeviceStorage.saveKey("token", data.access_token);
        return true;
      } else {
        try {
          const jwt = jwt_decode(token);
          if (current_time > jwt.exp) {
            //GENERATE NEW TEMPORARY TOKEN IF EXPIRED
            var res = await axios.post(
              endPoints.GetTemporaryToken,
              qs.stringify(modelData)
            );
            let data = await res.data;
            await DeviceStorage.saveKey("token", data.access_token);
            return true;
          } else {
            //IF TEMPORARY TOKEN IS NOT EXPIRED
            return true;
          }
        } catch (error) {
          return false;
        }
      }
    }
  },
  clearAndRestoreNewToken: async () => {
    try {
      await DeviceStorage.clearToken();
      const modelData = {
        client_id: TokenConfig.client_id,
        client_secret: TokenConfig.client_secret,
        grant_type: TokenConfig.grant_type,
      };

      var res = await axios.post(
        endPoints.GetTemporaryToken,
        qs.stringify(modelData)
      );
      let data = await res.data;
      await DeviceStorage.saveKey("token", data.access_token);

      if (data) {
        await DeviceStorage.saveKey("token", data.access_token);
        return true;
      }
    } catch (error) {
      NetInfo.fetch().then((state) => {
        if (!state.isConnected) {
          ToastMessage.Short("Internet Connection Error");
        }
      });
      return false;
    }
  },
};

export default TokenManager;
