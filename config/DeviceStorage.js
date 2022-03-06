import AsyncStorage from "@react-native-async-storage/async-storage";

const DeviceStorage = {
  saveKey: async (key, valueToSave) => {
    try {
      await AsyncStorage.setItem(key, valueToSave);
    } catch (error) {
      console.log("AsyncStorage Error: " + error.message);
    }
  },

  getKey: async (key) => {
    return await AsyncStorage.getItem(key)
      .then((response) => response)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error(error);
      });
  },

  deleteKey: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log("AsyncStorage Error: " + error.message);
    }
  },
  clearToken: async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("refreshtoken");
      // await AsyncStorage.removeItem("UserAccountsInfo");
      // await AsyncStorage.removeItem("UserInfo");

      //WalkThrough
    } catch (error) {}
  },
  // clearAllKey: async () => {
  //   try {
  //     await AsyncStorage.clear();
  //   } catch (error) {
  //     console.log('AsyncStorage Error: ' + error.message);
  //   }
  // },
};

export default DeviceStorage;
