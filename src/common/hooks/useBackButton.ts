import { useEffect, useState } from "react";
import { BackHandler } from "react-native";

export default function useBackButton(onBack: () => any) {
  useEffect(() => {
    const backAction = () => {
      console.log("backAction -> backAction");
      onBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
}
