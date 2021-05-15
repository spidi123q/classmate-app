import React, { useEffect, useRef } from "react";
import { Image, View, StyleSheet, FlatList } from "react-native";
import Ripple from "react-native-material-ripple";
import {
  DefaultThumbnailSize,
  DefaultBorderRadius,
  DefaultMargin,
  DefaultBackgroundColor,
} from "../config/themeConfig";
import AddImageIcon from "../assets/AddImage.svg";
import { isNil, reverse } from "lodash";
import { Pie } from "react-native-progress";
import { AppTheme } from "../config/custom-theme";

interface IProps {
  uriList: string[];
  readonly?: boolean;
  progressList?: number[];
  onLongPressImage?: (url: string) => any;
  onAddImagePress: () => any;
}

export default function ImagePicker(props: IProps) {
  const {
    readonly,
    onLongPressImage,
    onAddImagePress,
    uriList,
    progressList,
  } = props;
  const imageListRef = useRef<FlatList>(null);
  const renderItem = ({ item }: any) => {
    return (
      <Item
        onLongPressImage={() => onLongPressImage && onLongPressImage(item)}
        uri={item}
        progress={progressList && progressList[uriList.indexOf(item)]}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={imageListRef}
        style={styles.container}
        data={reverse(uriList)}
        horizontal
        renderItem={renderItem}
        keyExtractor={(item) => item}
        ListHeaderComponent={
          readonly
            ? undefined
            : () => <AddImage onAddImagePress={onAddImagePress} />
        }
      />
    </View>
  );
}

interface ItemProps {
  uri: string;
  progress?: number;
  onLongPressImage?: () => any;
}

const Item = ({ uri, onLongPressImage, progress }: ItemProps) => (
  <Ripple onLongPress={onLongPressImage ?? (() => true)} style={styles.item}>
    <Image source={{ uri }} style={styles.image} />
    {!isNil(progress) && !(progress === 100) && (
      <Pie
        style={styles.progressPie}
        color={AppTheme["color-primary-500"]}
        unfilledColor={DefaultBackgroundColor}
        progress={progress / 100}
        indeterminate={progress === 0}
        size={30}
      />
    )}
  </Ripple>
);

interface IAddImageProps {
  onAddImagePress: () => any;
}

const AddImage = ({ onAddImagePress }: IAddImageProps) => (
  <Ripple onPress={onAddImagePress} style={styles.item}>
    <AddImageIcon style={styles.addImageIcon} />
  </Ripple>
);

const styles = StyleSheet.create({
  container: {
    height: DefaultThumbnailSize + DefaultMargin * 4,
    marginVertical: DefaultMargin,
  },
  item: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
    width: DefaultThumbnailSize,
    height: DefaultThumbnailSize,
    margin: DefaultMargin,
    borderRadius: DefaultBorderRadius * 2,
    backgroundColor: DefaultBackgroundColor,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: DefaultThumbnailSize,
    height: DefaultThumbnailSize,
    borderRadius: DefaultBorderRadius * 2,
  },
  addImageIcon: { marginTop: DefaultMargin - 3 },
  progressPie: {
    position: "absolute",
  },
});
