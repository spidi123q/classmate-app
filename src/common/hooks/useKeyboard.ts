import { useState, useEffect } from "react";
import { Keyboard } from "react-native";

export default function useKeyBoard() {
    const [isKeyBoardActive, setIsKeyBoardActive] = useState<boolean>(false);

    useEffect(() => {
      Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
  
      // cleanup function
      return () => {
        Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
      };
    }, []);
  
    const _keyboardDidShow = () => {
      setIsKeyBoardActive(true);
    };
  
    const _keyboardDidHide = () => {
      setIsKeyBoardActive(false);
    };

    return isKeyBoardActive;
}