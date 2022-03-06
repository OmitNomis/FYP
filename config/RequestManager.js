import axios from "axios";
import DeviceStorage from "./DeviceStorage";
import TokenManager from "./TokenManager";
class RequestManager {
  async buildRequest() {
    // await TokenManager.restoreNewToken();
    const request = axios.create();
    const access_token = await DeviceStorage.getKey("token");
    request.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    request.defaults.headers.common["Content-Type"] =
      "application/x-www-form-urlencoded";
    request.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    return request;
  }
}
export default new RequestManager().buildRequest;
