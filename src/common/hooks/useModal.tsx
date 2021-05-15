import React, { useEffect, useState } from "react";
import { BackHandler, Modal as NativeModal } from "react-native";
import useBackButton from "./useBackButton";

export default function useModal(
  animationType: "slide" | "none" | "fade" = "slide",
  onRequestClose?: () => void
) {
  const [modalVisible, setModalVisible] = useState(false);

  const open = () => setModalVisible(true);
  const close = () => setModalVisible(false);

  const Modal: React.FunctionComponent = ({ children }) => (
    <NativeModal
      animationType={animationType}
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        onRequestClose && onRequestClose();
        close();
      }}
    >
      {children}
    </NativeModal>
  );

  return {
    open,
    close,
    Modal,
    modalVisible,
  };
}
