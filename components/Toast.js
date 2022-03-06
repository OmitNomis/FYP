import Toast from "react-native-simple-toast";

const ToastMessage = {
  Long: (message) => {
    Toast.show(message, Toast.LONG);
  },
  Short: (message) => {
    Toast.show(message);
  },
  LongCenter: (message) => {
    Toast.showWithGravity(message, Toast.LONG, Toast.CENTER);
  },
};

export default ToastMessage;
