/* eslint-disable react-native/no-inline-styles */
import {
  Modal,
  TouchableWithoutFeedback,
  View,
  StyleSheet,
} from "react-native";
import PropTypes from "prop-types";
import React from "react";
import colors from "../assets/theme/colors";

const ModalPopUp = ({
  onRequestClose,
  visible,
  children,
  containerStyle,
  animationType,
  onShow,
  full,
  height,
}) => {
  return (
    <Modal
      animationType={animationType ? animationType : "slide"}
      transparent
      visible={visible}
      onRequestClose={onRequestClose}
      style={{
        justifyContent: "flex-end",
        margin: 0,
      }}
      onShow={onShow}
    >
      <View
        style={{
          flex: full ? 0 : height ? 1 - height : 0.3,
          //   backgroundColor: "rgba(0,0,0,0.5)",
        }}
      >
        <TouchableWithoutFeedback onPress={onRequestClose}>
          <View style={{ flex: 1, backgroundColor: "transparent" }} />
        </TouchableWithoutFeedback>
      </View>

      <View
        style={{
          flex: full ? 1 : height ? height : 0.7,
          backgroundColor: "#fff",
          borderTopRightRadius: full ? 0 : 50,
          borderTopLeftRadius: full ? 0 : 50,
          zIndex: 10,
        }}
      >
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalStyle: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

ModalPopUp.defaultProps = {
  visible: false,
  animationType: "fade",
};

ModalPopUp.propTypes = {
  onPress: PropTypes.func,
  onRequestClose: PropTypes.func,
  visible: PropTypes.bool.isRequired,
};

export default ModalPopUp;
