import { StyleSheet } from "react-native";

const profilePictureSize: number = 79;
export const buttonHeight: number = 31;
export const buttonWidth: number = 93;

export const styles = StyleSheet.create({
  profilePicture: {
    height: profilePictureSize,
    width: profilePictureSize,
    borderRadius: profilePictureSize / 2,
  },
});
